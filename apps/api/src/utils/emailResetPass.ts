import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.PASS_EMAILER,
  },
});

export const sendEmail = async (
  emailTo: string,
  subject: string,
  content?: string | null,
  data?: { email: string; token: string },
) => {
  try {
    const urlLink = `http://localhost:3000/reset-password?token=${data?.token}`;
    const templatePath = path.join (__dirname, '../templates', 'resetPass.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compileTemplates = handlebars.compile(templateSource);
    const generateTemplate = compileTemplates({ ...data, urlLink });

    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: emailTo,
      subject: subject,
      html: generateTemplate,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
