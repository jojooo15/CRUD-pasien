<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Ganti dengan origin frontend Anda (WAJIB SESUAI)
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS"); // Method yang diizinkan
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); // Header yang diizinkan
header("Access-Control-Allow-Credentials: true"); // Jika menggunakan cookie/otorisasi (opsional, tapi sering dibutuhkan)
include_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { // Penanganan preflight request (PENTING!)
    http_response_code(200); // Respon dengan status 200 OK
    exit; // Hentikan eksekusi script setelah merespon OPTIONS (SANGAT PENTING!)
}

$database = new Database();
$db = $database->getConnection();

try {
    $query = "SELECT id, name, status, diagnosis FROM patients";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $num = $stmt->rowCount();

    if ($num > 0) {
        $patients_arr = array();
        $patients_arr["patients"] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $patient_item = array(
                "id" => $id,
                "name" => $name,
                "status" => $status,
                "diagnosis" => $diagnosis
            );
            array_push($patients_arr["patients"], $patient_item);
        }

        http_response_code(200);
        echo json_encode($patients_arr);
    } else {
        http_response_code(200); // Kunci: Tetap 200 OK
        echo json_encode(array("patients" => array())); // Kunci: Mengembalikan array kosong dalam objek
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Database error: " . $e->getMessage()));
}
?>