import { useState } from "react";

import { useRouter } from "next/router";

import HeaderLogo from "components/common/HeaderLogo";
import Form from "components/top/Contact/Form";
import SendError from "components/top/Contact/SendError";
import SendSuccess from "components/top/Contact/SendSuccess";

type ViewStatus = "Form" | "Success" | "Error";

type Props = {
  setIsShowContact: React.Dispatch<React.SetStateAction<boolean>>;
};

const Contact = ({ setIsShowContact }: Props) => {
  const router = useRouter();
  const [viewStatus, setViewStatus] = useState<ViewStatus>("Form");
  return (
    <div className="w-full bg-white px-4">
      <div className="fixed top-0 left-0 z-20 flex h-12 w-full items-center justify-between bg-white px-4">
        <button
          onClick={() => {
            setIsShowContact(false);
            router.back();
          }}
        >
          <svg width="24" height="16" viewBox="0 0 24 16">
            <path
              id="Icon_ionic-ios-arrow-round-back"
              data-name="Icon ionic-ios-arrow-round-back"
              d="M16.573,11.558a1.089,1.089,0,0,1,.008,1.533l-5.058,5.075H30.8a1.083,1.083,0,0,1,0,2.167H11.523l5.066,5.075a1.1,1.1,0,0,1-.008,1.533,1.079,1.079,0,0,1-1.525-.008L8.19,20.016h0a1.216,1.216,0,0,1-.225-.342,1.034,1.034,0,0,1-.083-.417A1.086,1.086,0,0,1,8.19,18.5l6.866-6.916A1.061,1.061,0,0,1,16.573,11.558Z"
              transform="translate(-7.882 -11.252)"
              fill="#888"
            />
          </svg>
        </button>
        <HeaderLogo />
        <div className="h-4 w-6"></div>
      </div>
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
