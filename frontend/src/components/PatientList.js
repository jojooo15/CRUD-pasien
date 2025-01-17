import React, { useState } from "react";
import patientService from "../services/patientService";
import PatientEditForm from "./PatientEditForm";

const PatientList = ({ patients, onPatientDeleted, onPatientUpdated }) => {
	const [editingPatient, setEditingPatient] = useState(null);

	const handleDelete = async (id) => {
		if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
			try {
				await patientService.deletePatient(id);
				onPatientDeleted();
			} catch (err) {
				alert(err.message || "Gagal menghapus data pasien.");
			}
		}
	};

	const handleEdit = (patient) => {
		setEditingPatient(patient);
	};

	const handleCancelEdit = () => {
		setEditingPatient(null);
	};

	const handleSaveEdit = async () => {
		onPatientUpdated();
		setEditingPatient(null);
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
				Daftar Pasien
			</h2>
			{patients.length === 0 ? (
				<p className="text-center text-gray-500">Tidak ada data pasien.</p>
			) : (
				<table className="w-full border-collapse overflow-hidden rounded-lg">
					<thead>
						<tr className="bg-blue-100 text-blue-600">
							<th className="border border-blue-200 p-3 text-center">Nama</th>
							<th className="border border-blue-200 p-3 text-center">Status</th>
							<th className="border border-blue-200 p-3 text-center">Diagnosa</th>
							<th className="border border-blue-200 p-3 text-center">Aksi</th>
						</tr>
					</thead>
					<tbody>
						{patients.map((patient) => (
							<tr
								key={patient.id}
								className="hover:bg-blue-50 transition-colors"
							>
								<td className="border border-blue-200 p-3 text-center">
									{patient.name}
								</td>
								<td className="border border-blue-200 p-3 text-center">
									{patient.status}
								</td>
								<td className="border border-blue-200 p-3 text-center">
									{patient.diagnosis}
								</td>
								<td className="border border-blue-200 p-3 text-center">
									<button
										onClick={() => handleEdit(patient)}
										className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-lg mr-2 shadow-sm transition-transform transform hover:scale-105"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(patient.id)}
										className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg shadow-sm transition-transform transform hover:scale-105"
									>
										Hapus
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{editingPatient && (
				<PatientEditForm
					patient={editingPatient}
					onSave={handleSaveEdit}
					onCancel={handleCancelEdit}
					className="mt-6"
				/>
			)}
		</div>
	);
	
};

export default PatientList;
