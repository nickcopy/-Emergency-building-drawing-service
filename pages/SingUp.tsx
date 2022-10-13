import { userAgentFromString } from "next/server";
import { useDebugValue, useEffect, useState } from "react";

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [name, setUserName] = useState("");
  const [hp, setHP] = useState("");
  const [ymd, setUserYMD] = useState("");
  const [purpose, setpurpose] = useState("");
  let [IDerr, setIDerr] = useState("");
  let [user_id, setID] = useState("");
  const [idc, setIdc] = useState(true);
  const [idcmsg, setIdcmsg] = useState("");
  let [ps, serPW] = useState("");
  let [PWCK, setPWCK] = useState("");
  let [PwMsg, setPwMsg] = useState(true);
  let [ckPoint, setCkPoint] = useState({
    Id_B: true,
    pw_B: true,
    email_B: true,
    name_B: true,
    HP_B: true,
    YMD_B: true,
    purpose_B: true,
  });

  function IDCheck(event: React.MouseEvent<HTMLButtonElement>) {
    fetch(`/api/userdata/${user_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        setIdc(json.ck);
        console.log(json.ck);
      });
  }
  function userDataBtn() {
    if (
      ckPoint.Id_B === true &&
      ckPoint.pw_B === true &&
      ckPoint.email_B === true &&
      ckPoint.name_B === true &&
      ckPoint.HP_B === true &&
      ckPoint.YMD_B === true &&
      ckPoint.purpose_B === true
    ) {
      const data = {
        user_id,
        ps,
        email,
        name,
        hp,
        ymd,
        purpose,
      };
      console.log(data);
      fetch(`/api/userdata/${user_id}`, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        });
    }
  }
  function pwin(event: React.ChangeEvent<HTMLInputElement>) {
    serPW(event.target.value.toString());
  }
  const pwinCK = function (event: React.ChangeEvent<HTMLInputElement>) {
    setPWCK(event.target.value.toString());
    if (ps !== PWCK) {
      setPwMsg(false);
    }
    if (ps === PWCK) {
      setPwMsg(true);
    }
  };
  function inID(event: React.ChangeEvent<HTMLInputElement>) {
    setID(event.target.value.toString());
  }
  useEffect(() => {
    4;
  }, [IDerr, PWCK]);

  return (
    <div className="flex h-[550px]  bg-red-200 flex-col justify-center items-center ">
      <div className="flex flex-col w-[450px] h-[550px] rounded-lg bg-sky-300 justify-center items-center space-y-2  border-3 border-red-800">
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
            <div className="flex flex-col">
              <input
                className="rounded-lg"
                type={"password"}
                onChange={pwinCK}
              ></input>
              {PwMsg ? (
                <span className="text-red-500">비밀번호가 다릅니다</span>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* <div>{비밀번호 확인 오류}</div> */}
        </div>
        <div className="">
          <div className="w-20">Email : </div>
          <input
            className="rounded-lg"
            onChange={(event) => {
              setEmail(event.target.value.toString());
            }}
          ></input>
          {/* <div>{이메일확인&정규식}</div> */}
        </div>
        <div>
          <div>이름</div>
          <input
            className="rounded-lg"
            onChange={(event) => {
              setUserName(event.target.value.toString());
            }}
          ></input>
        </div>
        <div>
          <div>전화번호</div>
          <input
            className="rounded-lg"
            onChange={(event) => {
              setHP(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <div>생년월일</div>
          <input
            onChange={(event) => {
              setUserYMD(event.target.value.toString());
            }}
          ></input>
        </div>
        <div className="flex flex-col">
          <div>이용목적</div>
          <input
            className="my-1 "
            onChange={(event) => {
              setpurpose(event.target.value.toString());
            }}
          ></input>
          <button className="bg-green-400 w-" onClick={userDataBtn}>
            test
          </button>
        </div>
      </div>
    </div>
  );
}
