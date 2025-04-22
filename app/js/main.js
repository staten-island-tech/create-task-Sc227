import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message");
  const recipientInput = document.getElementById("recipient");
  const stampInput = document.getElementById("stamp");
  const canvas = document.getElementById("canvas");
  const viewStampsButton = document.getElementById("view-stamps");
  const stampGallery = document.getElementById("stamp-gallery");
  canvas.width = 600;
  canvas.height = 400;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const stampImages = [];

  function defaultPostcard() {
    ctx.fillStyle = "#FFD580";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.strokeRect(canvas.width - 120, 20, 100, 60);
  }

  defaultPostcard();

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
      }
      console.log(stampImages);
    } catch (error) {
      console.log(error);
      alert("Error fetching stamp image");
    }
  }

  function fitTextToCanvas(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    const lines = [];

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && line !== "") {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    for (let j = 0; j < lines.length; j++) {
      if (y + j * lineHeight > canvas.height - 20) break;
      ctx.fillText(lines[j], x, y + j * lineHeight);
    }
  }

  async function redrawCanvas() {
    defaultPostcard();
    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";

    const dividerPosition = canvas.width / 2;
    const messageMaxWidth = dividerPosition - 40;
    const recipientMaxWidth = canvas.width - dividerPosition - 40;
    console.log({ messageMaxWidth, recipientMaxWidth, dividerPosition });

    fitTextToCanvas(ctx, messageInput.value, 40, 40, messageMaxWidth, 20);

    fitTextToCanvas(
      ctx,
      recipientInput.value,
      dividerPosition + 40,
      40,
      recipientMaxWidth,
      20
    );

    for (let i = 0; i < stampImages.length; i++) {
      const stampImage = new Image();
      stampImage.src = stampImages[i];
      stampImage.onload = () => {
        ctx.drawImage(stampImage, canvas.width - 120, 20, 100, 60);
      };
    }
  }

  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const stampId = stampInput.value;
    if (stampId) {
      await fetchStampImage(stampId);
    }

    await redrawCanvas();
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
