import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/img/site-logo.png";
const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const handleMenuToggle = () => {
		setMenuOpen(!menuOpen);
	};

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add("mobile-nav-active");
		} else {
			document.body.classList.remove("mobile-nav-active");
		}
	}, [menuOpen]);
	return (
		<header
			id="header"
			className="header d-flex align-items-center fixed-top container"
		>
			<div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
				<a
					href="index.html"
					className="logo d-flex align-items-center me-auto me-xl-0"
				>
					{/* Uncomment to use Logo */}
					<img
						src={logo}
						alt="site-logo"
						style={{
							objectFit: "cover",
							width: "140px",
							height: "auto",
						}}
					/>
					{/* <h1 className="sitename">ApplyBridge</h1> */}
				</a>

				<nav id="navmenu" className="navmenu mr-5 ">
					<ul>
						<li>
							<a href="#hero" className="active">
								Home
							</a>
						</li>
						<li>
							<a href="#about">About</a>
						</li>
						<li>
							<a href="#features">Features</a>
						</li>
						<li>
							<a href="#services">Services</a>
						</li>
						<li>
							<a href="#pricing">Pricing</a>
						</li>
						<li>
							<a href="#contact">Contact</a>
						</li>
					</ul>

					{menuOpen ? (
						<FaTimes
							className="mobile-nav-toggle d-lg-none "
							onClick={handleMenuToggle}
						/>
					) : (
						<FaBars
							className="mobile-nav-toggle d-lg-none "
							onClick={handleMenuToggle}
						/>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
