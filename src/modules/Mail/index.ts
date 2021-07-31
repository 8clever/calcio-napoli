import Sendmail from 'sendmail'

export class Mail {

	private transport = Sendmail({});

	private from = "support@calcio-napoli.com";

	private to = "godofluck89@gmail.com";

	send = (options: Mail.Send.Options) => {

		return new Promise((res, rej) => {
			this.transport({
				from: options.from || this.from,
				to: options.to || this.to,
				subject: options.subject,
				text: options.message
			}, (err, data) => {
				if (err) {
					return rej(err);
				}
				res(data);
			});
		});
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