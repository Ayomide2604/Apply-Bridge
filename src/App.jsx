import Footer from "./components/Footer";
import Header from "./components/Header";
import Pricing from "./pages/Pricing";
import Hero from "./pages/Hero";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Services from "./pages/Services";
import WhatsAppButton from "./components/WhatsAppButton";
import { Routes, Route } from "react-router-dom";
import PaymentCallback from "./pages/PaymentCallback";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<main className="main" style={{ minHeight: "100vh" }}>
							<Hero />
							<About />
							{/* <Testimonials /> */}
							<Services />
							<Pricing />
							<Faq />
							<Contact />
						</main>
					}
				/>
				<Route path="/payment-callback" element={<PaymentCallback />} />
			</Routes>
			<Footer />
			<WhatsAppButton />
		</>
	);
}

export default App;
