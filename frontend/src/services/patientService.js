import axios from "axios";

const API_URL = "http://localhost/backend/api/patients";

const getPatients = async () => {
	try {
		const response = await axios.get(`${API_URL}/read.php`);
		return response.data.patients;
	} catch (error) {
		console.error(
			"Error fetching patients:",
			error.response ? error.response.data : error
		);
		throw error;
	}
};

const createPatient = async (patientData) => {
	try {
		const response = await axios.post(`${API_URL}/create.php`, patientData);
		return response.data;
	} catch (error) {
		console.error(
			"Error creating patient:",
			error.response ? error.response.data : error
		);
		throw error;
	}
};

const deletePatient = async (id) => {
	try {
		const response = await axios.delete(`${API_URL}/delete.php?id=${id}`);
		return response.data;
	} catch (error) {
		console.error(
			"Error deleting patient:",
			error.response ? error.response.data : error
		);
		throw error;
	}
};

const updatePatient = async (patientData) => {
	try {
		const response = await axios.put(`${API_URL}/update.php`, patientData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error updating patient:", error);
		if (error.response) {
			console.error("Error response data:", error.response.data);
			throw error.response.data;
		}
		throw error;
	}
};

const patientService = {
	getPatients,
	createPatient,
	deletePatient,
	updatePatient,
};

export default patientService;
