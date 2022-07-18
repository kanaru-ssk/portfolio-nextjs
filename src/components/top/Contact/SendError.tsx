import { contactMailUser, sendErrorMessage } from "constants/contact";

const SendError = () => {
  return (
    <article>
      <p className="font-bold text-red">送信失敗</p>
      <p>{sendErrorMessage}</p>
      <p className="tracking-wider">
        {contactMailUser + "@" + process.env.NEXT_PUBLIC_DOMAIN}
      </p>
    </article>
  );
};

export default SendError;
