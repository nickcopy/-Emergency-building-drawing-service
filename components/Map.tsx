import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface Row {
  region_cd: string;
  sido_cd: string;
  sgg_cd: string;
  umd_cd: string;
  ri_cd: string;
  locatjumin_cd: string;
  locatjijuk_cd: string;
  locatadd_nm: string;
  locat_order: string;
  locat_rm: string;
  locathigh_cd: string;
  locallow_nm: string;
  adpt_de: string;
}
interface dlxjvpdltm {
  archArea: number;
  atchBldArea: number;
  atchBldCnt: number;
  bcRat: number;
  bjdongCd: number;
  bldNm: string;
  block: string;
  bun: string;
  bylotCnt: number;
  crtnDay: number;
  engrEpi: number;
  engrGrade: string;
  engrRat: number;
  etcPurps: string;
  fmlyCnt: number;
  gnBldCert: number;
  gnBldGrade: string;
  hhldCnt: number;
  hoCnt: number;
  indrAutoArea: number;
  indrAutoUtcnt: number;
  indrMechArea: number;
  indrMechUtcnt: number;
  itgBldCert: number;
  itgBldGrade: string;
  ji: string;
  lot: string;
  mainBldCnt: number;
  mainPurpsCd: string;
  mainPurpsCdNm: string;
  mgmBldrgstPk: string;
  naBjdongCd: number;
  naMainBun: number;
  naRoadCd: number;
  naSubBun: number;
  naUgrndCd: number;
  newOldRegstrGbCd: number;
  newOldRegstrGbCdNm: string;
  newPlatPlc: string;
  oudrAutoArea: number;
  oudrAutoUtcnt: number;
  oudrMechArea: number;
  oudrMechUtcnt: number;
  platArea: number;
  platGbCd: number;
  platPlc: string;
  pmsDay: string;
  pmsnoGbCd: string;
  pmsnoGbCdNm: string;
  pmsnoKikCd: string;
  pmsnoKikCdNm: string;
  pmsnoYear: string;
  regstrGbCd: number;
  regstrGbCdNm: string;
  regstrKindCd: number;
  regstrKindCdNm: string;
  rnum: number;
  sigunguCd: number;
  splotNm: string;
  stcnsDay: string;
  totArea: number;
  totPkngCnt: number;
  useAprDay: string;
  vlRat: number;
  vlRatEstmTotArea: number;
}
export default function Map() {
  const [adrrInputData, setAdrrInputData] = useState(""); //inputData
  const [inAdrrdata, setinAdrrdata] = useState(""); //카카오에 들어가는 변수
  const [adrrNuber, setAdrrNuber] = useState(""); //시군구 numver 코드 들어오는 변수
  const [sggu, setSggu] = useState<Row>(); //시군구 코드 변수
  const [buData, setBuData] = useState<dlxjvpdltm>();
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
      });

    setTimeout(() => {
      fetch(`/api/adrrCode/buildingInformation`, {
        method: "POST",
        body: sggu?.locatjijuk_cd,
      })
        .then((res) => res.json())
        .then((json) => setBuData(json.newPlatPlc));
    }, 3000);
  }

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
      <div className="bg-white border-r-2 flex flex-col w-[40vh]">
        <div className="text-black">검색:</div>
        <div className="flex">
          <div className="mr-2">시군구 : </div>
          <input
            value={adrrInputData}
            onChange={adrrInpiutChangF}
            className="rounded-full  border-gray-500 border-b-2 mb-2"
          ></input>
          <hr></hr>
        </div>
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
        <div></div>
      </div>
      <div className="flex flex-col items-center bg-red-200 w-[265px]">
        <div>제원 필드</div>
        <div>{<div>{sggu?.locatjijuk_cd}</div>}</div>
        <div>{<div className="bf-red-200">{buData?.regstrKindCdNm}</div>}</div>
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
