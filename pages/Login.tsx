export default function Login() {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-fuchsia-200">
      <div className="flex bg-red-200">
        <div className="flex flex-col m-4">
          <input className="m-1"></input>
          <input className="m-1"></input>
        </div>
        <div className="bg-amber-500 flex justify-center items-center hover:bg-amber-300 ">
          <button> 로그인</button>
        </div>
      </div>
    </div>
  );
}
