import Link from "next/link";

const SendSuccess = () => {
  return (
    <article>
      <p className="font-bold">送信完了</p>
      <p>
        折り返しご連絡いたしますので、恐れ入りますがしばらくお待ちください。
      </p>
      <p>ご入力いただいたメールアドレス宛に自動返信メールを送信しました。</p>
      <p>
        完了メールが届かない場合、処理が正常に行われていない可能性があります。
        大変お手数ですが、再度ご連絡の手続きをお願い致します。
      </p>
      <Link href="/">
        <a className="text-blue underline sm:hover:text-dark-gray">
          トップページに戻る
        </a>
      </Link>
    </article>
  );
};

export default SendSuccess;
