import Copy from "./Copy";
import Logo from "./Logo";
import SiteMap from "./SiteMap";
import Sns from "./Sns";

const Footer = () => {
  return (
    <footer className="w-full bg-black py-8 text-white">
      <Logo />
      <SiteMap />
      <Sns />
      <Copy />
    </footer>
  );
};

export default Footer;
