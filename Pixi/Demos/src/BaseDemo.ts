import * as PIXI from "pixi.js";
import { Application, Assets, Texture } from "pixi.js";

export abstract class BaseDemo {
    protected app: Application;
    protected static BACKGROUND_URL: string = "resource/background.png";
    protected readonly _background: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.EMPTY);
    protected readonly _resources: string[] = [];
    protected _pixiResources: Record<string, any>;

    public constructor() {
        this.app = new Application();
        this.app.render.arguments.backgroundColor = 0x666666;
        this._resources.push(BaseDemo.BACKGROUND_URL);
        document.body.appendChild(<any>this.app.view);
        this.start();
    }

    private async start() {
        await this._loadResources();
    }

    protected abstract _onStart(): void;

    protected async _loadResources(): Promise<void> {
        for (let path of this._resources) {
            const resource = await Assets.load(path);
            this._pixiResources.set(path, resource);
        }
        const backgroundTexture: Texture = this._pixiResources.get(BaseDemo.BACKGROUND_URL);
        this._background.texture = backgroundTexture;
        this.app.stage.addChild(this._background);
        this._onStart();
    }
}