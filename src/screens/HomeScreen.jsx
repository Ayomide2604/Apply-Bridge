import Pricing from "../pages/Pricing";
import Hero from "../pages/Hero";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";
import Testimonials from "../pages/Testimonials";
import About from "../pages/About";
import Services from "../pages/Services";
const HomeScreen = () => {
	return (
		<div>
			<Hero />
			<About />
			{/* <Testimonials /> */}
			<Services />
			<Pricing />
			<Faq />
			<Contact />
		</div>
	);
};

export default HomeScreen;
