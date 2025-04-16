import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message");
  const recipientInput = document.getElementById("recipient");
  const stampInput = document.getElementById("stamp");
  const canvas = document.getElementById("canvas");
  canvas.width = 600;
  canvas.height = 400;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

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
      stampImages.push(data.src.medium);
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
    const leftSidePadding = 40;
    const rightSidePadding = 40;
    const messageMaxWidth = dividerPosition - leftSidePadding;
    const recipientMaxWidth = canvas.width - dividerPosition - rightSidePadding;
    console.log({ messageMaxWidth, recipientMaxWidth, dividerPosition });

    fitTextToCanvas(
      ctx,
      messageInput.value,
      leftSidePadding,
      40,
      messageMaxWidth,
      20
    );

    fitTextToCanvas(
      ctx,
      recipientInput.value,
      dividerPosition + rightSidePadding,
      40,
      recipientMaxWidth,
      20
    );

    for (let i = 0; i < stampImages.length; i++) {
      const stampImage = new Image();
      stampImage.src = stampImages[i];
      stampImage.onload = () => {
        ctx.drawImage(stampImage, 50 * i + 20, 20, 100, 60);
      };
    }
  }

  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    await redrawCanvas();
  });
});
