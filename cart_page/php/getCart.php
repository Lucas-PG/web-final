<?php
  $connection = mysqli_connect("localhost:3306", "root", "root", "web_final_project");
  $result = mysqli_query($connection, "SELECT p.name, p.price, p.img, cp.quantity, cp.cart_id, cp.product_id FROM cart_product cp INNER JOIN product p ON cp.product_id = p.id WHERE cp.cart_id = 1 AND cp.quantity > 0;");


  $data = array();
  while($register = mysqli_fetch_assoc($result)){
  array_push($data, $register);
  }

  $json = json_encode($data);
  echo $json;


?>