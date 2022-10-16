import React, { useState } from "react";
const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB
export default function Drawingupdata() {
  const [file, setFile] = useState<File>();
  const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files === undefined) {
      return;
    }

    if (!fileExtensionValid(files)) {
      target.value = "";
      alert(
        `업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`
      );
      return;
    }

    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = "";
      alert("업로드 가능한 최대 용량은 5MB입니다. ");
      return;
    }

    setFile(files);
  };

  const fileUploadHandler = async () => {
    if (file !== undefined) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        fetch("/api/userdata/brawingupdata/data", {
          method: "PUT",
          body: formData,
          headers: {
            "Content-Type": "image/jpg",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((json) => console.log(json));
      } catch (e) {
        console.error(e);
        alert((e as { message: string }).message);
      }
    }
  };

  return (
    <>
      <div>sss</div>
      <div>
        dd
        <h1>파일 업로드 페이지</h1>
        <input type="file" onChange={fileUploadValidHandler} />
        <br />
        <br />
        <br />
        <button onClick={fileUploadHandler} type="submit">
          파일 업로드 하기
        </button>
        <hr />
      </div>
    </>
  );
}
const fileExtensionValid = ({ name }: { name: string }): boolean => {
  // 파일 확장자
  const extension = removeFileName(name);

  if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === "") {
    // 해당 if문이 수행되는 조건은
    // 1. 허용하지 않은 확장자일경우
    // 2. 확장자가 없는경우이다.
    return false;
  }
  return true;
};
const removeFileName = (originalFileName: string): string => {
  const lastIndex = originalFileName.lastIndexOf(".");
  if (lastIndex < 0) {
    return "";
  }
  return originalFileName.substring(lastIndex + 1).toLowerCase();
};
