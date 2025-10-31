"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Conectare la Supabase
const supabaseUrl = "https://db61zao.supabase.co";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY"; // vezi mai jos pasul 2
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Ia produsele din coș (din localStorage)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const { error } = await supabase.from("orders").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          products: cartItems,
        },
      ]);

      if (error) throw error;
      setStatus("success");
      localStorage.removeItem("cart");
      setFormData({ name: "", email: "", phone: "", address: "" });
      setCartItems([]);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Finalizare comandă - Oriental Essence
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200"
      >
        <input
          type="text"
          name="name"
          placeholder="Nume complet"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-3"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefon"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-3"
        />
        <input
          type="text"
          name="address"
          placeholder="Adresă completă"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-5"
        />

        <h2 className="text-lg font-semibold mb-2 text-gray-700">Produse comandate:</h2>
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500 mb-5">Coșul este gol</p>
        ) : (
          <ul className="mb-5 space-y-1 text-gray-700">
            {cartItems.map((item, index) => (
              <li key={index} className="text-sm">
                {item.name} — {item.price} lei × {item.quantity}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          {status === "sending" ? "Se trimite..." : "Trimite comanda"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center mt-3">
            ✅ Comanda a fost trimisă cu succes!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center mt-3">
            ❌ A apărut o eroare. Încearcă din nou.
          </p>
        )}
      </form>
    </div>
  );
}
