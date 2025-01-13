import "../css/style.css";
import { createClient } from "pexels";

const client = createClient(
  "yKId6ERkQefpAsFKWM1P73jEyYOATOQna8mXRTqtUFDZU1fP4hFeOaHV"
);

document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message");
  const recipientInput = document.getElementById("recipient");
  const stampInput = document.getElementById("stamp");
  const canvas = document.createElement("canvas");
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
      const response = await client.photos.show({ id });
      return response.src.medium;
    } catch (error) {
      console.log(error);
      alert("error");
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

    const stampId = stampInput.value;
    if (stampId) {
      const stampImageUrl = await fetchStampImage(stampId);
      if (stampImageUrl) {
        const stampImage = new Image();
        stampImage.src = stampImageUrl;
        stampImage.onload = () => {
          ctx.drawImage(stampImage, canvas.width - 120, 20, 100, 60);
        };
      }
    }
  }

  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    await redrawCanvas();
  });
});
