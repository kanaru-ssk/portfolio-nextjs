import MenuLink from "./MenuLink";

const SiteMap = () => {
  const pages = [
    { path: "about" },
    { path: "works" },
    { path: "blog" },
    { path: "contact" },
  ];

  return (
    <ul className="flex flex-wrap justify-center gap-8 px-4 py-8">
      {pages.map((value) => {
        return (
          <li key={value.path} className="w-36 text-center">
            <MenuLink path={value.path} />
          </li>
        );
      })}
    </ul>
  );
};

export default SiteMap;
