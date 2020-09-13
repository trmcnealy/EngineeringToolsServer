import {sealed, IsNullish} from "Utilities";

export interface FrameRateControlOptions {
    background: string;
    barWidth: number;
    color: string;
    font: string;
    graphHeight: number;
    graphWidth: number;
    graphTop: number;
    graphRight: number;
    width: number;
}

@sealed
export class FrameRateControl implements mapboxgl.IControl {
    static dpr: number = (window as any).devicePixelRatio;

    static defaultOptions: FrameRateControlOptions = {
        background: "rgba(0,0,0,0.9)",
        barWidth: 4 * FrameRateControl.dpr,
        color: "#7cf859",
        font: "Monaco, Consolas, Courier, monospace",
        graphHeight: 60 * FrameRateControl.dpr,
        graphWidth: 90 * FrameRateControl.dpr,
        graphTop: 0,
        graphRight: 5 * FrameRateControl.dpr,
        width: 100 * FrameRateControl.dpr
    };

    Frames: number;
    Time: number;
    TotalTime: number;
    TotalFrames: number;
    Options: FrameRateControlOptions;
    Container: HTMLDivElement;
    Canvas: HTMLCanvasElement;
    ReadOutput: HTMLDivElement;
    Map: mapboxgl.Map;

    constructor(options?: FrameRateControlOptions) {
        this.Frames = 0;
        this.TotalTime = 0;
        this.TotalFrames = 0;
        this.Options = {...options, ...FrameRateControl.defaultOptions};

        this.onMoveStart = this.onMoveStart.bind(this);
        this.onMoveEnd = this.onMoveEnd.bind(this);
        this.onRender = this.onRender.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.getFPS = this.getFPS.bind(this);
        this.updateGraph = this.updateGraph.bind(this);
    }

    onAdd(map: mapboxgl.Map): HTMLElement {
        this.Map = map;

        const dpr = (window as any).devicePixelRatio;
        const {width, graphWidth, graphHeight, color, background, font} = this.Options;

        const el = (this.Container = document.createElement("div"));
        el.className = "mapboxgl-ctrl mapboxgl-ctrl-fps";

        el.style.backgroundColor = background;
        el.style.borderRadius = "6px";

        this.ReadOutput = document.createElement("div");
        this.ReadOutput.style.color = color;
        this.ReadOutput.style.fontFamily = font;
        this.ReadOutput.style.padding = "0 5px 5px";
        this.ReadOutput.style.fontSize = "9px";
        this.ReadOutput.style.fontWeight = "bold";
        this.ReadOutput.textContent = "Waiting…";

        this.Canvas = document.createElement("canvas");
        this.Canvas.className = "mapboxgl-ctrl-Canvas";
        this.Canvas.width = width;
        this.Canvas.height = graphHeight;
        this.Canvas.style.cssText = `width: ${width / dpr}px; height: ${graphHeight / dpr}px;`;

        el.appendChild(this.ReadOutput);
        el.appendChild(this.Canvas);

        this.Map.on("movestart", this.onMoveStart);
        this.Map.on("moveend", this.onMoveEnd);
        return this.Container;
    }

    onMoveStart(): void {
        this.Frames = 0;
        this.Time = performance.now();
        if (this.Map !== null) {
            this.Map.on("render", this.onRender);
        }
    }

    onMoveEnd(): void {
        const now = performance.now();
        this.updateGraph(this.getFPS(now));
        this.Frames = 0;
        this.Time = NaN;
        if (this.Map !== null) {
            this.Map.off("render", this.onRender);
        }
    }

    onRender(): void {
        this.Frames++;
        const now = performance.now();
        if (now >= this.Time + 1e3) {
            this.updateGraph(this.getFPS(now));
            this.Frames = 0;
            this.Time = now;
        }
    }

    getFPS(now: number): number {
        (this.TotalTime += now - this.Time), (this.TotalFrames += this.Frames);
        return Math.round((1e3 * this.Frames) / (now - this.Time)) || 0;
    }

    updateGraph(fpsNow: number): void {
        const {barWidth, graphRight, graphTop, graphWidth, graphHeight, background, color} = this.Options;

        const fps = Math.round((1e3 * this.TotalFrames) / this.TotalTime) || 0;
        const rect = new DOMRect(graphRight, graphTop, graphHeight, barWidth);

        const context: CanvasRenderingContext2D | null = this.Canvas.getContext("2d");

        console.log(context);

        if (!IsNullish(context)) {
            context.fillStyle = background;

            context.globalAlpha = 1;
            context.fillRect(0, 0, graphWidth, graphTop);
            context.fillStyle = color;

            context.drawImage(this.Canvas, graphRight + barWidth, graphTop, graphWidth - barWidth, graphHeight, graphRight, graphTop, graphWidth - barWidth, graphHeight);
            context.fillRect(graphRight + graphWidth - barWidth, graphTop, barWidth, graphHeight);
            context.fillStyle = background;
            context.globalAlpha = 0.75;
            context.fillRect(graphRight + graphWidth - barWidth, graphTop, barWidth, (1 - fpsNow / 100) * graphHeight);
        }

        this.ReadOutput.textContent = `${fpsNow} FPS (${fps} Avg)`;
    }

    onRemove(map: mapboxgl.Map): any {
        if (this.Map !== null) {
            this.Map.off("render", this.onRender);
            this.Map.off("movestart", this.onMoveStart);
            this.Map.off("moveend", this.onMoveEnd);
        }
        if (this.Container.parentNode !== null) {
            (this.Container.parentNode as any).removeChild(this.Container);
        }
        this.Map = null;

        return this;
    }
}
