import styled from "@emotion/styled";
import { useEffect, useState } from "react";

export default function Map() {
  const [addr, setAddr] = useState("");
  const [inAddrdata, setinAddrdata] = useState("");
  function addrSeleter(event: React.ChangeEvent<HTMLInputElement>) {
    setAddr(event.target.value);
  }
  function selectData() {
    setinAddrdata(addr);
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

        if (!inAddrdata?.length) {
          const markerPosition = new window.kakao.maps.LatLng(
            33.450701,
            126.570667
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);
        }
        if (inAddrdata) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(
            inAddrdata,
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
                  content: `${inAddrdata}`,
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
  }, [inAddrdata]);

  return (
    <div className=" flex  ">
      <MapContainer id="map" />
      <div className="bg-fuchsia-200  flex flex-col w-[50vh]">
        <div className="text-black">검색</div>
        <input
          value={addr}
          onChange={addrSeleter}
          className="rounded-full"
        ></input>
        <button
          onClick={selectData}
          className="hover:bg-fuchsia-600 rounded-xl hover:text-white bg-fuchsia-400"
        >
          검색버튼
        </button>
      </div>
    </div>
  );
}
const MapContainer = styled.div`
  width: 120vh;
  height: 90vh;
  padding: 16px;
`;
