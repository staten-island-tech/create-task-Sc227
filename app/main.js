import "style.css";

const DOMSelectors = {
  container: document.querySelector("container"),
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

function createCard(card) {
  const cardHTML = `<div class="card">
      <h2>${card.name}</h2>
      <img class="picture" src="${card.imageURL}">
      <h2>${card.cost}</h2>
      <button class="delete-btn">Delete</button>
    </div>`;

  DOMSelectors.container.insertAdjacentHTML("beforeend", cardHTML);
}

fetchData();
