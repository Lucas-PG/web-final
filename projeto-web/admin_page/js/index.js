async function checkAdmin() {
  let form = document.getElementById("form");
  let data = new FormData(form);
  let promise = await fetch("php/checkAdmin.php", {
    method: "POST",
    body: data,
  });

  let result = await promise.json();
  alert(result);
}
