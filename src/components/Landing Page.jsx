import { Button, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import Header from "./Header";

function Hero() {
  return <div className="main"></div>;
}

function Boxes() {
  return (
    <div className="boxB">
      <h2 className="font-mono text-4xl font-medium text-black uppercase">
        We Provide
      </h2>
      <div className="boxes flex-wrap">
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
        <Link to={"/naturopathy"}>
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
    <div className="about-us flex hidden flex-col items-center gap-5 sm:flex">
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

export default function LandingPage() {
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

export { Hero, Boxes, Quote, CTA, Footer };
