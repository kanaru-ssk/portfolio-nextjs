import Copy from "./Copy";
import Logo from "./Logo";
import OfficialSns from "./OfficialSns";
import SiteMap from "./SiteMap";

import { Sn } from "types/aboutPage";
import { ProductsRes } from "types/products";
import { WorksRes } from "types/works";

type Props = {
  copyRight: string;
  snsLinks: Sn[];
  productsRes: ProductsRes;
  worksRes: WorksRes;
};

const Footer = ({ copyRight, snsLinks, productsRes, worksRes }: Props) => {
  return (
    <footer className="w-full bg-black text-white">
      <Logo />
      <SiteMap productsRes={productsRes} worksRes={worksRes} />
      <OfficialSns snsLinks={snsLinks} />
      <Copy copyRight={copyRight} />
    </footer>
  );
};

export default Footer;
