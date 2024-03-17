<?php
include "./connection.php";

$query = $conn->prepare('SELECT * FROM news');
$query->execute();
$result = $query->get_result();

$response = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Push each row into the response array
        $response[] = $row;
    }
}
echo json_encode($response);