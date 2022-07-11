import { useState, useEffect } from "react";

type ViewStatus = "Form" | "Success" | "Error";
type InputStatus = "Entering" | "Ready" | "Sending";

type Props = {
  setViewStatus: React.Dispatch<React.SetStateAction<ViewStatus>>;
};

const Form = ({ setViewStatus }: Props) => {
  const [inputStatus, setInputStatus] = useState<InputStatus>("Entering");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const emailFormat =
      /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (emailFormat.test(email) && message !== "") {
      setInputStatus("Ready");
    } else {
      setInputStatus("Entering");
    }
  }, [email, message, setInputStatus]);

  const onSubmitHundler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputStatus("Sending");
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: email,

        message: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();

    if (result.isSendSuccess) {
      setViewStatus("Success");
    } else {
      setViewStatus("Error");
      setInputStatus("Entering");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <form onSubmit={onSubmitHundler} className="py-4">
      <div className="py-2">
        <div className="py-2">メールアドレス</div>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="block h-12 w-full rounded border border-dark-gray p-2"
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
          className="block  h-24 w-full rounded border border-dark-gray p-2"
          placeholder="お問い合わせ内容を入力してください。"
          required
        ></textarea>
      </div>

      <div className="py-4 text-center">
        {inputStatus === "Entering" && (
          <button
            className="h-12 rounded-full border border-gray px-16 text-dark-gray"
            type="submit"
          >
            送信
          </button>
        )}

        {inputStatus === "Ready" && (
          <button
            className="h-12 rounded-full border px-16 hover:bg-black hover:text-white"
            type="submit"
          >
            送信
          </button>
        )}

        {inputStatus === "Sending" && (
          <button className="h-12 rounded-full border px-16" type="submit">
            <svg width="24" height="24" viewBox="0 0 38 38" stroke="#232C93">
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              </g>
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
