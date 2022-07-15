import Link from "next/link";

const SiteMap = () => {
  const pages = [
    { name: "about", path: "/" },
    { name: "works", path: "/works" },
    { name: "blog", path: "/blog" },
    { name: "contact", path: "/contact" },
  ];

  return (
    <ul className="flex flex-wrap justify-center gap-8 px-4 py-8">
      {pages.map((value) => {
        return (
          <li key={value.name} className="w-36 text-center">
            <Link href={value.path}>
              <a className="text-base font-medium">{value.name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SiteMap;
