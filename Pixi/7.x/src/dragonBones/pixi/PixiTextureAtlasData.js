"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixiTextureData = exports.PixiTextureAtlasData = void 0;
const PIXI = require("pixi.js");
const BaseObject_1 = require("../../../../../DragonBones/src/dragonBones/core/BaseObject");
const TextureAtlasData_1 = require("../../../../../DragonBones/src/dragonBones/model/TextureAtlasData");
class PixiTextureAtlasData extends TextureAtlasData_1.TextureAtlasData {
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
        return BaseObject_1.BaseObject.borrowObject(PixiTextureData);
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
exports.PixiTextureAtlasData = PixiTextureAtlasData;
/**
 * @internal
 */
class PixiTextureData extends TextureAtlasData_1.TextureData {
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
exports.PixiTextureData = PixiTextureData;
