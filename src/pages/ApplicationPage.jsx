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
			// Do nothing else if errors exist
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
			{/* Google Form Embed - replace the src below with your own if needed */}
			<iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLSfO7oxb7JhmGVuiJt0fFdBsgkEwZg2fo3x6a2jdl_owRTI95g/viewform?embedded=true"
				width="100%"
				height="1200"
				frameBorder="0"
				marginHeight="0"
				marginWidth="0"
				title="Job Application"
				style={{ background: "#fff", borderRadius: 8 }}
			>
				Loading…
			</iframe>
		</div>
	);
}
