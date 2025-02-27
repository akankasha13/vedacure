import { Button, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  let toLink = "/login",
    btnText = "Login";
  if (activePath == "/login") {
    toLink = "/signup";
    btnText = "Signup";
  } else if (activePath == "/signup") {
    toLink = "/login";
    btnText = "Login";
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
      {activePath != "/" &&
        activePath != "/login" &&
        activePath != "/signup" && <Navigation activePath={activePath} />}
    </header>
  );
}

function Hero() {
  return <div className="main"></div>;
}

function Boxes() {
  return (
    <div className="boxB">
      <h2 className="font-mono text-4xl font-medium text-black uppercase">
        We Provide
      </h2>
      <div className="boxes">
        <Link to={"/risk"}>
          <div className="BB">
            <img src="./risk.png" alt="Risk Analysis" className="image p-3" />
            <p className="font-mono text-xl font-light">Risk Analysis</p>
          </div>
        </Link>
        <Link to={"/tracking"}>
          <div className="BB">
            <img
              src="./tracking.png"
              alt="HealthTracking"
              className="image p-3"
            />
            <p className="font-mono text-xl font-light">Health Tracking</p>
          </div>
        </Link>
        <Link to={"/natropathy"}>
          <div className="BB">
            <img src="./natropathy.jpg" alt="Natropathy" className="image" />
            <p className="font-mono text-xl font-light">Natropathy</p>
          </div>
        </Link>
        <Link to={"/records"}>
          <div className="BB">
            <img
              src="./record.jpg"
              alt="Medical Records"
              className="image p-3"
            />
            <p className="font-mono text-xl font-light">Medical Records</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function Quote() {
  return (
    <div className="about-us flex flex-col items-center gap-5">
      <h2 className="text-bold font-mono text-4xl font-medium uppercase">
        About Us
      </h2>
      <p className="px-56 text-center">
        At VedaCure, we believe in a holistic approach to health—integrating
        modern medical insights with the wisdom of natural healing. Our platform
        is designed to empower individuals by providing easy access to essential
        health tools, ensuring a well-rounded approach to well-being.
      </p>
      <p className="px-56 text-center">
        We aim to bridge the gap between conventional healthcare and
        naturopathy, offering a seamless digital experience for health tracking,
        risk analysis, and medical record management. VedaCure is built to help
        you take control of your health with personalized insights and
        easy-to-use tools.
      </p>
    </div>
  );
}

function CTA() {
  return (
    <div className="white">
      <div className="blue">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">
            Sign-up at our platform to get started!!
          </h1>
          <p id="hero-text">
            Its time for you to take the action in your hand and improve your
            lifestyle.
          </p>
        </div>
        <Link to={"/signup"}>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  fontWeight: "600",
                },
              },
            }}
          >
            <Button size="large">Sign Up</Button>
          </ConfigProvider>
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div>Copyright @ VedaCure 2025</div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <Boxes />
      <Quote />
      <CTA />
      <Footer />
    </div>
  );
}

export { Header, Hero, Boxes, Quote, CTA, Footer, LandingPage };
