import "../style.css";

// Import custom web components
import "../classes/Header.ts";

import { CanvasPan } from "../classes/CanvasPan.ts";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const canvasPan = new CanvasPan(canvas);

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("controls");

const resetButton = document.createElement("button");
resetButton.textContent = "Reset Position";
resetButton.onclick = () => {
  canvasPan.resetPosition();
};

buttonContainer.appendChild(resetButton);
document.body.appendChild(buttonContainer);
