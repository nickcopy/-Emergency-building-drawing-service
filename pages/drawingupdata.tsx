import { useCallback, useRef } from "react";
export default function Drawingupdata() {
  ///jpg
  const InputRef = useRef<HTMLInputElement | null>(null);

  const OnUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      console.log(e.target.files[0].name);
    },
    []
  );

  const OnUploadImageButtonClick = useCallback(() => {
    if (!InputRef.current) {
      return;
    }
    InputRef.current.click();
  }, []);
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={InputRef}
        onChange={OnUploadImage}
      />
      <button onClick={OnUploadImageButtonClick} />
    </div>
  );
}
