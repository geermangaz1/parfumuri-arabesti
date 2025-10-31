import emailjs from "@emailjs/browser";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, address } = req.body;

    // Trimite emailul cu EmailJS
    const result = await emailjs.send(
      "service_db61zao", // Service ID
      "template_a68nvl9", // Template ID
      {
        name,
        email,
        phone,
        address,
      },
      "Q49xH-BsQuOIHaXEy" // Public key
    );

    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Eroare la trimitere:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
