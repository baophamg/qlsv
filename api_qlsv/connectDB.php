<?php 
// Create connection
$conn = new mysqli(SEVERNAME, USERNAME, PASSWORD, DBNAME);  //tạo đường ống kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
mysqli_set_charset($conn,"utf8");  
 ?>