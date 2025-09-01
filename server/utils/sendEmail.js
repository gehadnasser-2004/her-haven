import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig.js";

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Her Haven" <HerHaven@gmail.com>', //edit
    to,
    subject,
    html,
  });
};

export default sendEmail;
