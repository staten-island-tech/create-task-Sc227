import "./style.css";

import { createClient } from "pexels";

const apiKey = createClient(
  "yKId6ERkQefpAsFKWM1P73jEyYOATOQna8mXRTqtUFDZU1fP4hFeOaHV"
);
const url = "https://api.pexels.com/v1/curated?per_page=1&page=1";

fetch(url, {
  method: "GET",
  headers: {
    Authorization: apiKey,
  },
});
try {
  const response = await fetch(apiEntry);
  console.log(response.status);
  if (response.status != 200) {
    throw new Error(response);
  } else {
    const data = await response.json();
    console.log(data);
    return data;
  }
} catch (error) {
  console.log(error);
  alert("error");
}

document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message");
  const recipientInput = document.getElementById("recipient");
  const stampInput = document.getElementById("stampURL");
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function drawDefaultPostcard() {
    // Background color
    ctx.fillStyle = "#FFD580";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeRect(canvas.width - 120, 20, 100, 60);
    ctx.fillText("Stamp", canvas.width - 70, 55);
  }

  drawDefaultPostcard();

  function redrawCanvas() {
    drawDefaultPostcard();

    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    const lines = messageInput.value.split("\n");
    lines.forEach((line, index) => {
      ctx.fillText(line, 20, 40 + index * 20);
    });

    ctx.textAlign = "left";
    const recipientLines = recipientInput.value.split("\n");
    recipientLines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2 + 20, 40 + index * 20);
    });

    const stampURL = `https://api.pexels.com/v1/photos/:${stampInput.value}`;
    if (stampURL) {
      const stampImage = new Image();
      stampImage.src = stampURL;
      stampImage.onload = () => {
        ctx.drawImage(stampImage, canvas.width - 120, 20, 100, 60);
      };
    }
  }

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    redrawCanvas();
  });
});

//pexels api
