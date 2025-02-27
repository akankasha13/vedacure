import {
  Header,
  Hero,
  Boxes,
  Quote,
  CTA,
  Footer,
} from "./components/Landing Page";

function App() {
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

export default App;

