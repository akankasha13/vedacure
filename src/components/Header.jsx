import { Button, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  let toLink = "/signup",
    btnText = "Signup";
  if (activePath == "/login") {
    toLink = "/signup";
    btnText = "Signup";
  } else if (activePath == "/signup") {
    toLink = "/login";
    btnText = "Login";
  } else if (localStorage.getItem("user")) {
    toLink = "/";
    btnText = "Logout";
  }

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    if (activePath != "/signup" || activePath != "/login") {
      localStorage.removeItem("user");
      localStorage.removeItem("Authorization");
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full p-6 font-mono font-medium text-white backdrop-blur-lg">
      <div
        className={
          "container mx-auto flex items-center justify-between select-none"
        }
      >
        <Link to="/">
          <h1 className="text-3xl transition-all duration-300 hover:scale-110">
            VedaCure
          </h1>
        </Link>
        <div className="flex items-center gap-5">
          <p className="text-2xl transition-all duration-500 ease-out hover:rotate-[360deg]">
            {localStorage.getItem("user") &&
              JSON.parse(localStorage.getItem("user")).username}
          </p>
          <Link to={toLink}>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    fontWeight: "700",
                  },
                },
                token: {
                  colorPrimary: "#000000",
                  lineWidth: 2,
                },
              }}
            >
              <Button size="large" ghost onClick={handleLogout}>
                {btnText}
              </Button>
            </ConfigProvider>
          </Link>
        </div>
      </div>
    </header>
  );
}
