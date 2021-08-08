import { CodeBlock } from './components/CodeBlock';
import { Doctype } from './components/Doctype';
import nodemailer from 'nodemailer';

export class Mail {

	private transport = nodemailer.createTransport(process.env.SMTP_URL)

	private from = "support@calcio-napoli.com";

	private to = "godofluck89@gmail.com";

	send = (options: Mail.Send.Options) => {
		return this.transport.sendMail({
			...options,
			from: options.from || this.from,
			to: options.to || this.to
		});
	}

	public static Doctype = Doctype;

	public static CodeBlock = CodeBlock;

}

export namespace Mail {
	export namespace Send {
		export interface Options {
			from?: string;
			to?: string;
			html?: string;
			text?: string;
			subject: string;
		}
	}
}
