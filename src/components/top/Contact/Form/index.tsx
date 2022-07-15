import { useState, useEffect } from "react";

import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";

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
  }, [email, message]);

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
      <FormInput
        email={email}
        setEmail={setEmail}
        message={message}
        setMessage={setMessage}
      />

      <FormSubmit inputStatus={inputStatus} />
    </form>
  );
};

export default Form;
