import { useState } from "react";

import ContactHeader from "./ContactHeader";
import Form from "./Form";
import SendError from "./SendError";
import SendSuccess from "./SendSuccess";

type ViewStatus = "Form" | "Success" | "Error";

const Contact = () => {
  const [viewStatus, setViewStatus] = useState<ViewStatus>("Form");
  return (
    <div className="w-full bg-white px-4">
      <ContactHeader />

      <h1>お問い合わせ</h1>

      {viewStatus === "Form" && <Form setViewStatus={setViewStatus} />}
      {viewStatus === "Success" && <SendSuccess />}
      {viewStatus === "Error" && (
        <>
          <SendError />
          <Form setViewStatus={setViewStatus} />
        </>
      )}
    </div>
  );
};

export default Contact;
