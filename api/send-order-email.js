import Brevo from "@getbrevo/brevo";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const brevo = new Brevo.TransactionalEmailsApi();
  brevo.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  try {
    await brevo.sendTransacEmail({
      sender: { email: "noreply@parfumuriarabesti.ro", name: "Parfumuri Arabesti" },
      to: [{ email }],
      subject: "Comanda ta a fost primită!",
      htmlContent: `
        <h2>Bună, ${name}!</h2>
        <p>Am primit comanda ta și o procesăm acum.</p>
        <p>Detalii: ${message}</p>
        <p>Mulțumim pentru încredere 💛</p>
      `,
    });

    return res.status(200).json({ message: "Email trimis cu succes!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Eroare la trimiterea emailului" });
  }
}
