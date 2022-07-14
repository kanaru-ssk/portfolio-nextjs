import Link from "next/link";

import HeaderLogo from "./HeaderLogo";

const Header = () => {
  return (
    <>
      <header className="fixed z-20 flex h-12 w-full items-center bg-white pl-4 md:h-20">
        <Link href="/">
          <a title="go to top page">
            <HeaderLogo />
          </a>
        </Link>
      </header>
      <div className="h-12 md:h-20"></div>
    </>
  );
};

export default Header;
