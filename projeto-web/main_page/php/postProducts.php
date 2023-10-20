<?php 

  $connection = mysqli_connect("localhost:3306", "root", "root", "web_final_project");
  $name = $_POST["name"];
  $price = $_POST["price"];
  $img = $_POST["img"];

  mysqli_query($connection, "INSERT INTO product (name, price, img) VALUES ('$name', '$price', '$img')");
?>