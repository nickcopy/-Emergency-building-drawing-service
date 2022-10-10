import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: Boolean;
  user_id?: String;
  ck?: Object | null;
  err?: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const IDCheck = await client.userInfo.findUnique({
      where: {
        user_id: req.query.idcheck?.toString(),
      },
    });

    res.status(200).json({ ok: true, ck: IDCheck });
    console.log(req.query.idcheck);
  } catch (err) {
    res
      .status(200)
      .json({ ok: false, err: `${err}`, user_id: req.query.toString() });
  }
}
