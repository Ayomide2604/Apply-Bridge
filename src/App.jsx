import Footer from "./components/Footer";
import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Dashboard from "./pages/Dashboard";
import ApplicationPage from "./pages/ApplicationPage";

function App() {
	return (
		<>
			<Header />
			<main className="main" style={{ minHeight: "100vh" }}>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/application" element={<ApplicationPage />} />
				</Routes>
			</main>
			<Footer />
			<WhatsAppButton />
		</>
	);
}

export default App;
