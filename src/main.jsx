import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Router
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			<App />
		</Router>
	</React.StrictMode>
);
