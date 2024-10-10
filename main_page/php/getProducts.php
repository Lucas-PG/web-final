<?php

  $connection = mysqli_connect("localhost:3306", "root", "root", "web_final_project");
  $result = mysqli_query($connection, "SELECT * FROM product");

  $data = array();

  while($register = mysqli_fetch_assoc($result)){
  array_push($data, $register);
  }

  $json = json_encode($data);
  echo $json;


?>