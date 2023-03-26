import { products } from "./controllers/products.js";

const botones = document.querySelectorAll("#boton");

botones.forEach((boton) =>
  boton.addEventListener("click", async () => {
    const id = boton.className.substring(3); //Get Id Product.
    const product = products.filter((p) => p.id == parseInt(id)); //Get Product with ID.
    const price = product[0].price; //Get Price.
    const name = product[0].name; //Get Name.
    console.log(price);

    /* const response = await fetch("/api/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    const data = await response.json();

    console.log(data);
    if (data) {
      window.location.href = data.data.links[1].href;
    } */
  })
);
