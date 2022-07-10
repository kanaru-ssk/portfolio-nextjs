import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import sgMail from "@sendgrid/mail";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "POST") {
    sgMail.setApiKey(process.env.SENTGRID_API_KEY);

    const toUser: MailDataRequired = {
      to: req.body.email,
      from: process.env.CONTACT_MAIL_ADDRESS,
      subject: "【自動返信】お問合せありがとうございました。",
      text:
        "お問合せを受け付けました。回答をお待ちください。\n\n" +
        "セキュリティの関係上、お問い合わせ内容は自動返信メールに記載しておりません。\n\n\n" +
        "佐々木哉瑠\n" +
        "mail : " +
        process.env.CONTACT_MAIL_ADDRESS,
    };

    const toContact: MailDataRequired = {
      to: process.env.CONTACT_MAIL_ADDRESS,
      from: process.env.FORM_MAIL_ADDRESS,
      subject: "お問合せ",
      text:
        "お問合せを受け付けました。\n\n" +
        "メールアドレス : " +
        req.body.email +
        "\n" +
        "本文 : \n" +
        req.body.message +
        "\n\n\n" +
        "自動返信メール内容 : \n" +
        "----------------------------------------\n" +
        "お問合せを受け付けました。回答をお待ちください。\n\n" +
        "セキュリティの関係上、お問い合わせ内容は自動返信メールに記載しておりません。\n\n\n" +
        "佐々木哉瑠\n" +
        "mail : " +
        process.env.CONTACT_MAIL_ADDRESS +
        "\n" +
        "----------------------------------------",
    };

    (async () => {
      try {
        await sgMail.send(toUser);
        await sgMail.send(toContact);

        res.status(200).json({ isSendSuccess: true });
      } catch (err: any) {
        res.status(500).json({ isSendSuccess: false, error: err });
      }
    })();
  } else {
    res.status(400).json({
      isSendSuccess: false,
      error: { message: "please request by POST" },
    });
  }
};

export default handler;
