import React, { useState, useEffect } from "react";
import patientService from "../services/patientService";

const PatientEditForm = ({ patient, onSave, onCancel }) => {
	const [editedPatient, setEditedPatient] = useState({ ...patient });
	const [error, setError] = useState(null);

	useEffect(() => {
		setEditedPatient({ ...patient });
	}, [patient]);

	const handleChange = (e) => {
		setEditedPatient({ ...editedPatient, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			const response = await patientService.updatePatient(editedPatient);
			if (response && response.message === "Patient was updated.") {
				onSave();
				onCancel();
			} else {
				setError(
					"Gagal memperbarui pasien: " +
						(response?.message || "Terjadi kesalahan")
				);
			}
		} catch (error) {
			setError(
				"Terjadi kesalahan jaringan atau server: " + (error?.message || "")
			);
		}
	};

	return (
		<div className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
			<div className="bg-white rounded-lg p-8 max-w-md shadow-2xl transform transition-all duration-300 scale-100">
				<h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
					📝 Edit Data Pasien
				</h2>
				{error && (
					<div className="text-red-500 bg-red-50 border border-red-300 p-2 rounded mb-4">
						❌ {error}
					</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
					<input type="hidden" name="id" value={editedPatient.id} />
					<input
						type="text"
						name="name"
						placeholder="Nama Pasien"
						value={editedPatient.name}
						onChange={handleChange}
						className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>
					<input
						type="text"
						name="status"
						placeholder="Status Pasien"
						value={editedPatient.status}
						onChange={handleChange}
						className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>
					<input
						type="text"
						name="diagnosis"
						placeholder="Diagnosa Pasien"
						value={editedPatient.diagnosis}
						onChange={handleChange}
						className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>
					<div className="flex justify-end space-x-4">
						<button
							type="button"
							onClick={onCancel}
							className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
						>
							Batal
						</button>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
						>
							Simpan
						</button>
					</div>
				</form>
			</div>
		</div>
	);	
};

export default PatientEditForm;
