// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";
import { useEffect, useState } from "react";

type Data = {
  name?: string;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.body, "넘어온 데이터");

    //${process.env.hjd}
    fetch(
      `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${process.env.hjd}&type=xml&pageNo=1&numOfRows=3&flag=Y&locatadd_nm=${req.body}`
    )
      .then((res) => res.text())
      .then((xmlStr) => {
        parseString(xmlStr, { explicitArray: false }, (err, obj) => {
          res.status(200).json({
            name: "법정동 서버 완료",
            result: obj.StanReginCd.row,
          });
        });
      });
  } catch (err) {
    res.status(504).json({ name: `${err}` });
  }

  //   res.status(200).json({ name: "John Doe" });
}
