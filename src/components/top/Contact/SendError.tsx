import { mailAddress, sendErrorMessage } from "constants/contact";

const SendError = () => {
  return (
    <article>
      <p className="font-bold text-red">送信失敗</p>
      <p>{sendErrorMessage}</p>
      <p className="tracking-wider">{mailAddress}</p>
    </article>
  );
};

export default SendError;
