import nodemailer from 'nodemailer';
import { MailAdapter, sendMailData } from "../helpers/mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1a7cbe509ff187",
    pass: "1f586f7d5ed6b7"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: sendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <contato@feedget.com>',
      to: 'Alex Salgado <contato@dromini.com.br>',
      subject,
      html: body,
    })
  } 
}