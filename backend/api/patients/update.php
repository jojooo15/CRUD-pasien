<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, POST, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"), true);
error_log(print_r($data, true)); // Log the received data

if (isset($data['id']) && isset($data['name']) && isset($data['status']) && isset($data['diagnosis'])) {
    try {
        $query = "UPDATE patients SET name = :name, status = :status, diagnosis = :diagnosis WHERE id = :id";
        $stmt = $db->prepare($query);

        $id = intval($data['id']);
        $name = htmlspecialchars(strip_tags($data['name']));
        $status = htmlspecialchars(strip_tags($data['status']));
        $diagnosis = htmlspecialchars(strip_tags($data['diagnosis']));

        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":status", $status);
        $stmt->bindParam(":diagnosis", $diagnosis);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(array("message" => "Patient was updated."));
        } else {
            http_response_code(500);
            $errorInfo = $stmt->errorInfo();
            echo json_encode(array("message" => "Unable to update patient.", "error" => $errorInfo));
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update patient. Data is incomplete."));
}
?>
