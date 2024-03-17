<?php
include "./connection.php";
$title = $_POST['title'];
$description = $_POST['description'];

if (isset($_FILES['news_image']) && $_FILES['news_image']['error'] === UPLOAD_ERR_OK) {

    $target_dir = "assets/";
    $target_file = $target_dir . uniqid() . '_' . basename($_FILES["news_image"]["name"]);

    if (move_uploaded_file($_FILES["news_image"]["tmp_name"], $target_file)) {
        $news_image = $target_file;
    }
}
$query = $conn->prepare('INSERT INTO news (title, description, news_image) VALUES (?, ?, ?)');
$query->bind_param('sss', $title, $description, $news_image);
$query->execute();
if ($query->affected_rows > 0) {
    $response['status'] = 'success';
    $response['message'] = 'News Added Successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Something went wrong';
}
echo json_encode($response);
