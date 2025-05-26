const Service = ({ icon: Icon, title, description }) => {
	return (
		<div
			className="col-lg-6"
			data-aos="fade-up"
			data-aos-delay={title === "CV Optimization" ? "100" : "200"}
			style={{ cursor: "pointer" }}
		>
			<div className="service-card d-flex">
				<div className="icon flex-shrink-0">
					<Icon size={24} />
				</div>
				<div>
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
};

export default Service;
