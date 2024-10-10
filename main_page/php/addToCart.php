<?php
  $product_id = intval($_POST["product_id"]);
  $cart_id = intval($_POST["cart_id"]);
  $connection = mysqli_connect("localhost:3306", "root", "root", "web_final_project");

  $result = mysqli_query($connection, "SELECT * FROM cart_product WHERE product_id = $product_id AND cart_id = $cart_id");

  if(mysqli_num_rows($result) > 0){
    mysqli_query($connection, "UPDATE cart_product SET quantity = quantity + 1 WHERE product_id = $product_id AND cart_id = $cart_id");
  } else {
    mysqli_query($connection, "INSERT INTO cart_product (cart_id, product_id, quantity) VALUES ($cart_id , $product_id, 1)");
  }
?>
