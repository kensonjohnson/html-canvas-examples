import "../style.css";

// Import custom web components
import "../classes/Header.ts";

import { CanvasZoom } from "../classes/CanvasZoom.ts";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const canvasZoom = new CanvasZoom(canvas);

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("controls");

const zoomInButton = document.createElement("button");
zoomInButton.textContent = "Zoom In";
zoomInButton.onclick = () => {
  canvasZoom.zoomIn();
};

const zoomOutButton = document.createElement("button");
zoomOutButton.textContent = "Zoom Out";
zoomOutButton.onclick = () => {
  canvasZoom.zoomOut();
};

buttonContainer.appendChild(zoomInButton);
buttonContainer.appendChild(zoomOutButton);
document.body.appendChild(buttonContainer);
