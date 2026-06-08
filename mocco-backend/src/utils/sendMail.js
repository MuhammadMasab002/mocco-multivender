import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const smtpHost = process.env.SMPT_HOST?.trim();
  const smtpPort = process.env.SMPT_PORT?.trim();
  const smtpService = process.env.SMPT_SERVICE?.trim();
  const smtpUser = process.env.SMPT_MAIL?.trim();
  const smtpPassword = process.env.SMPT_PASSWORD?.trim();

  if (!smtpHost || !smtpPort || !smtpService || !smtpUser || !smtpPassword) {
    throw new Error("SMTP configuration is missing. Check .env values for SMPT_HOST, SMPT_PORT, SMPT_SERVICE, SMPT_MAIL, and SMPT_PASSWORD.");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    service: smtpService,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const mailOptions = {
    from: smtpUser,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
