import Link from "next/link";

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
            <Link href={"/" + value.path}>
              <a className="text-base font-medium">{value.path}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SiteMap;
