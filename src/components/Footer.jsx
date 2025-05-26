import { FaEnvelope, FaLinkedin, FaXTwitter } from "react-icons/fa6";
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
					<a
						href="https://x.com/ApplyBridgeHQ"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaXTwitter />
					</a>
					<a href="">
						<FaLinkedin />
					</a>
					<a href="mailto:applybridgeco@gmail.com">
						<FaEnvelope />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
