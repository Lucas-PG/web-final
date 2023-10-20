<?php
$updated_quantities_json = $_POST['updated_quantities'];
$updated_quantities = json_decode($updated_quantities_json, true);

$connection = mysqli_connect("localhost", "root", "root", "web_final_project");

foreach ($updated_quantities as $product_id => $quantity) {
    $cart_id = 1; 
    mysqli_query($connection, "UPDATE cart_product SET quantity = $quantity WHERE cart_id = $cart_id AND product_id = $product_id");
}

mysqli_query($connection, "DELETE FROM cart_product WHERE cart_id = $cart_id AND quantity <= 0");

?>
