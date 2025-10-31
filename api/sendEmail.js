import emailjs from "@emailjs/browser";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body;

    const result = await emailjs.send(
      "service_db61zao",
      "template_a68nvl9",
      {
        from_name: name,
        from_email: email,
        message,
      },
      "Q49xH-BsQuOIHaXEy"
    );

    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
}
