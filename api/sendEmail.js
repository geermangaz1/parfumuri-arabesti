import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Lipsesc câmpuri obligatorii" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Mail către tine
    await resend.emails.send({
      from: "Comenzi Parfumuri <no-reply@parfumuriarabesti.ro>",
      to: "adresa-ta@email.com", // 🔹 înlocuiește cu adresa ta reală
      subject: `Comandă nouă de la ${name}`,
      html: `
        <h2>Comandă nouă!</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mesaj:</strong> ${message}</p>
      `,
    });

    // Mail de confirmare clientului
    await resend.emails.send({
      from: "Comenzi Parfumuri <no-reply@parfumuriarabesti.ro>",
      to: email,
      subject: "Confirmare comandă",
      html: `
        <h3>Bună, ${name}!</h3>
        <p>Îți mulțumim pentru comandă! Echipa noastră o procesează acum și vei primi detalii în curând.</p>
        <p>Cu drag,<br>Echipa Parfumuri Arăbești</p>
      `,
    });

    return res.status(200).json({ message: "Mail trimis cu succes" });
  } catch (error) {
    console.error("Eroare la trimiterea mailului:", error);
    return res.status(500).json({ message: "Eroare server", error });
  }
}
