import Link from "next/link";

import type { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <>
      <main className="p-4">
        <div className="h-20"></div>
        <h1>404 Not Found</h1>
        <p>申し訳ございません。お探しのページは見つかりませんでした。</p>
        <div className="py-8">
          <Link href="/">
            <a>トップページに戻る</a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Custom404;
