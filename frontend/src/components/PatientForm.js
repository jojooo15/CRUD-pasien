import React, { useState } from "react";
import patientService from "../services/patientService";

const PatientForm = ({ onPatientAdded }) => {
	const [patient, setPatient] = useState({
		name: "",
		status: "",
		diagnosis: "",
	});
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const handleChange = (e) => {
		setPatient({ ...patient, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);
		try {
			const response = await patientService.createPatient(patient);
			if (response && response.message === "Patient was created.") {
				setSuccessMessage("Data Pasien Berhasil Ditambahkan");
				setPatient({ name: "", status: "", diagnosis: "" });
				onPatientAdded();
			} else {
				setError(
					"Data Pasien Gagal Ditambahkan: " +
						(response ? response.message : "Respon tidak valid")
				);
			}
		} catch (error) {
			setError("Terjadi kesalahan jaringan atau server.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 bg-white p-6 rounded-lg shadow-lg text-center"
		>
			{error && (
				<div className="inline-block text-red-500 bg-red-50 border border-red-300 px-4 py-2 rounded text-sm">
					❌ {error}
				</div>
			)}
			{successMessage && (
				<div className="inline-block text-green-500 bg-green-50 border border-green-300 px-4 py-2 rounded text-sm">
					✅ {successMessage}
				</div>
			)}
			<div className="flex flex-col items-center space-y-4">
				<input
					type="text"
					name="name"
					placeholder="Nama Pasien"
					value={patient.name}
					onChange={handleChange}
					className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center w-full"
					required
				/>
				<input
					type="text"
					name="status"
					placeholder="Status Pasien"
					value={patient.status}
					onChange={handleChange}
					className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center w-full"
					required
				/>
				<textarea
					name="diagnosis"
					placeholder="Diagnosa Pasien"
					value={patient.diagnosis}
					onChange={handleChange}
					className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center w-full h-32 resize-none"
					required
				></textarea>
			</div>
			<button
				type="submit"
				className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300"
			>
				💾 Simpan
			</button>
		</form>
	);	
};

export default PatientForm;
