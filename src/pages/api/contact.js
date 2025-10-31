// src/pages/api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.SENDINBLUE_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name, email },
        to: [{ email: "orientalessence.shop@gmail.com", name: "Oriental Essence" }],
        subject: `Mesaj nou de la ${name}`,
        htmlContent: `
          <p><strong>Nume:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mesaj:</strong> ${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Eroare Brevo:", errorData);
      return res.status(400).json({ error: "Eroare la trimiterea emailului." });
    }

    return res.status(200).json({ message: "Email trimis cu succes!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Eroare de server." });
  }
}
