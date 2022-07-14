type Props = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const FormInput = ({ email, setEmail, message, setMessage }: Props) => {
  return (
    <div>
      <div className="py-2">
        <div className="py-2">メールアドレス</div>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full rounded border border-dark-gray p-3 focus:outline-blue"
          type="email"
          placeholder="example@example.com"
          required
        />
      </div>

      <div className="py-2">
        <div className="py-2">お問い合わせ内容</div>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="h-48 w-full rounded border border-dark-gray p-3 focus:outline-blue"
          placeholder="お問い合わせ内容を入力してください。"
          required
        ></textarea>
      </div>
    </div>
  );
};

export default FormInput;
