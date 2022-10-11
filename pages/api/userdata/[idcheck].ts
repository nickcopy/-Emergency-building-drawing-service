import type { NextApiRequest, NextApiResponse } from "next";
import { userInfo } from "@prisma/client";
import client from "../../../libs/server/client";

type Data = {
  ok: Boolean;
  // newUser?: userInfo;
  // user_id?: String;
  // ck?: Object | null;
  err?: String;
  // PW?: String;
  // email?: String;
  // userName?: String;
  // hp?: String | any;
  // userYmd?: String;
  // purpose?: String;
  userinfo?: userInfo;
};

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      case "GET":
        const IDCheck = await client.userInfo.findUnique({
          where: {
            user_id: req.query.idcheck?.toString(),
          },
        });
        res.status(200).json({ ok: true });
        return;

      case "POST":
        console.log(JSON.parse(req.body));
        const { user_id, ps, email, name, hp, ymd, purpose }: userInfo =
          JSON.parse(req.body);
        console.log(req.body);
        const newUser = await client.userInfo.create({
          data: {
            user_id,
            ps,
            email,
            name,
            hp: hp || " ",
            ymd,
            purpose,
          },
        });
        res.status(200).json({ ok: true });
        return;
    }
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  }
}
