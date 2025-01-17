<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Ganti dengan origin frontend Anda (WAJIB SESUAI)
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS"); // Method yang diizinkan
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); // Header yang diizinkan
header("Access-Control-Allow-Credentials: true"); // Jika menggunakan cookie/otorisasi (opsional, tapi sering dibutuhkan)

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { // Penanganan preflight request (PENTING!)
    http_response_code(200); // Respon dengan status 200 OK
    exit; // Hentikan eksekusi script setelah merespon OPTIONS (SANGAT PENTING!)
}

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->status) && !empty($data->diagnosis)) {
    try {
        $query = "INSERT INTO patients (name, status, diagnosis) VALUES (:name, :status, :diagnosis)";
        $stmt = $db->prepare($query);

        $name = htmlspecialchars(strip_tags($data->name));
        $status = htmlspecialchars(strip_tags($data->status));
        $diagnosis = htmlspecialchars(strip_tags($data->diagnosis));

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":status", $status);
        $stmt->bindParam(":diagnosis", $diagnosis);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array("message" => "Patient was created.")); // Pastikan ada "message"
        } else {
            http_response_code(500);
            $errorInfo = $stmt->errorInfo();
            echo json_encode(array("message" => "Unable to create patient.", "error" => $errorInfo)); // Sertakan info error
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create patient. Data is incomplete."));
}
?>