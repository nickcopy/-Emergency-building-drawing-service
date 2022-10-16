import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout(props: LayoutProps) {
  const router = useRouter();
  const menuItems = [
    {
      href: "/",
      title: "Map",
    },
    {
      href: "/Login",
      title: "Login",
    },
    {
      href: "/SingUp",
      title: "SignUp",
    },
    {
      href: "/Drawingupdata",
      title: "drawing_Updata",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase">
        도면 지원 시스템
      </header>
      <div className="flex flex-col  w-28 md:flex-row flex-1">
        <aside className="bg-fuchsia-100 w-full md:w-60">
          {" "}
          <nav>
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className="m-2" key={title}>
                  <Link href={href}>
                    <a
                      className={`flex p-2 w-36 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer${
                        router.asPath === href && "bg-fuchsia-600 text-white"
                      }`}
                    >
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{props.children}</main>
      </div>
    </div>
  );
}
