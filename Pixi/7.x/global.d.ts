import * as pixi from "pixi.js";

declare global {
    namespace PIXI {
        const Sprite: typeof pixi.Sprite;
        type Sprite = InstanceType<typeof pixi.Sprite>;

        const Graphics: typeof pixi.Graphics;
        type Graphics = InstanceType<typeof pixi.Graphics>;

        const BaseTexture: typeof pixi.BaseTexture;
        type BaseTexture = InstanceType<typeof pixi.BaseTexture>;

        const DisplayObject: typeof pixi.DisplayObject;
        type DisplayObject = InstanceType<typeof pixi.DisplayObject>;

        const Texture: typeof pixi.Texture;
        type Texture = InstanceType<typeof pixi.Texture>;

        const SimpleMesh: typeof pixi.SimpleMesh;
        type SimpleMesh = InstanceType<typeof pixi.SimpleMesh>;

        const Rectangle: typeof pixi.Rectangle;
        const Ticker: typeof pixi.Ticker;
        const BLEND_MODES: typeof pixi.BLEND_MODES;
        const settings: typeof pixi.settings;
        const VERSION: typeof pixi.VERSION;
    }
}
