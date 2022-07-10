import Link from "next/link";

const Menu = () => {
  return (
    <ul className="justify-right flex list-none items-center">
      <li className="p-2 text-base">
        <Link href="/about">
          <a>about</a>
        </Link>
      </li>
      <li className="p-2 text-base">
        <Link href="/products">
          <a>products</a>
        </Link>
      </li>
      <li className="p-2 text-base">
        <Link href="/works">
          <a>works</a>
        </Link>
      </li>
      <li className="p-2 text-base">
        <Link href="/contact">
          <a>contact</a>
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
