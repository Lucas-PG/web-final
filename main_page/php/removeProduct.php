<?php 

  $connection = mysqli_connect("localhost:3306", "root", "root", "web_final_project");
  $deleteId = intval($_POST["deleteId"]);

  mysqli_query($connection, "DELETE FROM cart_product WHERE product_id = $deleteId");
  mysqli_query($connection, "DELETE FROM product WHERE id = $deleteId");

?>