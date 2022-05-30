import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { EmailData } from '@sendgrid/helpers/classes/email-address';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
	if (req.method === 'POST') {
		sgMail.setApiKey('SG.xxx');

		const msg: MailDataRequired = {
			to: req.body.email,
			from: 'support@example.com' as EmailData,
			subject: 'お問合せありがとうございました。',
			text: 'お問合せを受け付けました。回答をお待ちください。' + req.body.message,
			html: 'お問合せを受け付けました。回答をお待ちください。' + req.body.message,
		};

		(async () => {
			try {
				await sgMail.send(msg);
			} catch (error: any) {
				console.error(error);
				if (error.response) {
					console.error(error.response.body);
				}
			}
		})();
	}

	res.status(200);
};

export default handler;
