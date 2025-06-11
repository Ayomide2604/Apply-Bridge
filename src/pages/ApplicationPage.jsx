import { useState } from "react";

const initialState = {
	countries: [],
	countriesOther: "",
	legalWork: "",
	workStatus: [],
	workStatusOther: "",
	firstName: "",
	lastName: "",
	phone: "",
	email: "",
	linkedin: "",
	streetAddress: "",
	city: "",
	stateProvince: "",
	zip: "",
	countryOfResidence: "",
	securityClearance: "",
	jobType: [],
	expectedSalary: "",
	doNotApplyList: "",
	cvFile: null, // New field for CV upload
	gender: "",
	race: [],
	veteran: "",
	disability: "",
};

const yesNoOptions = ["Yes", "No"];
const genderOptions = ["", "Male", "Female", "Other", "Prefer not to say"];
const raceOptions = [
	"",
	"White",
	"Black or African American",
	"Asian",
	"Hispanic or Latino",
	"Native American",
	"Other",
	"Prefer not to say",
];
const yearOptions = Array.from({ length: 26 }, (_, i) => (2000 + i).toString());
const countryOptions = [
	"USA",
	"Canada",
	"United Kingdom",
	"Australia",
	"Other",
];
const legalWorkOptions = ["Yes", "No", "Some", "Not sure"];
const workStatusOptions = [
	"Citizen",
	"Permanent Resident",
	"Work Permit Holder",
	"Student Visa",
	"Other",
];
const securityClearanceOptions = ["Yes", "No", "Prefer not to say"];
const jobTypeOptions = ["Remote", "Onsite", "Hybrid", "Contract", "Full-time"];
const genderMCOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];
const raceCheckboxOptions = [
	"Black / African",
	"White",
	"Hispanic / Latino",
	"Asian",
	"Indigenous",
	"Prefer not to say",
	"Other",
];
const veteranOptions = ["Yes", "No", "Prefer not to say"];
const disabilityOptions = ["Yes", "No", "Prefer not to say"];

function validate(form) {
	const errors = {};
	if (!form.firstName?.trim()) errors.firstName = "First name is required.";
	if (!form.lastName?.trim()) errors.lastName = "Last name is required.";
	if (!form.phone?.trim()) errors.phone = "Phone number is required.";
	else if (!/^\+?[0-9\s-]{7,20}$/.test(form.phone))
		errors.phone = "Enter a valid phone number.";
	if (!form.email?.trim()) errors.email = "Email is required.";
	else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
		errors.email = "Enter a valid email address.";
	if (!form.streetAddress?.trim())
		errors.streetAddress = "Street address is required.";
	if (!form.city?.trim()) errors.city = "City is required.";
	if (!form.stateProvince?.trim())
		errors.stateProvince = "State/Province is required.";
	if (!form.zip?.trim()) errors.zip = "Zip/Postal code is required.";
	if (!form.countryOfResidence?.trim())
		errors.countryOfResidence = "Country of residence is required.";
	if (!form.countries?.length)
		errors.countries = "Select at least one country.";
	if (!form.legalWork)
		errors.legalWork = "Please select your legal work status.";
	if (!form.workStatus?.length)
		errors.workStatus = "Select at least one work status.";
	if (form.workStatus?.includes("Other") && !form.workStatusOther?.trim())
		errors.workStatusOther = "Please specify other work status.";
	if (form.countries?.includes("Other") && !form.countriesOther?.trim())
		errors.countriesOther = "Please specify other country.";
	if (!form.securityClearance)
		errors.securityClearance = "Please select an option.";
	if (!form.jobType?.length) errors.jobType = "Select at least one job type.";
	if (!form.expectedSalary?.trim())
		errors.expectedSalary = "Expected salary is required.";
	if (!form.cvFile) errors.cvFile = "CV upload is required.";
	else if (form.cvFile && !/(pdf|doc|docx)$/i.test(form.cvFile.name))
		errors.cvFile = "CV must be a PDF, DOC, or DOCX file.";
	if (!form.gender) errors.gender = "Gender is required.";
	if (!form.race?.length) errors.race = "Race/Ethnicity is required.";
	if (!form.veteran) errors.veteran = "Veteran status is required.";
	if (!form.disability) errors.disability = "Disability status is required.";
	return errors;
}

const sections = [
	"Country & Legal Status",
	"Contact Information",
	"Job Preferences",
	"CV Upload",
	"Demographic",
	"Summary",
];

function getSectionFields(section) {
	switch (section) {
		case "Country & Legal Status":
			return [
				"countries",
				"countriesOther",
				"legalWork",
				"workStatus",
				"workStatusOther",
			];
		case "Contact Information":
			return [
				"firstName",
				"lastName",
				"phone",
				"email",
				"linkedin",
				"streetAddress",
				"city",
				"stateProvince",
				"zip",
				"countryOfResidence",
			];
		case "Job Preferences":
			return [
				"securityClearance",
				"jobType",
				"expectedSalary",
				"doNotApplyList",
			];
		case "CV Upload":
			return ["cvFile"];
		case "Demographic":
			return ["gender", "race", "veteran", "disability"];
		case "Summary":
			return [];
		default:
			return [];
	}
}

const summaryLabels = {
	countries: "Countries to apply for",
	countriesOther: "Other country",
	legalWork: "Legally allowed to work",
	workStatus: "Work status",
	workStatusOther: "Other work status",
	firstName: "First Name",
	lastName: "Last Name",
	phone: "Phone Number",
	email: "Email Address",
	linkedin: "LinkedIn Profile URL",
	streetAddress: "Street Address",
	city: "City",
	stateProvince: "State / Province",
	zip: "Zip / Postal Code",
	countryOfResidence: "Country of Residence",
	securityClearance: "Security Clearance",
	jobType: "Preferred job type",
	expectedSalary: "Expected annual salary",
	doNotApplyList: "Do not apply list",
	cvFile: "CV File",
	gender: "Gender",
	race: "Race / Ethnicity",
	veteran: "Veteran",
	disability: "Disability",
};

const allSectionFields = sections.flatMap(getSectionFields);

export default function ApplicationPage() {
	const [form, setForm] = useState(initialState);
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState({});
	const [step, setStep] = useState(0);
	const [showAllErrors, setShowAllErrors] = useState(false);
	// Track completed sections
	const [completedSections, setCompletedSections] = useState([true]);

	const currentSection = sections[step];
	const sectionFields = getSectionFields(currentSection);

	function validateSection(form, section) {
		const allErrors = validate(form);
		const sectionErrors = {};
		for (const key of sectionFields) {
			if (allErrors[key]) sectionErrors[key] = allErrors[key];
		}
		return sectionErrors;
	}

	const handleChange = (e) => {
		const { name, value, type, checked, files } = e.target;
		if (type === "checkbox") {
			if (Array.isArray(form[name])) {
				setForm((prev) => ({
					...prev,
					[name]: checked
						? [...prev[name], value]
						: prev[name].filter((v) => v !== value),
				}));
			} else {
				setForm((prev) => ({ ...prev, [name]: checked }));
			}
		} else if (type === "file") {
			setForm((prev) => ({ ...prev, [name]: files[0] }));
		} else {
			setForm((prev) => ({ ...prev, [name]: value }));
		}
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	const handleNext = (e) => {
		e.preventDefault();
		const sectionErrors = validateSection(form, currentSection);
		setErrors(sectionErrors);
		if (Object.keys(sectionErrors).length === 0) {
			setCompletedSections((prev) => {
				const updated = [...prev];
				updated[step + 1] = true;
				return updated;
			});
			setStep((prev) => prev + 1);
		}
	};

	const handlePrev = (e) => {
		e.preventDefault();
		setErrors({});
		setStep((prev) => prev - 1);
	};

	const handleFinalSubmit = (e) => {
		e.preventDefault();
		const validation = validate(form);
		setErrors(validation);
		if (Object.keys(validation).length === 0) {
			setSubmitted(true);
		} else {
			setShowAllErrors(true);
			// Stay on summary and show errors, do not change step or view
		}
	};

	if (submitted) {
		return (
			<div
				style={{
					maxWidth: 500,
					margin: "80px auto",
					padding: 32,
					background: "#f8fafc",
					borderRadius: 16,
				}}
			>
				<h2 style={{ textAlign: "center", color: "#1976d2" }}>
					Thank you for your submission!
				</h2>
				<p style={{ textAlign: "center" }}>
					We have received your information.
				</p>
			</div>
		);
	}

	return (
		<div
			style={{
				maxWidth: 700,
				margin: "80px auto",
				padding: 32,
				background: "#f8fafc",
				borderRadius: 16,
			}}
		>
			<h2 style={{ textAlign: "center", color: "#1976d2", marginBottom: 24 }}>
				Job Application Form
			</h2>
			{/* Required fields instruction */}
			<div
				style={{
					marginBottom: 20,
					color: "#b71c1c",
					fontWeight: 500,
					fontSize: 16,
				}}
			>
				Fields marked with <span style={{ color: "red" }}>*</span> are required.
			</div>
			{/* Tab Navigation */}
			<div
				style={{
					display: "flex",
					marginBottom: 32,
					borderBottom: "2px solid #e0e7ef",
				}}
			>
				{sections.map((section, idx) => (
					<button
						key={section}
						type="button"
						onClick={() => setStep(idx)}
						style={{
							flex: 1,
							padding: "12px 0",
							background: idx === step ? "#1976d2" : "transparent",
							color: idx === step ? "#fff" : "#1976d2",
							border: "none",
							borderBottom:
								idx === step ? "4px solid #1976d2" : "4px solid transparent",
							fontWeight: idx === step ? 700 : 500,
							cursor: idx === step ? "default" : "pointer",
							opacity: 1,
							transition: "background 0.2s, color 0.2s",
						}}
					>
						{section}
					</button>
				))}
			</div>
			<form
				onSubmit={step === sections.length - 1 ? handleFinalSubmit : handleNext}
			>
				{/* Render only the current section or summary */}
				{step < sections.length && (
					<>
						{/* Render only the current section */}
						{currentSection === "Country & Legal Status" && (
							<>
								<h3 style={{ color: "#1976d2", marginTop: 24 }}>
									Country & Legal Status
								</h3>
								<label>
									Which countries would you like to apply for jobs in?
									<span style={{ color: "red" }}>*</span>
								</label>
								<div className="mb-3">
									{countryOptions.map((c) => (
										<label key={c} style={{ marginRight: 16 }}>
											<input
												type="checkbox"
												name="countries"
												value={c}
												checked={form.countries.includes(c)}
												onChange={handleChange}
												className="form-check-input"
												style={{ marginRight: 4 }}
											/>
											{c}
										</label>
									))}
								</div>
								{errors.countries && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.countries}
									</div>
								)}
								{form.countries.includes("Other") && (
									<div className="mb-3">
										<label>
											If you selected 'Other', please specify
											<span style={{ color: "red" }}>*</span>
										</label>
										<input
											name="countriesOther"
											value={form.countriesOther}
											onChange={handleChange}
											className="form-control"
										/>
										{errors.countriesOther && (
											<div style={{ color: "red", marginBottom: 8 }}>
												{errors.countriesOther}
											</div>
										)}
									</div>
								)}
								<label>
									Are you legally allowed to work in the countries you selected?
									<span style={{ color: "red" }}>*</span>
								</label>
								<select
									name="legalWork"
									value={form.legalWork}
									onChange={handleChange}
									className="form-control mb-3"
								>
									<option value="">Select...</option>
									{legalWorkOptions.map((o) => (
										<option key={o} value={o}>
											{o}
										</option>
									))}
								</select>
								{errors.legalWork && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.legalWork}
									</div>
								)}
								<label>
									What is your work status?
									<span style={{ color: "red" }}>*</span>
								</label>
								<select
									name="workStatus"
									value={form.workStatus}
									onChange={(e) =>
										setForm((prev) => ({
											...prev,
											workStatus: [e.target.value],
										}))
									}
									className="form-control mb-3"
								>
									<option value="">Select...</option>
									{workStatusOptions.map((o) => (
										<option key={o} value={o}>
											{o}
										</option>
									))}
								</select>
								{errors.workStatus && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.workStatus}
									</div>
								)}
								{form.workStatus.includes("Other") && (
									<div className="mb-3">
										<label>
											If you selected 'Other' work status, please specify
											<span style={{ color: "red" }}>*</span>
										</label>
										<input
											name="workStatusOther"
											value={form.workStatusOther}
											onChange={handleChange}
											className="form-control"
										/>
										{errors.workStatusOther && (
											<div style={{ color: "red", marginBottom: 8 }}>
												{errors.workStatusOther}
											</div>
										)}
									</div>
								)}
							</>
						)}
						{currentSection === "Contact Information" && (
							<>
								<h3 style={{ color: "#1976d2", marginTop: 24 }}>
									Contact Information
								</h3>
								<div className="mb-3">
									<label>
										First Name <span style={{ color: "red" }}>*</span>
									</label>
									<input
										name="firstName"
										value={form.firstName}
										onChange={handleChange}
										required
										className="form-control"
									/>
									{errors.firstName && (
										<div style={{ color: "red", marginBottom: 8 }}>
											{errors.firstName}
										</div>
									)}
								</div>
								<div className="mb-3">
									<label>
										Last Name <span style={{ color: "red" }}>*</span>
									</label>
									<input
										name="lastName"
										value={form.lastName}
										onChange={handleChange}
										required
										className="form-control"
									/>
									{errors.lastName && (
										<div style={{ color: "red", marginBottom: 8 }}>
											{errors.lastName}
										</div>
									)}
								</div>
								<div className="mb-3">
									<label>
										Phone Number <span style={{ color: "red" }}>*</span>
									</label>
									<input
										name="phone"
										value={form.phone}
										onChange={handleChange}
										required
										className="form-control"
									/>
									{errors.phone && (
										<div style={{ color: "red", marginBottom: 8 }}>
											{errors.phone}
										</div>
									)}
								</div>
								<div className="mb-3">
									<label>
										Email Address <span style={{ color: "red" }}>*</span>
									</label>
									<input
										type="email"
										name="email"
										value={form.email}
										onChange={handleChange}
										required
										className="form-control"
									/>
									{errors.email && (
										<div style={{ color: "red", marginBottom: 8 }}>
											{errors.email}
										</div>
									)}
								</div>
								<div className="mb-3">
									<label>LinkedIn Profile URL</label>
									<input
										name="linkedin"
										value={form.linkedin}
										onChange={handleChange}
										className="form-control"
									/>
								</div>
								<div className="mb-3">
									<label>
										Country of Residence <span style={{ color: "red" }}>*</span>
									</label>
									<input
										name="countryOfResidence"
										value={form.countryOfResidence}
										onChange={handleChange}
										required
										className="form-control"
									/>
									{errors.countryOfResidence && (
										<div style={{ color: "red", marginBottom: 8 }}>
											{errors.countryOfResidence}
										</div>
									)}
								</div>
								<div className="mb-3">
									<label>
										State / Province <span style={{ color: "red" }}>*</span>
									</label>
									<input
										name="stateProvince"
										value={form.stateProvince}
										onChange={handleChange}
										required
										className="form-control"
									/>
									{errors.stateProvince && (
										<div style={{ color: "red", marginBottom: 8 }}>
											{errors.stateProvince}
										</div>
									)}
								</div>
								<div className="mb-3">
									<label>
										City <span style={{ color: "red" }}>*</span>
									</label>
									<input
										name="city"
										value={form.city}
										onChange={handleChange}
										required
										className="form-control"
									/>
									{errors.city && (
										<div style={{ color: "red", marginBottom: 8 }}>
											{errors.city}
										</div>
									)}
								</div>
								<div className="mb-3">
									<label>
										Zip / Postal Code <span style={{ color: "red" }}>*</span>
									</label>
									<input
										name="zip"
										value={form.zip}
										onChange={handleChange}
										required
										className="form-control"
									/>
									{errors.zip && (
										<div style={{ color: "red", marginBottom: 8 }}>
											{errors.zip}
										</div>
									)}
								</div>
							</>
						)}
						{currentSection === "Job Preferences" && (
							<>
								<h3 style={{ color: "#1976d2", marginTop: 24 }}>
									Job Preferences
								</h3>
								<label>
									Do you have any security clearance?
									<span style={{ color: "red" }}>*</span>
								</label>
								<select
									name="securityClearance"
									value={form.securityClearance}
									onChange={handleChange}
									className="form-control mb-3"
								>
									<option value="">Select...</option>
									{securityClearanceOptions.map((o) => (
										<option key={o} value={o}>
											{o}
										</option>
									))}
								</select>
								{errors.securityClearance && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.securityClearance}
									</div>
								)}
								<label>
									Preferred job type?<span style={{ color: "red" }}>*</span>
								</label>
								<div className="mb-3">
									{jobTypeOptions.map((o) => (
										<label key={o} style={{ marginRight: 16 }}>
											<input
												type="checkbox"
												name="jobType"
												value={o}
												checked={form.jobType.includes(o)}
												onChange={handleChange}
												className="form-check-input"
												style={{ marginRight: 4 }}
											/>
											{o}
										</label>
									))}
								</div>
								{errors.jobType && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.jobType}
									</div>
								)}
								<label>
									Expected annual salary (include currency)
									<span style={{ color: "red" }}>*</span>
								</label>
								<input
									name="expectedSalary"
									value={form.expectedSalary}
									onChange={handleChange}
									required
									className="form-control mb-3"
								/>
								{errors.expectedSalary && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.expectedSalary}
									</div>
								)}
								<label>
									Any companies or job types you want us to AVOID applying to?
								</label>
								<textarea
									name="doNotApplyList"
									value={form.doNotApplyList}
									onChange={handleChange}
									className="form-control mb-3"
									style={{ height: 30, fontSize: 18, padding: "12px" }}
								/>
							</>
						)}
						{currentSection === "CV Upload" && (
							<>
								<h3 style={{ color: "#1976d2", marginTop: 24 }}>CV Upload</h3>
								<label>
									Please upload your CV (PDF, DOC, or DOCX)
									<span style={{ color: "red" }}>*</span>
								</label>
								<input
									type="file"
									name="cvFile"
									accept=".pdf,.doc,.docx"
									onChange={handleChange}
									className="form-control mb-3"
									style={{ height: 30, fontSize: 16 }}
								/>
								{form.cvFile && (
									<div style={{ marginBottom: 8 }}>
										<strong>Selected file:</strong> {form.cvFile.name}
									</div>
								)}
								{errors.cvFile && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.cvFile}
									</div>
								)}
							</>
						)}
						{currentSection === "Demographic" && (
							<>
								<h3 style={{ color: "#1976d2", marginTop: 24 }}>Demographic</h3>
								<label>
									Gender<span style={{ color: "red" }}>*</span>
								</label>
								<select
									name="gender"
									value={form.gender}
									onChange={handleChange}
									className="form-control mb-3"
								>
									<option value="">Select...</option>
									{genderMCOptions.map((g) => (
										<option key={g} value={g}>
											{g}
										</option>
									))}
								</select>
								{errors.gender && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.gender}
									</div>
								)}
								<label>
									Race / Ethnicity<span style={{ color: "red" }}>*</span>
								</label>
								<select
									name="race"
									value={form.race[0] || ""}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, race: [e.target.value] }))
									}
									className="form-control mb-3"
								>
									<option value="">Select...</option>
									{raceCheckboxOptions.map((r) => (
										<option key={r} value={r}>
											{r}
										</option>
									))}
								</select>
								{errors.race && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.race}
									</div>
								)}
								<label>
									Are you a veteran?<span style={{ color: "red" }}>*</span>
								</label>
								<select
									name="veteran"
									value={form.veteran}
									onChange={handleChange}
									className="form-control mb-3"
								>
									<option value="">Select...</option>
									{veteranOptions.map((v) => (
										<option key={v} value={v}>
											{v}
										</option>
									))}
								</select>
								{errors.veteran && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.veteran}
									</div>
								)}
								<label>
									Do you identify as having a disability?
									<span style={{ color: "red" }}>*</span>
								</label>
								<select
									name="disability"
									value={form.disability}
									onChange={handleChange}
									className="form-control mb-3"
								>
									<option value="">Select...</option>
									{disabilityOptions.map((d) => (
										<option key={d} value={d}>
											{d}
										</option>
									))}
								</select>
								{errors.disability && (
									<div style={{ color: "red", marginBottom: 8 }}>
										{errors.disability}
									</div>
								)}
							</>
						)}
						{currentSection === "Summary" && (
							<>
								<h3 style={{ color: "#1976d2", marginTop: 24 }}>Summary</h3>
								{(showAllErrors && Object.keys(errors).length > 0) && (
									<div style={{ color: "red", marginBottom: 16 }}>
										<strong>
											Please fix the following errors before submitting:
										</strong>
										<ul>
											{Object.entries(errors).map(([k, v]) => (
												<li key={k}>
													{summaryLabels[k] || k}: {v}
												</li>
											))}
										</ul>
									</div>
								)}
								<div
									style={{
										background: "#fff",
										borderRadius: 8,
										padding: 24,
										marginBottom: 24,
										boxShadow: "0 2px 8px #0001",
									}}
								>
									{allSectionFields
										.filter((key) => key !== "Summary")
										.map((key) => (
											<div key={key} style={{ marginBottom: 12 }}>
												<strong>{summaryLabels[key] || key}:</strong>{" "}
												{key === "cvFile" ? (
													form.cvFile ? (
														form.cvFile.name
													) : (
														<span style={{ color: "#888" }}>-</span>
													)
												) : Array.isArray(form[key]) ? (
													form[key].join(", ")
												) : (
													form[key] || <span style={{ color: "#888" }}>-</span>
												)}
											</div>
										))}
								</div>
							</>
						)}
					</>
				)}
				{/* Navigation Buttons */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: 32,
					}}
				>
					<button
						type="button"
						onClick={handlePrev}
						disabled={step === 0}
						style={{
							padding: "10px 24px",
							borderRadius: 8,
							background: "#1976d2",
							color: "#fff",
							border: "none",
							fontWeight: 600,
							opacity: step === 0 ? 0.5 : 1,
							cursor: step === 0 ? "not-allowed" : "pointer",
							marginRight: 16,
						}}
					>
						Previous
					</button>
					{currentSection !== "Summary" && (
						<button
							type="submit"
							disabled={step === sections.length - 2}
							style={{
								padding: "10px 24px",
								borderRadius: 8,
								background: "#1976d2",
								color: "#fff",
								border: "none",
								fontWeight: 600,
								opacity: step === sections.length - 2 ? 0.5 : 1,
								cursor:
									step === sections.length - 2 ? "not-allowed" : "pointer",
								marginLeft: "auto",
							}}
						>
							Next
						</button>
					)}
					{currentSection === "Summary" && (
						<button
							type="submit"
							disabled={Object.keys(errors).length > 0}
							style={{
								padding: "10px 24px",
								borderRadius: 8,
								background: "#1976d2",
								color: "#fff",
								border: "none",
								fontWeight: 600,
								marginLeft: "auto",
								opacity: Object.keys(errors).length > 0 ? 0.5 : 1,
								cursor:
									Object.keys(errors).length > 0 ? "not-allowed" : "pointer",
							}}
						>
							Submit
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
