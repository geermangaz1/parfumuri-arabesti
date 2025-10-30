import type { NextApiRequest, NextApiResponse } from "next";
import SibApiV3Sdk from "sib-api-v3-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Incomplete data" });
  }

  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY!; // cheia din .env.local

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Email către tine (magazinul)
    await apiInstance.sendTransacEmail({
      sender: { email: "orientalessence.shop@gmail.com", name: "Oriental Essence" },
      to: [{ email: "orientalessence.shop@gmail.com" }],
      subject: `Mesaj nou de la ${name}`,
      htmlContent: `
        <h2>Mesaj nou de pe site</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mesaj:</strong><br/>${message}</p>
      `,
    });

    // Email de confirmare pentru client
    await apiInstance.sendTransacEmail({
      sender: { email: "orientalessence.shop@gmail.com", name: "Oriental Essence" },
      to: [{ email }],
      subject: "Mulțumim pentru mesajul tău!",
      htmlContent: `
        <h2>Mulțumim că ne-ai contactat!</h2>
        <p>Bună ${name},</p>
        <p>Am primit mesajul tău și îți vom răspunde cât mai curând posibil.</p>
        <p>Cu drag,<br/>Echipa Oriental Essence</p>
      `,
    });

    return res.status(200).json({ message: "Email trimis cu succes!" });
  } catch (error) {
    console.error("Eroare la trimitere:", error);
    return res.status(500).json({ message: "Eroare la trimiterea emailului" });
  }
}
