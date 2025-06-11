import Footer from "./components/Footer";
import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Applications from "./pages/Applications";

function App() {
	return (
		<>
			<Header />
			<main className="main" style={{ minHeight: "100vh" }}>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/applications" element={<Applications />} />
				</Routes>
			</main>
			<Footer />
			<WhatsAppButton />
		</>
	);
}

export default App;
