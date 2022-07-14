import Copy from "./Copy";
import FooterLogo from "./FooterLogo";
import SiteMap from "./SiteMap";
import Sns from "./Sns";

const Footer = () => {
  return (
    <footer className="w-full bg-black py-8 text-white">
      <FooterLogo />
      <SiteMap />
      <Sns />
      <Copy />
    </footer>
  );
};

export default Footer;
