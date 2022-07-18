import Link from "next/link";

import { sendSuccessMessage } from "constants/contact";

const SendSuccess = () => {
  return (
    <article className="pb-12">
      <p className="font-bold">送信完了</p>
      <p className="whitespace-pre-wrap">{sendSuccessMessage}</p>
      <Link href="/">
        <a className="text-blue underline sm:hover:text-dark-gray">
          トップページに戻る
        </a>
      </Link>
    </article>
  );
};

export default SendSuccess;
