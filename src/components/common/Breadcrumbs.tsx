import Link from "next/link";

type Props = {
  bread: {
    name: string;
    path?: string;
  }[];
};

const Breadcrumb = ({ bread }: Props) => {
  return (
    <>
      <div className="absolute left-0 top-12 w-screen bg-light-gray px-4 py-2 text-sm md:top-20">
        <span className="sm:hover:underline">
          <Link href="/">
            <a>
              <svg width="16" height="14" className="mb-1 inline">
                <path
                  d="M6.4 14V9.05882H9.6V14H13.6V7.41176H16L8 0L0 7.41176H2.4V14H6.4Z"
                  fill="#232C93"
                />
              </svg>
              <span className="px-1">home</span>
            </a>
          </Link>
        </span>
        {bread.map((value) => {
          return (
            <>
              <span> / </span>
              {value.path ? (
                <span className="sm:hover:underline" key={value.name}>
                  <Link href={value.path}>
                    <a>{value.name}</a>
                  </Link>
                </span>
              ) : (
                <span key={value.name}>{value.name}</span>
              )}
            </>
          );
        })}
      </div>
      <div className="h-9"></div>
    </>
  );
};

export default Breadcrumb;
