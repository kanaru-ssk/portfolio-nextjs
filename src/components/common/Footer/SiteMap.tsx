import MenuLink from "./MenuLink";

const SiteMap = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 px-4 py-8">
      <div className="w-36 text-center">
        <MenuLink path="about" />
      </div>
      <div className="w-36 text-center">
        <MenuLink path="works" />
      </div>
      <div className="w-36 text-center">
        <MenuLink path="blog" />
      </div>
      <div className="w-36 text-center">
        <MenuLink path="contact" />
      </div>
    </div>
  );
};

export default SiteMap;
