import * as PIXI from "pixi.js";
import { BaseObject } from "../core/core/BaseObject";
import { TextureAtlasData, TextureData } from "../core/model/TextureAtlasData";
export class PixiTextureAtlasData extends TextureAtlasData {
    constructor() {
        super(...arguments);
        this._renderTexture = null; // Initial value.
    }
    static toString() {
        return "[class dragonBones.PixiTextureAtlasData]";
    }
    _onClear() {
        super._onClear();
        if (this._renderTexture !== null) {
            // this._renderTexture.dispose();
        }
        this._renderTexture = null;
    }
    /**
     * @inheritDoc
     */
    createTexture() {
        return BaseObject.borrowObject(PixiTextureData);
    }
    /**
     * - The PixiJS texture.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - PixiJS 贴图。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    get renderTexture() {
        return this._renderTexture;
    }
    set renderTexture(value) {
        if (this._renderTexture === value) {
            return;
        }
        this._renderTexture = value;
        if (this._renderTexture !== null) {
            for (let k in this.textures) {
                const textureData = this.textures[k];
                textureData.renderTexture = new PIXI.Texture(this._renderTexture, new PIXI.Rectangle(textureData.region.x, textureData.region.y, textureData.region.width, textureData.region.height), new PIXI.Rectangle(textureData.region.x, textureData.region.y, textureData.region.width, textureData.region.height), new PIXI.Rectangle(0, 0, textureData.region.width, textureData.region.height), textureData.rotated // .d.ts bug
                );
            }
        }
        else {
            for (let k in this.textures) {
                const textureData = this.textures[k];
                textureData.renderTexture = null;
            }
        }
    }
}
/**
 * @internal
 */
export class PixiTextureData extends TextureData {
    constructor() {
        super(...arguments);
        this.renderTexture = null; // Initial value.
    }
    static toString() {
        return "[class dragonBones.PixiTextureData]";
    }
    _onClear() {
        super._onClear();
        if (this.renderTexture !== null) {
            this.renderTexture.destroy(false);
        }
        this.renderTexture = null;
    }
}
