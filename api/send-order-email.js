// api/send-order-email.js
import Brevo from "@getbrevo/brevo";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, orderNumber, total } = req.body;
  if (!name || !email || !orderNumber || !total) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = {
      sender: { name: "Oriental Essence", email: "orientalessence.shop@gmail.com" },
      to: [{ email }],
      subject: `Comanda ta #${orderNumber} a fost primită!`,
      htmlContent: `
        <h2>Mulțumim pentru comanda ta, ${name}!</h2>
        <p>Număr comandă: <strong>${orderNumber}</strong></p>
        <p>Total: <strong>${total}</strong></p>
        <p>Te vom contacta în curând pentru confirmare.</p>
        <br/>
        <p>Cu drag,<br>Oriental Essence</p>
      `,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.status(200).json({ success: true, message: "Email trimis cu succes!" });
  } catch (error) {
    console.error("Brevo error:", error);
    res.status(500).json({ error: "Eroare la trimiterea emailului" });
  }
}
