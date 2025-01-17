import React, { useState, useEffect } from "react";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import patientService from "./services/patientService";

function App() {
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchPatients = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await patientService.getPatients();
			setPatients(data);
		} catch (err) {
			setError(err.message || "Gagal mengambil data pasien.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPatients();
	}, []);

	return (
		<div className="container mx-auto p-4 bg-gray-50 min-h-screen">
			<div className="shadow-md p-6 rounded-lg bg-white">
				<h1 className="text-3xl font-extrabold text-blue-500 mb-6 text-center">
					Aplikasi Input Data Pasien
				</h1>
				<PatientForm onPatientAdded={fetchPatients} />
			</div>
	
			<div className="mt-8 shadow-md p-6 rounded-lg bg-white">
				{loading && (
					<div className="text-blue-500 text-center">
						⏳ Memuat data...
					</div>
				)}
				{error && <div className="text-red-500 text-center">{error}</div>}
				{!loading && !error && (
					<PatientList
						patients={patients}
						onPatientDeleted={fetchPatients}
						onPatientUpdated={fetchPatients}
					/>
				)}
			</div>
		</div>
	);
	
	
}

export default App;
