import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await emailjs.send(
        "service_db61zao",
        "template_a68nvl9",
        {
          to_name: formData.name,
          from_name: "Parfumuri Arabești",
          to_email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        "Q49xH-BsQuOIHaXEy"
      );

      if (response.status === 200) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", address: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Eroare EmailJS:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `url('https://i.ibb.co/0fQXg8t/parfumuri-bg.jpg')`,
      }}
    >
      <Card className="max-w-md w-full shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md border border-amber-200">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-amber-800 font-['Playfair_Display']">
            Finalizează Comanda
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nume complet"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Adresă de email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              type="text"
              name="phone"
              placeholder="Număr de telefon"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <textarea
              name="address"
              placeholder="Adresă completă"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[100px]"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-3 rounded-md transition-all"
            >
              {loading ? "Se trimite comanda..." : "Trimite Comanda"}
            </Button>

            {status === "success" && (
              <p className="text-green-600 text-center font-medium mt-3">
                ✅ Comanda a fost trimisă cu succes! Vei primi un email de confirmare.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-center font-medium mt-3">
                ❌ A apărut o eroare la trimiterea comenzii. Verifică emailul și încearcă din nou.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
