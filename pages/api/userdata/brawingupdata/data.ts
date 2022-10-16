import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  data?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req);
  try {
    if (req.method == "PUT") {
      res.status(200).json({ name: "true ", data: req.body });
    }
  } catch (err) {
    res.status(400).json({ name: "false" });
  }
}
