// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { useEffect } from "react";

type Data = {
  name: string;
  result?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    fetch(
      //sig_cd,full_nm,sig_kor_nm
      `http://api.vworld.kr/req/data?key=${process.env.WORLD_OPEM_API}&service=data&version=2.0&request=getfeature&format=json&size=10&page=1&data=LT_C_ADSIGG_INFO&attrFilter=sig_kor_nm:like:안양`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        res.status(200).json({ name: "dd", result: json });
      });
  } catch (err) {
    res.status(504).json({ name: `${err}` });
  }

  //   res.status(200).json({ name: "John Doe" });
}
