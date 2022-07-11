import type { NextPage } from "next";

import A from "components/common/A";

const Custom404: NextPage = () => {
  return (
    <>
      <main className="p-4">
        <div className="h-20"></div>
        <h1>404 Not Found</h1>
        <p>申し訳ございません。お探しのページは見つかりませんでした。</p>
        <div className="py-8">
          <A title="トップページに戻る" url="/" />
        </div>
      </main>
    </>
  );
};

export default Custom404;
