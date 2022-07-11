import Copy from "./Copy";
import Logo from "./Logo";
import OfficialSns from "./OfficialSns";
import SiteMap from "./SiteMap";

const Footer = () => {
  return (
    <footer className="w-full bg-black py-8 text-white">
      <Logo />
      <SiteMap />
      <OfficialSns />
      <Copy />
    </footer>
  );
};

export default Footer;
