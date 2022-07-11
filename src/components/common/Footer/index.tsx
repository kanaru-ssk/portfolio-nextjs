import Copy from "./Copy";
import Logo from "./Logo";
import OfficialSns from "./OfficialSns";
import SiteMap from "./SiteMap";

import { Sn } from "types/aboutPage";

type Props = {
  copyRight: string;
  snsLinks: Sn[];
};

const Footer = ({ copyRight, snsLinks }: Props) => {
  return (
    <footer className="w-full bg-black py-8 text-white">
      <Logo />
      <SiteMap />
      <OfficialSns snsLinks={snsLinks} />
      <Copy copyRight={copyRight} />
    </footer>
  );
};

export default Footer;
