import Link from "next/link";

import PrevNextButton from "./PrevNextButton";

import { blogPerPage, worksPerPage } from "constants/pagination";

type Props = {
  count: number;
  category: "blog" | "works";
  pageNum: number;
};

const Pagination = ({ count, category, pageNum }: Props) => {
  const pageCount =
    category === "blog"
      ? Math.floor(count / blogPerPage) + 1
      : Math.floor(count / worksPerPage) + 1;

  let persons = [];
  for (let i = 1; i < pageCount + 1; i++) {
    persons.push(
      <Link
        href={i === 1 ? "/" + category : "/" + category + "/page/" + i}
        key={i}
        shallow={i === pageNum}
      >
        <a title={"go to" + i + "page"}>
          <div
            className={`${
              i === pageNum
                ? "cursor-default text-dark-gray underline"
                : "sm:hover:text-gray sm:hover:underline"
            } m-1 p-1`}
          >
            {i}
          </div>
        </a>
      </Link>
    );
  }

  if (pageCount === 1) {
    return <></>;
  } else {
    return (
      <div className="w-ful my-4 text-center">
        <div className="flex justify-center">{persons}</div>
        <div className="my-2 flex w-full justify-evenly">
          <PrevNextButton
            href={
              pageNum === 1 || pageNum === 2
                ? "/" + category
                : "/" + category + "/page/" + (pageNum - 1).toString()
            }
            isShallow={pageNum === 1}
          >
            &lt; 前へ
          </PrevNextButton>
          <PrevNextButton
            href={
              pageNum === pageCount - 1 || pageNum === pageCount
                ? "/" + category + "/page/" + pageCount
                : "/" + category + "/page/" + (pageNum + 1).toString()
            }
            isShallow={pageNum === pageCount}
          >
            次へ &gt;
          </PrevNextButton>
        </div>
      </div>
    );
  }
};

export default Pagination;
