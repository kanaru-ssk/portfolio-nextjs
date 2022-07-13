import { readFileSync } from "fs";

import type { NextApiRequest, NextApiResponse } from "next";

const exportcss = async (req: NextApiRequest, res: NextApiResponse) => {
  const css = readFileSync("src/styles/dist.css", "utf-8");
  res.setHeader("Content-Type", "text/css;charset=utf-8");
  res.status(200).send(css);
};

export default exportcss;
