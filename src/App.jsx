import Footer from "./components/Footer";
import Header from "./components/Header";
import Pricing from "./pages/Pricing";
import Hero from "./pages/Hero";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Services from "./pages/Services";

function App() {
	return (
		<>
			<Header />
			<main className="main" style={{ minHeight: "100vh" }}>
				<Hero />
				<About />
				{/* <Testimonials /> */}
				<Services />
				<Pricing />
				<Faq />
				<Contact />
			</main>
			<Footer />
		</>
	);
}

export default App;
