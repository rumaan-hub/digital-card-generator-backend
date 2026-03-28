import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    });
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@cardforge.app',
      to: email,
      subject: 'CardForge — Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6366f1; margin: 0;">CardForge</h1>
            <p style="color: #666; margin-top: 5px;">Digital Business Card Generator</p>
          </div>
          <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; text-align: center;">
            <h2 style="color: #1e293b; margin-top: 0;">Verify Your Email</h2>
            <p style="color: #64748b;">Enter this code to complete your registration:</p>
            <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #6366f1; margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border: 2px dashed #6366f1;">
              ${code}
            </div>
            <p style="color: #94a3b8; font-size: 13px;">This code expires in 10 minutes.</p>
          </div>
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
            If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      `,
    });
  }
}
