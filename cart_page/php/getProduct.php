<?php

    $connection = mysqli_connect("localhost:3306", "root", "root", "web_final_product");
    $result = mysqli_query($connection, "SELECT * FROM products");

    $data = array();

    while($register = mysqli_fetch_assoc($result)){
    array_push($data, $register);
  }

  $json = json_encode($data);
  echo $json;

?>