import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Se trimite...");

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Mesaj trimis cu succes! 📨");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(`Eroare: ${data.message || "Nu s-a putut trimite mesajul"}`);
      }
    } catch (error) {
      console.error("Eroare:", error);
      setStatus("Eroare de rețea, încearcă din nou.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Contactează-ne</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nume"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Mesajul tău"
            value={form.message}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg min-h-[100px]"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Trimite mesaj
          </button>
        </form>

        {status && <p className="text-center mt-4 text-sm">{status}</p>}
      </div>
    </div>
  );
}
