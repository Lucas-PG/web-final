<?php
$connection = mysqli_connect("localhost", "root", "root", "web_final_project");
$email = $_POST["email"];
$password = $_POST["password"];

$result = mysqli_query($connection, "SELECT * FROM user WHERE email = '$email' AND password = '$password' AND is_admin = 1;");

if(mysqli_num_rows($result) == 1) {
  echo json_encode("user is an admin");
} else {
  echo json_encode("user is not an admin");
}
?>
