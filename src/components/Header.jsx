import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/img/site-logo.png";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("hero");
	const navRefs = useRef({});

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.id;
						setActiveSection(sectionId);
					}
				});
			},
			{
				root: null,
				rootMargin: "-50% 0px",
				threshold: 0,
			}
		);

		// Observe all sections
		const sections = document.querySelectorAll("section[id]");
		sections.forEach((section) => {
			observer.observe(section);
		});

		return () => {
			sections.forEach((section) => {
				observer.unobserve(section);
			});
		};
	}, []);

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

	const navItems = [
		{ id: "hero", label: "Home" },
		{ id: "about", label: "About" },
		{ id: "features", label: "Features" },
		{ id: "services", label: "Services" },
		{ id: "pricing", label: "Pricing" },
		{ id: "contact", label: "Contact" },
	];

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

				<nav id="navmenu" className="navmenu mr-5">
					<ul>
						{navItems.map((item) => (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									className={activeSection === item.id ? "active" : ""}
									ref={(el) => (navRefs.current[item.id] = el)}
									onClick={() => setMenuOpen(false)}
									style={{ textDecoration: "none" }}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>

					{menuOpen ? (
						<FaTimes
							className="mobile-nav-toggle d-lg-none"
							onClick={handleMenuToggle}
						/>
					) : (
						<FaBars
							className="mobile-nav-toggle d-lg-none"
							onClick={handleMenuToggle}
						/>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
