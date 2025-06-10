import React, { useState, useEffect } from "react";

const WhatsAppButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [currentTime, setCurrentTime] = useState("");
	const [displayedMessage, setDisplayedMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const phoneNumber = "+2348104590152";
	const welcomeMessage = "Hi! 👋 How can I help you today?";

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const hours = now.getHours();
			const minutes = now.getMinutes();
			const ampm = hours >= 12 ? "PM" : "AM";
			const formattedHours = hours % 12 || 12;
			const formattedMinutes = minutes.toString().padStart(2, "0");
			setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
		};

		updateTime();
		const interval = setInterval(updateTime, 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (isModalOpen) {
			setIsTyping(true);
			let currentIndex = 0;
			const typingInterval = setInterval(() => {
				if (currentIndex <= welcomeMessage.length) {
					setDisplayedMessage(welcomeMessage.slice(0, currentIndex));
					currentIndex++;
				} else {
					clearInterval(typingInterval);
					setIsTyping(false);
				}
			}, 30); // Adjust typing speed here (lower = faster)

			return () => clearInterval(typingInterval);
		} else {
			setDisplayedMessage("");
		}
	}, [isModalOpen]);

	const handleOpenModal = (e) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSendMessage = () => {
		if (message.trim()) {
			const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
				message
			)}`;
			window.open(whatsappUrl, "_blank");
			setIsModalOpen(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<>
			<a
				href="#"
				className="whatsapp-button"
				onClick={handleOpenModal}
				aria-label="Chat on WhatsApp"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
					className="whatsapp-icon"
				>
					<path
						fill="currentColor"
						d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
					/>
				</svg>
			</a>

			{isModalOpen && (
				<div className="whatsapp-modal-overlay" onClick={handleCloseModal}>
					<div className="whatsapp-modal" onClick={(e) => e.stopPropagation()}>
						<div className="whatsapp-modal-header">
							<div className="whatsapp-header-content">
								<div className="whatsapp-avatar">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
										className="whatsapp-icon"
									>
										<path
											fill="currentColor"
											d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
										/>
									</svg>
								</div>
								<div className="whatsapp-header-info">
									<h3>WhatsApp</h3>
									<span className="whatsapp-status">online</span>
								</div>
							</div>
							<button className="close-button" onClick={handleCloseModal}>
								×
							</button>
						</div>
						<div className="whatsapp-chat-container">
							<div className="whatsapp-chat-messages">
								<div className="whatsapp-message received">
									<div className="message-content">
										{displayedMessage}
										{isTyping && <span className="typing-cursor">|</span>}
									</div>
									{!isTyping && (
										<div className="message-time">{currentTime}</div>
									)}
								</div>
							</div>
							<div className="whatsapp-input-container">
								<textarea
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Type a message"
									rows="1"
								/>
								<button
									className="send-button"
									onClick={handleSendMessage}
									disabled={!message.trim()}
								>
									<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
										<path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default WhatsAppButton;
