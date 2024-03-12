export class CanvasZoom {
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  cellSize: number;

  #scale = 1;
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
    console.log(this.#scale);
  }

  // The zooming works by changing the scale of the canvas and redrawing the grid.
  zoomIn() {
    this.#scale += 0.1;
    this.#draw();
  }

  zoomOut() {
    this.#scale -= 0.1;
    this.#draw();
  }

  // All the code below is for drawing the grid.
  toVirtualX(xReal: number): number {
    return (xReal + this.#offsetX) * this.#scale;
  }
  toVirtualY(yReal: number): number {
    return (yReal + this.#offsetY) * this.#scale;
  }
  toRealX(xVirtual: number): number {
    return xVirtual / this.#scale - this.#offsetX;
  }
  toRealY(yVirtual: number): number {
    return yVirtual / this.#scale - this.#offsetY;
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

    for (let x = 0; x <= width; x += this.cellSize * this.#scale) {
      const source = x;
      this.canvasContext.moveTo(source, 0);
      this.canvasContext.lineTo(source, height);

      this.canvasContext.fillText(
        `${this.toVirtualX(source).toFixed(0)}`,
        source,
        10
      );
    }

    for (
      let y = (this.#offsetY % this.cellSize) * this.#scale;
      y <= height;
      y += this.cellSize * this.#scale
    ) {
      const source = y;
      this.canvasContext.moveTo(0, source);
      this.canvasContext.lineTo(width, source);

      this.canvasContext.fillText(
        `${this.toVirtualY(source).toFixed(0)}`,
        0,
        source
      );
    }
    this.canvasContext.stroke();
  }
}
