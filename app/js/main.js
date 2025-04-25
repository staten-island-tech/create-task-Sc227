import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const stampInput = document.getElementById("stamp");
  const stampBox = document.getElementById("stamp-box");
  const viewStampsButton = document.getElementById("view-stamps");
  const placeStickersButton = document.getElementById("place-stickers");
  const stampGallery = document.getElementById("stamp-gallery");
  const postcard = document.getElementById("postcard");

  const stampImages = [];

  async function fetchStampImage(id) {
    try {
      const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
        headers: {
          Authorization:
            "yKId6ERkQefpAsFKWM1P73jEyYOATOQna8mXRTqtUFDZU1fP4hFeOaHV",
        },
      });
      const data = await response.json();
      const imageUrl = data.src.medium;
      if (!stampImages.includes(imageUrl)) {
        stampImages.push(imageUrl);
        updateStampBox(imageUrl);
      }
      console.log(stampImages);
    } catch (error) {
      console.error(error);
      alert("Error fetching stamp image");
    }
  }

  function updateStampBox(imageUrl) {
    stampBox.style.backgroundImage = `url(${imageUrl})`;
  }

  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const stampId = stampInput.value;
    if (stampId) {
      await fetchStampImage(stampId);
    }
  });

  const selectedStickers = [];
  const stickers = ["heart", "star", "flower"];

  document.querySelectorAll(".sticker").forEach((sticker) => {
    sticker.addEventListener("click", () => {
      const type = sticker.dataset.type;
      sticker.classList.toggle("selected");

      if (selectedStickers.includes(type)) {
        const index = selectedStickers.indexOf(type);
        selectedStickers.splice(index, 1);
      } else {
        selectedStickers.push(type);
      }

      console.log(selectedStickers);
    });
  });

  function placeStickers(selectedStickers) {
    postcard.querySelectorAll(".deco").forEach((el) => el.remove());

    const placedStickers = [];

    for (let i = 0; i < selectedStickers.length; i++) {
      const deco = selectedStickers[i];

      if (stickers.includes(deco)) {
        placedStickers.push({
          type: deco,
          x: Math.random() * 200,
          y: Math.random() * 150,
        });
      }
    }

    let index = 0;
    function placeNext() {
      if (index >= placedStickers.length) return;

      const deco = placedStickers[index];
      const el = document.createElement("div");
      el.className = "deco " + deco.type;
      el.style.left = deco.x + "px";
      el.style.top = deco.y + "px";
      postcard.appendChild(el);

      index++;
      setTimeout(placeNext, 300);
    }

    placeNext();
  }

  placeStickersButton.addEventListener("click", () => {
    placeStickers(selectedStickers);
  });

  viewStampsButton.addEventListener("click", () => {
    stampGallery.innerHTML = "";

    stampImages.forEach((url) => {
      const img = document.createElement("img");
      img.src = url;
      img.style.width = "100px";
      stampGallery.appendChild(img);
    });
  });
});
