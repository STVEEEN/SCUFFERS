import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
});

export default async function sendVerificationEmail(email, token) {
  const verificationUrl = `${config.server.FRONTEND_URL || "http://localhost:5173"}/verify-email?token=${token}`;
  const logoUrl = "https://i.imgur.com/cN9YbZU.png"; // Cambia por tu logo real
  const html = `
  <div style="background: #f8f8f8; padding: 40px 0; min-height: 100vh;">
    <div style="max-width: 430px; margin: 0 auto; background: #fff; border-radius: 18px; box-shadow: 0 4px 36px #0001; overflow: hidden; font-family: 'Segoe UI', Arial, sans-serif;">
      <div style="background: linear-gradient(90deg, #15171a 60%, #333 100%); text-align:center; padding: 32px 0 16px 0;">
        <img src="${logoUrl}" alt="Scuffers" style="width: 94px; margin-bottom: 12px;" />
        <h1 style="color:#fff; font-size: 2.1rem; letter-spacing: 0.18em; margin: 0;">Scuffers</h1>
      </div>
      <div style="padding: 34px 34px 42px 34px;">
        <h2 style="color: #18191b; font-size:1.33rem; margin: 0 0 14px 0; font-weight: 700;">Verifica tu correo electrónico</h2>
        <p style="color: #555; font-size: 1rem; margin-bottom: 34px;">
          ¡Gracias por registrarte en <span style="color:#15171a;font-weight:600;">Scuffers</span>!<br>
          Para activar tu cuenta y empezar a explorar nuestra colección, confirma tu correo electrónico haciendo clic en el siguiente botón:
        </p>
        <div style="text-align:center;">
          <a href="${verificationUrl}" style="display:inline-block; padding: 14px 38px; background: linear-gradient(90deg,#15171a 70%,#333 100%); color: #fff; border-radius: 8px; font-size: 1.01rem; letter-spacing: 0.06em; font-weight:600; text-decoration:none; box-shadow:0 2px 10px #0002;transition:background 0.2s;">
            Verificar correo
          </a>
        </div>
        <p style="color: #888; font-size: .98rem; margin-top: 40px; text-align:center;">
          Si no te registraste en Scuffers, puedes ignorar este mensaje.<br>
          ¿Problemas con el botón? Copia y pega este enlace en tu navegador:<br>
          <span style="color:#15171a;word-break:break-all;">${verificationUrl}</span>
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:38px 0 18px 0;">
        <div style="text-align:center; color:#aaa; font-size:.93rem; margin-bottom: 6px;">
          &copy; ${new Date().getFullYear()} Scuffers &ndash; All rights reserved.
        </div>
        <div style="text-align:center; color:#bbb; font-size:.93rem;">
          <a href="https://scuffers.com" style="color:#888;text-decoration:none;">scuffers.com</a>
        </div>
      </div>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `"Scuffers" <${config.email.email_user}>`,
    to: email,
    subject: "Confirma tu correo electrónico | Scuffers",
    html,
  });
}