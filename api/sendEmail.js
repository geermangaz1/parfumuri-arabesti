import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // === Configurare transporter pentru Resend ===
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    auth: {
      user: "resend", // Nu se schimbă
      pass: process.env.RESEND_API_KEY, // cheia din .env
    },
  });

  try {
    // Trimite emailul către tine (adminul)
    await transporter.sendMail({
      from: "no-reply@parfumuriarabesti.ro", // schimbă cu domeniul tău dacă ai
      to: "adresa_ta_de_mail@gmail.com", // AICI pui mailul tău
      subject: "Nou mesaj de contact 💌",
      text: `De la: ${name} (${email})\n\nMesaj:\n${message}`,
    });

    // Trimite emailul de confirmare către client
    await transporter.sendMail({
      from: "no-reply@parfumuriarabesti.ro",
      to: email,
      subject: "Comanda ta a fost primită ✅",
      text: `Mulțumim, ${name}! Am primit comanda ta și o procesăm acum. 
Ne vom întoarce cu detalii în cel mai scurt timp.`,
    });

    res.status(200).json({ message: "Email trimis cu succes!" });
  } catch (error) {
    console.error("Eroare la trimiterea emailului:", error);
    res.status(500).json({ message: "Eroare la trimiterea emailului", error });
  }
}
