import { readFileSync } from "fs";
import * as path from "path";

import type { NextApiRequest, NextApiResponse } from "next";

const exportcss = async (req: NextApiRequest, res: NextApiResponse) => {
  const cssPath = path.join(process.cwd(), "src", "styles", "dist.css");
  const css = readFileSync(cssPath, "utf-8");
  res.setHeader("Content-Type", "text/css;charset=utf-8");
  res.status(200).send(css);
};

export default exportcss;
