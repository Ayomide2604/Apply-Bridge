import Footer from "./components/Footer";
import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import { Routes, Route } from "react-router-dom";
import PaymentCallback from "./pages/PaymentCallback";
import HomeScreen from "./screens/HomeScreen";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<main className="main" style={{ minHeight: "100vh" }}>
							<HomeScreen />
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
