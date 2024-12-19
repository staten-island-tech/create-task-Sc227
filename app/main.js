import "./style.css";

const DOMSelectors = {
  container: document.querySelector("container"),
  name: document.getElementById("country"),
  image: document.getElementById("pic"),
};
const apiEntry = "";

async function fetchData() {
  try {
    const response = await fetch(apiEntry);
    console.log(response.status);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
      createCard(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    alert("error");
  }
}

fetchData();

DOMSelectors.form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = DOMSelectors.name.value;
  const imageURL = DOMSelectors.image.value;

  const card = createObject(name, imageURL, cost);
  injectCard(card);
  clearFields();
});

function createObject(name, imageURL, cost) {
  return {
    name: name,
    imageURL: imageURL,
  };
}

function createCard(card) {
  const cardHTML = `<div class="card">
      <h2>${card.name}</h2>
      <img class="picture" src="${card.imageURL}">
    </div>`;

  DOMSelectors.container.insertAdjacentHTML("beforeend", cardHTML);
}
