// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { useEffect } from "react";

type Data = {
  name: string;
  result?: any;
  err?: any;
};
function ff(s: string) {
  let length = 5;
  let str = "";
  for (let i = 0; i < length - s.length; i++) {
    str = str + "0";
  }
  str = str + s;
  return str;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let s1 = "",
    s2 = "";
  const ss = Number(req.body);
  {
    s1 = String(ss / 100000);
    s2 = String(ss % 100000);

    s1 = String(Math.floor(Number(s1)));
    s2 = ff(s2);
  }
  try {
    console.log(req.body, "빌더 서버");
    console.log(s1, s2);
    
    setTimeout(() => {
      fetch(
        `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrRecapTitleInfo?ServiceKey=${process.env.Building_information_API_KEY}&sigunguCd=${s1}&bjdongCd=${s2}&bun=0012&ji=0000`,
        { headers: { Accept: "application/json" } }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json.response.body.items.item);

          res.status(200).json({
            name: "건물 제원 서버",
            result: json.response.body.items.item,
          });
        });
    }, 2000);
  } catch (err) {
    res.status(500).json({ name: "건물제원 서버" });
  }
}
