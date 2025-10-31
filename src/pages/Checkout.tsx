import React, { useState } from "react";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setMessage("Te rugăm să completezi toate câmpurile!");
      setSuccess(false);
      return;
    }

    // Simulare trimitere comandă
    console.log("Comandă trimisă:", formData);
    setMessage("Comanda ta a fost trimisă cu succes! Te vom contacta curând!");
    setSuccess(true);

    // Resetează formularul
    setFormData({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1616400619175-5f91c0f2b87c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-[#b87333]">
        <h2 className="text-2xl font-bold text-center text-[#b87333] mb-6">
          Finalizează Comanda
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nume complet"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b87333]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b87333]"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Număr de telefon"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b87333]"
          />
          <textarea
            name="address"
            placeholder="Adresa de livrare"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b87333]"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#b87333] hover:bg-[#a15e24] text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Trimite Comanda
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
