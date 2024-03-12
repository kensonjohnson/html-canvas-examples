export class CanvasPan {
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  cellSize: number;

  #offsetX = 0;
  #offsetY = 0;

  constructor(canvas: HTMLCanvasElement, cellSize = 40) {
    if (canvas && canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas;
    } else {
      throw new Error("CanvasZoom: canvas is not an HTMLCanvasElement");
    }
    const context = this.canvas.getContext("2d");
    if (context) {
      this.canvasContext = context;
    } else {
      throw new Error("CanvasZoom: failed to get canvas 2d context");
    }
    this.cellSize = cellSize;
    this.#draw();
    this.#setupListeners();
  }

  #setupListeners() {
    this.canvas.addEventListener("mousedown", (event) => {
      // Grab the starting position of the mouse
      let startX = event.clientX;
      let startY = event.clientY;

      // When the mouse moves, we calculate the difference between the starting position and
      // the current position and add that to the offset.
      const mouseMove = (event: MouseEvent) => {
        const x = event.clientX;
        const y = event.clientY;

        this.#offsetX += x - startX;
        this.#offsetY += y - startY;

        this.#draw();

        startX = x;
        startY = y;
      };

      // When the mouse is released, we remove the event listeners.
      const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
      };

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    });
  }

  resetPosition() {
    this.#offsetX = 0;
    this.#offsetY = 0;
    this.#draw();
  }

  // All the code below is for drawing the grid.
  toVirtualX(xReal: number): number {
    return xReal - this.#offsetX;
  }
  toVirtualY(yReal: number): number {
    return yReal - this.#offsetY;
  }

  #draw() {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.#drawGrid();
  }

  #drawGrid() {
    if (!this.canvas || !this.canvasContext) return;
    this.canvasContext.strokeStyle = "black";
    this.canvasContext.lineWidth = 1;
    this.canvasContext.font = "12px Arial";
    this.canvasContext.beginPath();

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    for (
      let x = this.#offsetX % this.cellSize;
      x <= width;
      x += this.cellSize
    ) {
      // Move the pen to the current x position at the top of the canvas
      this.canvasContext.moveTo(x, 0);
      // Draw a line from the current x position at the top of the canvas to the bottom
      this.canvasContext.lineTo(x, height);
      // Draw the text at the current x position
      this.canvasContext.fillText(
        `${this.toVirtualX(x).toFixed(0)}`,
        x + 2,
        12
      );
    }

    for (
      let y = this.#offsetY % this.cellSize;
      y <= height;
      y += this.cellSize
    ) {
      this.canvasContext.moveTo(0, y);
      this.canvasContext.lineTo(width, y);

      this.canvasContext.fillText(`${this.toVirtualY(y).toFixed(0)}`, 2, y - 2);
    }
    this.canvasContext.stroke();
  }
}
