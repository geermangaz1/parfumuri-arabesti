import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xgvplgzr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("✅ Mesaj trimis cu succes! Te vom contacta în curând.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("❌ A apărut o eroare. Încearcă din nou mai târziu.");
      }
    } catch (error) {
      toast.error("⚠️ Eroare de rețea. Verifică conexiunea și încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-6 text-amber-900">Contactează-ne</h1>
          <p className="text-center text-gray-600 mb-10">
            Trimite-ne un mesaj și îți vom răspunde în cel mai scurt timp!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-xl rounded-xl p-8 border border-amber-100">
            <div>
              <Label htmlFor="name">Nume complet</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Ex: Andrei Popescu"
              />
            </div>

            <div>
              <Label htmlFor="email">Adresă de email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="andrei@email.com"
              />
            </div>

            <div>
              <Label htmlFor="message">Mesajul tău</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                placeholder="Scrie mesajul aici..."
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {loading ? "Se trimite..." : "Trimite mesajul"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
