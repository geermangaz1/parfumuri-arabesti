import React, { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg("Comanda a fost trimisă cu succes! Vei primi un email de confirmare.");
        setFormData({ name: "", email: "", phone: "", address: "" });
      } else {
        setErrorMsg("A apărut o eroare la trimiterea comenzii. Încearcă din nou.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Eroare de conexiune. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[url('https://img.freepik.com/free-photo/perfume-bottle-with-leaves-dark-background_23-2148294995.jpg')]
      bg-cover bg-center p-6"
    >
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full border border-[#b46b35]">
        <h2 className="text-2xl font-bold text-center text-[#8b3a0e] mb-6">
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
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b46b35]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b46b35]"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Număr de telefon"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b46b35]"
          />

          <textarea
            name="address"
            placeholder="Adresă completă"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b46b35] resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b46b35] hover:bg-[#8b3a0e] text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
          >
            {loading ? "Se trimite..." : "Trimite Comanda"}
          </button>
        </form>

        {successMsg && (
          <p className="text-green-700 text-center mt-4 font-medium">{successMsg}</p>
        )}
        {errorMsg && (
          <p className="text-red-600 text-center mt-4 font-medium">{errorMsg}</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
