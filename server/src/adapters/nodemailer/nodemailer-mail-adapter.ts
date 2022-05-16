import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapters";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f0acbec4c7ce79",
      pass: "a973df44f4b80c"
    }
  });


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject,body}: SendMailData) {

        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Sírio Aguiar <teste@gmail.com',
            subject,
            html: body
        });        
    };
}