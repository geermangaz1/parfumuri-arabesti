import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // generăm un ID de comandă random
      const orderNumber = Math.floor(Math.random() * 1000000);

      // transformăm produsele într-un text lizibil
      const orderDetails = cartItems
        .map(
          (item) =>
            `${item.name} - Cantitate: ${item.quantity} - Preț: ${item.price} RON`
        )
        .join("\n");

      // trimitem emailul cu EmailJS
      await emailjs.send(
        "service_db61zao", // Service ID
        "template_a68nvl9", // Template ID
        {
          email: formData.email, // destinatarul (clientul)
          order_id: orderNumber,
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          orders: orderDetails,
          cost: { shipping: "0", tax: "0" },
        },
        "Q49xH-BsQuOIHaXEy" // Public Key
      );

      alert("✅ Comanda a fost trimisă cu succes! Vei primi un email de confirmare.");
      setFormData({ name: "", email: "", address: "", phone: "" });
    } catch (error) {
      console.error("❌ Eroare la trimiterea emailului:", error);
      alert("A apărut o eroare la trimiterea comenzii. Încearcă din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-container max-w-lg mx-auto p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Finalizează Comanda
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nume complet"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <input
          type="text"
          name="phone"
          placeholder="Telefon"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <textarea
          name="address"
          placeholder="Adresă de livrare"
          required
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          {isSubmitting ? "Se trimite comanda..." : "Trimite Comanda"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
