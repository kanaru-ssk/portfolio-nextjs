import MenuLink from "./MenuLink";
import PageLink from "./PageLink";

import { ProductsRes } from "types/products";
import { WorksRes } from "types/works";

type Props = {
  worksRes: WorksRes;
  productsRes: ProductsRes;
};

const SiteMap = ({ productsRes, worksRes }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-8 px-4 py-8">
      <div className="w-36">
        <MenuLink path="about" />
      </div>
      <div className="w-36">
        <MenuLink path="products" />
        <ul className="py-2">
          {productsRes.data.map((value) => {
            return (
              <PageLink
                title={value.attributes.heading}
                path={"products/" + value.attributes.path}
                key={value.id}
              />
            );
          })}
        </ul>
      </div>
      <div className="w-36">
        <MenuLink path="works" />
        <ul className="py-2">
          {worksRes.data.map((value) => {
            return (
              <PageLink
                title={value.attributes.heading}
                path={"works/" + value.attributes.path}
                key={value.id}
              />
            );
          })}
        </ul>
      </div>
      <div className="w-36">
        <MenuLink path="contact" />
      </div>
    </div>
  );
};

export default SiteMap;
