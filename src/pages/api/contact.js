export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  console.log("📩 Mesaj primit de la:", name, email, message);

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.SENDINBLUE_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: name || "Anonim", email: email || "no-reply@orientalessence.shop" },
        to: [{ email: "orientalessence.shop@gmail.com", name: "Oriental Essence" }],
        subject: `Mesaj nou de la ${name || "Vizitator"}`,
        htmlContent: `
          <p><strong>Nume:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mesaj:</strong> ${message}</p>
        `,
      }),
    });

    const data = await response.json();
    console.log("📤 Răspuns Brevo:", data);

    if (!response.ok) {
      return res.status(400).json({ error: "Eroare Brevo", details: data });
    }

    return res.status(200).json({ message: "Email trimis cu succes!" });
  } catch (error) {
    console.error("💥 Eroare server:", error);
    return res.status(500).json({ error: "Eroare de server", details: error.message });
  }
}
