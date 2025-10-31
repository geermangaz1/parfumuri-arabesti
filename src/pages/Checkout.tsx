import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    products: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xgvplgzr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          subject: "🛍️ Nouă comandă primită!",
          ...formData,
        }),
      });

      if (response.ok) {
        toast.success("✅ Comanda a fost trimisă cu succes!");
        sendConfirmationEmail(formData.email, formData.name);
        setFormData({ name: "", email: "", phone: "", address: "", products: "" });
      } else {
        toast.error("❌ Eroare la trimiterea comenzii. Încearcă din nou.");
      }
    } catch (error) {
      toast.error("⚠️ Eroare de rețea. Verifică conexiunea.");
    } finally {
      setLoading(false);
    }
  };

  const sendConfirmationEmail = async (email: string, name: string) => {
    try {
      await fetch("https://formspree.io/f/xgvplgzr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          subject: "✅ Confirmarea comenzii tale",
          message: `Bună ${name},\n\nÎți mulțumim pentru comandă! Echipa noastră o procesează și te vom contacta în curând.\n\nCu drag,\nEchipa Parfumuri Arabești`,
          email,
        }),
      });
    } catch (err) {
      console.error("Eroare trimitere email client:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-6 text-amber-900">Finalizează Comanda</h1>
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
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="07xx xxx xxx"
              />
            </div>

            <div>
              <Label htmlFor="address">Adresă de livrare</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                placeholder="Str. Exemplu, Nr. 10, București"
              />
            </div>

            <div>
              <Label htmlFor="products">Produsele comandate</Label>
              <Input
                id="products"
                name="products"
                value={formData.products}
                onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                placeholder="Ex: 2x Oud Gold, 1x Amber Rose"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {loading ? "Se trimite comanda..." : "Trimite comanda"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
