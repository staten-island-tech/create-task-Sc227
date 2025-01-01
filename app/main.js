import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message");
  const recipientInput = document.getElementById("recipient");
  const stampInput = document.getElementById("stampURL");
  const canvas = document.createElement("canvas");
  canvas.id = "postcardCanvas";
  canvas.width = 600;
  canvas.height = 400;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  // Set up default postcard design
  function drawDefaultPostcard() {
    // Background color
    ctx.fillStyle = "#FFD580";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Divider line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Placeholder stamp area
    ctx.strokeRect(canvas.width - 120, 20, 100, 60);
    ctx.fillText("Stamp", canvas.width - 70, 55);
  }

  drawDefaultPostcard();

  // Redraw the canvas with the user input
  function redrawCanvas() {
    drawDefaultPostcard();

    // Add user message
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    const lines = messageInput.value.split("\n");
    lines.forEach((line, index) => {
      ctx.fillText(line, 20, 40 + index * 20);
    });

    // Add recipient details
    ctx.textAlign = "left";
    const recipientLines = recipientInput.value.split("\n");
    recipientLines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2 + 20, 40 + index * 20);
    });

    // Add custom stamp
    const stampURL = stampInput.value;
    if (stampURL) {
      const stampImage = new Image();
      stampImage.crossOrigin = "anonymous";
      stampImage.src = stampURL;
      stampImage.onload = () => {
        ctx.drawImage(stampImage, canvas.width - 120, 20, 100, 60);
      };
    }
  }

  // Handle form submission
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    redrawCanvas();
  });
});
