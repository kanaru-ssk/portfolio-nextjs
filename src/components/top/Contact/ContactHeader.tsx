import { useRouter } from "next/router";

import HeaderLogo from "components/common/HeaderLogo";

const Contact = () => {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 z-20 flex h-12 w-full items-center justify-between bg-white md:h-20">
      <button
        className="p-4"
        onClick={() => {
          router.back();
        }}
      >
        <svg width="24" height="16">
          <path
            d="M8.68372 1.79844L3.63319 6.8741H22.8771C24.3743 6.8741 24.3743 9.04225 22.8771 9.04225H3.63319L8.6937 14.1179C9.75172 15.177 8.22458 16.7057 7.16656 15.6466L0.30942 8.72252C0.219588 8.62261 0 8.31287 0 7.96317C0 7.64344 0.159701 7.35369 0.30942 7.20382L7.15658 0.299716C8.09482 -0.639482 9.602 0.879221 8.67374 1.80843L8.68372 1.79844Z"
            fill="#888"
          />
        </svg>
      </button>
      <HeaderLogo />
      <div className="w-14"></div>
    </header>
  );
};

export default Contact;
