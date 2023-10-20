async function checkSignIn() {
  const form = document.getElementById("form");
  const data = new FormData(form);

  let promise = await fetch("php/signIn.php", {
    method: "POST",
    body: data,
  });

  let response = await promise.json();
  alert(response);
}
