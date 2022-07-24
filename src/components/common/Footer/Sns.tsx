import Link from "next/link";

import { sns } from "constants/footer";

const Sns = () => {
  return (
    <ul className="flex list-none items-center justify-center p-4">
      {sns.map((value) => {
        return (
          <li key={value.snsName} className="p-4 text-base">
            <Link href={value.url} prefetch={false}>
              <a title={"go to " + value.snsName + " profile"}>
                {value.snsIcon}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Sns;
