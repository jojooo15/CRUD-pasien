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

// Pastikan parameter 'id' ada dan valid
$id = isset($_GET['id']) ? intval($_GET['id']) : die(json_encode(array("message" => "ID is required.")));

try {
    $query = "DELETE FROM patients WHERE id = :id"; // Gunakan placeholder :id
    $stmt = $db->prepare($query);

    $stmt->bindParam(":id", $id); // Bind parameter dengan benar

    if ($stmt->execute()) {
        http_response_code(200); // 200 OK untuk sukses delete
        echo json_encode(array("message" => "Patient was deleted."));
    } else {
        http_response_code(500);
        $errorInfo = $stmt->errorInfo();
        echo json_encode(array("message" => "Unable to delete patient.", "error" => $errorInfo));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Database error: " . $e->getMessage()));
}
?>