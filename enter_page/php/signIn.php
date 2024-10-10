<?php

$connection = mysqli_connect("localhost", "root", "root", "web_final_project");
$email = $_POST["email"];
$password = $_POST["password"];

$result = mysqli_query($connection, "SELECT * FROM user WHERE email = '$email' AND password = '$password'");

if(mysqli_num_rows($result) == 1) {
  echo json_encode("valid account");
} else {
  echo json_encode("email and/or password incorrect");
}

?>
