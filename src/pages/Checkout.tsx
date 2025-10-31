"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [status, setStatus] = useState<null | string>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Comanda a fost trimisă cu succes! 🎉");
        setFormData({ name: "", email: "", phone: "", address: "" });
      } else {
        setStatus("A apărut o eroare la trimiterea comenzii. Încearcă din nou.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Eroare de rețea. Verifică conexiunea.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618354691373-d851c9b5508f?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          padding: "40px",
          width: "350px",
          textAlign: "center",
          backdropFilter: "blur(6px)",
        }}
      >
        <h2 style={{ color: "#6b3e26", marginBottom: "20px", fontSize: "1.5em" }}>
          Finalizează Comanda
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nume complet"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <textarea
            name="address"
            placeholder="Adresa completă"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            style={{
              ...inputStyle,
              resize: "none",
            }}
          />
          <button type="submit" style={buttonStyle}>
            Trimite Comanda
          </button>
        </form>

        {status && (
          <p
            style={{
              marginTop: "15px",
              color: status.includes("succes") ? "green" : "red",
              fontSize: "0.9em",
            }}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: "15px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  fontSize: "1em",
  background: "#f9f9f9",
} as React.CSSProperties;

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(45deg, #b48c57, #d4af37)",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s ease",
} as React.CSSProperties;
