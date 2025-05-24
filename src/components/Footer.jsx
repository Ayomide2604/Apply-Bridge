import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
	return (
		<footer id="footer" className="footer">
			<div className="container footer-top"></div>

			<div className="container copyright mt-4 d-grid text-center">
				<p className="mb-3">
					© <span>Copyright {new Date().getFullYear()}</span>{" "}
					<strong className="px-1 sitename">Apply Bridge</strong>{" "}
					<span>All Rights Reserved</span>
				</p>

				<div className="social-links d-flex justify-content-center">
					<a href="">
						<FaFacebook />
					</a>
					<a href="">
						<FaTwitter />
					</a>
					<a href="">
						<FaLinkedin />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
