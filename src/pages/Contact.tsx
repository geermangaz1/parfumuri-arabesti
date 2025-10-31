import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xgvplgzr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contactează-ne</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Nume</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Numele tău"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="exemplu@email.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mesaj</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 h-32"
            placeholder="Scrie mesajul tău..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Se trimite..." : "Trimite mesajul"}
        </button>

        {status === "success" && (
          <p className="text-green-600 mt-2 text-center">
            ✅ Mesaj trimis cu succes! Mulțumim!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-2 text-center">
            ❌ A apărut o eroare. Încearcă din nou.
          </p>
        )}
      </form>
    </div>
  );
}
