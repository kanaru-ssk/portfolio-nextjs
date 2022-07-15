const SendError = () => {
  return (
    <article>
      <p className="font-bold text-red">送信失敗</p>
      <p>
        現在障害が発生している可能性がございます。
        恐れ入りますが、もう一度お試し頂くか、下記メールアドレスにご連絡下さい。
      </p>
      <p className="tracking-wider">contact@kanaru.jp</p>
    </article>
  );
};

export default SendError;
