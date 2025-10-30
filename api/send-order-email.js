// /api/send-email.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Lipsesc datele necesare" });
  }

  try {
    // Trimite email la tine (orientalessence.shop@gmail.com)
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { email: "orientalessence.shop@gmail.com", name: "Oriental Essence" },
        to: [{ email: "orientalessence.shop@gmail.com" }],
        subject: `Mesaj nou de la ${name}`,
        htmlContent: `
          <h2>Mesaj nou de la ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mesaj:</strong><br/>${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Eroare la trimiterea emailului");
    }

    // Trimite email de confirmare clientului
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { email: "orientalessence.shop@gmail.com", name: "Oriental Essence" },
        to: [{ email }],
        subject: "Mulțumim pentru mesajul tău!",
        htmlContent: `
          <h2>Bună, ${name}!</h2>
          <p>Îți mulțumim că ne-ai contactat. Am primit mesajul tău și îți vom răspunde în cel mai scurt timp.</p>
          <p>Cu drag,<br/>Echipa Oriental Essence</p>
        `,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Eroare trimitere email:", error);
    return res.status(500).json({ error: "A apărut o eroare la trimiterea emailului" });
  }
}
