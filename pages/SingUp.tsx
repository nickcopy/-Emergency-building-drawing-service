import { userAgentFromString } from "next/server";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

export default function SingUp() {
  let [IDerr, setIDerr] = useState("");
  let [ID, setID] = useState("");
  const [idc, setIdc] = useState(true);
  const [idcmsg, setIdcmsg] = useState("");
  let [PW, serPW] = useState("");
  let [PWCK, setPWCK] = useState("");
  let [PwMsg, setPwMsg] = useState(false);
  function IDCheck(event: React.MouseEvent<HTMLButtonElement>) {
    fetch(`/api/userdata/${ID}`)
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          setIdc(false);
          setIdcmsg("불가능");
        } else {
          setIdcmsg("가능");
        }
        setIdc(json.ck);
        console.log(json.ck);
      });
    console.log(idc);
  }

  function pwin(event: React.ChangeEvent<HTMLInputElement>) {
    serPW(event.target.value);
  }
  const pwinCK = function (event: React.ChangeEvent<HTMLInputElement>) {
    setPWCK(event.target.value);
    if (PW !== PWCK) {
      setPwMsg(false);
    }
  };
  function inID(event: React.ChangeEvent<HTMLInputElement>) {
    setID(event.target.value);
  }
  useEffect(() => {
    4;
  }, [IDerr, PWCK]);

  return (
    <div className="flex h-[550px]  bg-red-200 flex-col justify-center items-center ">
      <div className="flex flex-col w-[450px] h-[400px] rounded-lg bg-sky-300 justify-center items-center space-y-2  border-3 border-red-800">
        <div className="m-1 flex flex-col">
          <div>
            <div className="">
              <div className="w-20">아이디 : </div>
              <input className="rounded-lg " onChange={inID}></input>
            </div>
            <div className="flex flex-col">
              <button
                onClick={IDCheck}
                className="bg-red-200 border-2 rounded-lg hover:bg-emerald-600"
              >
                중복확인
              </button>
              {idc ? <span>{idcmsg}</span> : <span>{idcmsg}</span>}
            </div>
          </div>
        </div>
        <div>
          <div className="">
            <div className="w-20">비밀번호 </div>
            <input
              type={"password"}
              className="rounded-lg"
              onChange={pwin}
            ></input>
          </div>
          {/* <div>{비밀번호 오류}</div> */}
        </div>
        <div>
          <div className="">
            <div>
              <div className="w-40 flex flex-col"> 비밀번호 확인 : </div>
            </div>
            <input
              className="rounded-lg"
              type={"password"}
              onChange={pwinCK}
            ></input>
            {PwMsg ? <span>비밀번호가 다릅니다</span> : ""}
          </div>
          {/* <div>{비밀번호 확인 오류}</div> */}
        </div>
        <div className="f">
          <div className="w-20">Email : </div>
          <input className="rounded-lg"></input>
          {/* <div>{이메일확인&정규식}</div> */}
        </div>
        <div>
          <input className="rounded-lg"></input>
        </div>
        <input className="rounded-lg"></input>
      </div>
    </div>
  );
}
