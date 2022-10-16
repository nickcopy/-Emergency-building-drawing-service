import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface Row {
  locatjumin_cd: string;
  locatjijuk_cd: string;
}

interface DataSet {
  archArea: number;
  atchBldCnt: number;
  bcRat: number;
  bldNm: string;
  fmlyCnt: number;
  grndFlrCnt: number;
  heit: number;
  hhldCnt: number;
  etcPurps: string;
  platArea: number;
  rserthqkDsgnApplyYn: number;
  totArea: number;
  ugrndFlrCnt: number;
  useAprDay: number;
  vlRat: number;
}

export default function Map() {
  let [dataidx, setDataidx] = useState(0);
  const [adrrInputData, setAdrrInputData] = useState(""); //inputData
  const [inAdrrdata, setinAdrrdata] = useState(""); //카카오에 들어가는 변수
  const [adrrNuber, setAdrrNuber] = useState(""); //시군구 numver 코드 들어오는 변수
  const [sggu, setSggu] = useState<Row>(); //시군구 코드 변수
  const [ben, setBen] = useState("");
  const [gi, setGi] = useState("");
  const [buData, setBuData] = useState<DataSet[]>([]);
  function adrrInpiutChangF(event: React.ChangeEvent<HTMLInputElement>) {
    setAdrrInputData(event.target.value);
  }
  function selectDataF() {
    //카카오위치 버튼
    setinAdrrdata(adrrInputData);
  }
  //주소번역 api 버튼 or 제원검색 api
  function searchSpecificationsF() {
    fetch(`/api/adrrCode/adrrCodeApi`, {
      method: "POST",
      body: adrrInputData,
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json, "법정동 코드 서버응답");
        setSggu(json.result);
        console.log(sggu?.locatjijuk_cd);

        return json.result;
      })
      .then((result) => {
        fetch(`/api/adrrCode/buildingInformation`, {
          method: "POST",
          body: result.locatjijuk_cd,
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json.result, "gg");
            setBuData(json.result);
            return json;
          })
          .then((json) => console.log(json.result, "ww"));
      });
  }
  console.log(buData, "end");
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        };
        const map = new window.kakao.maps.Map(container, options);

        if (!inAdrrdata?.length) {
          const markerPosition = new window.kakao.maps.LatLng(
            33.450701,
            126.570667
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);
        }
        if (inAdrrdata) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(
            inAdrrdata,
            function (result: any, status: any) {
              // 정상적으로 검색이 완료됐으면

              if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );

                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords,
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `${inAdrrdata}`,
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
              }
            }
          );
        }
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [inAdrrdata, adrrNuber, buData]);

  return (
    <div className=" flex  ">
      <MapContainer id="map" />
      <div className="bg-white border-r-2 flex flex-col w-[42vh]">
        <div className="text-black">검색ex : 서울특별시 강남구 개포동</div>
        <div className="flex">
          <div className="mr-2">시군구 : </div>
          <input
            value={adrrInputData}
            onChange={adrrInpiutChangF}
            className="rounded-full  border-gray-500 border-b-2 mb-2"
          ></input>
          <hr></hr>
        </div>
        <div className="flex flex-col">
          <div className="mr-2">번 : </div>
          <input
            value={ben}
            onChange={(envent) => {
              setBen(envent.target.value);
            }}
            className="rounded-full  border-gray-500 border-b-2 mb-2"
          ></input>
          <div className="mr-2">지 : </div>
          {/* <input
            value={gi}
            onChange={(envent) => {
              setGi(envent.target.value);
            }}
            className="rounded-full  border-gray-500 border-b-2 mb-2"
          ></input> */}

          <hr></hr>
        </div>
        <div>번,지 ex:0012 (4자리 고정)</div>
        <button
          onClick={selectDataF}
          className="hover:bg-fuchsia-600 rounded-xl hover:text-white bg-violet-400"
        >
          위치 검색
        </button>
        <button
          className="mt-2 hover:bg-fuchsia-500 rounded-xl hover:text-white bg-violet-400"
          onClick={searchSpecificationsF}
        >
          제원 검색
        </button>
      </div>
      <div className="flex flex-col items-center bg-red-200 w-[250px]">
        <div>제원 필드</div>
        <select
          onChange={(event) => {
            setDataidx(Number(event.target.value));
            console.log(buData);
          }}
        >
          <option hidden>선택하세요</option>
          {buData.map((ele, idx) => {
            return (
              <option key={idx} value={idx}>
                {ele.bldNm}
              </option>
            );
          })}
        </select>
        <div>
          <div>특수지명 : {dataidx ? buData[dataidx].bldNm : ""}</div>
          <div>대지면적(㎡):{dataidx ? buData[dataidx].platArea : ""}</div>{" "}
          <div> 건축면적(㎡):{dataidx ? buData[dataidx].archArea : ""}</div>{" "}
          <div> 건폐율(%):{dataidx ? buData[dataidx].bcRat : ""}</div>{" "}
          <div> 연면적(㎡):{dataidx ? buData[dataidx].totArea : ""}</div>{" "}
          <div> 용적률(%):{dataidx ? buData[dataidx].vlRat : ""}</div>{" "}
          <div> 기타용도:{dataidx ? buData[dataidx].etcPurps : ""}</div>{" "}
          <div> 세대수(세대):{dataidx ? buData[dataidx].hhldCnt : ""}</div>{" "}
          <div> 가구수(가구):{dataidx ? buData[dataidx].fmlyCnt : ""}</div>{" "}
          <div> 부속건축물수:{dataidx ? buData[dataidx].atchBldCnt : ""}</div>
          <div> 사용승인일:{dataidx ? buData[dataidx].useAprDay : ""}</div>{" "}
          <div> 지상층수:{dataidx ? buData[dataidx].grndFlrCnt : ""}</div>{" "}
          <div> 높이(m):{dataidx ? buData[dataidx].heit : ""}</div>
          <div>
            {" "}
            내진 설계 적용 여부:
            {dataidx ? buData[dataidx].rserthqkDsgnApplyYn : ""}
          </div>
          <div>(0: N ,1: Y) </div>
        </div>
      </div>
    </div>
  );
}
const MapContainer = styled.div`
  width: 100vh;
  height: 90vh;
  padding: 16px;
  margin-x: 100px;
`;
