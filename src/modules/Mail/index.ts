import Sendmail from 'sendmail'

export class Mail {

	private transport = Sendmail({
		dkim: {
			keySelector: "google",
			privateKey: process.env.DKIM_PRIVATE_KEY || ""
		}
	});

	private from = "support@calcio-napoli.com";

	private to = "godofluck89@gmail.com";

	send = (options: Mail.Send.Options) => {
		return new Promise((res, rej) => {
			this.transport({
				from: options.from || this.from,
				to: options.to || this.to,
				subject: options.subject,
				html: options.message
			}, (err, data) => {
				if (err) {
					return rej(err);
				}
				res(data);
			});
		});
	}

	public static Doctype = (body: string) => {
		return `
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
				<title>E-mail</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			</head>
			<body>${body}</body>
			</html>
		`
	}

	public static CodeBlock = (str: string) => {
		return `
			<div style="padding: 5px; background: rgba(0,0,0,0.1); border-radius: 4px; margin-bottom: 5px;">
				<small>${str}</small>
			</div>
		`;
	}
}

export namespace Mail {
	export namespace Send {
		export interface Options {
			from?: string;
			to?: string;
			subject: string;
			message: string;
		}
	}
}
