import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message");
  const recipientInput = document.getElementById("recipient");
  const stampInput = document.getElementById("stamp");
  const stampBox = document.getElementById("stamp-box");
  const viewStampsButton = document.getElementById("view-stamps");
  const stampGallery = document.getElementById("stamp-gallery");

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
