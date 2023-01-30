/**
 * - The texture atlas data.
 * @version DragonBones 3.0
 * @language en_US
 */
import { BaseObject } from "../core/BaseObject";
import { Rectangle } from "../geom/Rectangle";
/**
 * - 贴图集数据。
 * @version DragonBones 3.0
 * @language zh_CN
 */
export class TextureAtlasData extends BaseObject {
    constructor() {
        super(...arguments);
        /**
         * @private
         */
        this.textures = {};
    }
    _onClear() {
        for (let k in this.textures) {
            this.textures[k].returnToPool();
            delete this.textures[k];
        }
        this.autoSearch = false;
        this.width = 0;
        this.height = 0;
        this.scale = 1.0;
        // this.textures.clear();
        this.name = "";
        this.imagePath = "";
    }
    /**
     * @private
     */
    copyFrom(value) {
        this.autoSearch = value.autoSearch;
        this.scale = value.scale;
        this.width = value.width;
        this.height = value.height;
        this.name = value.name;
        this.imagePath = value.imagePath;
        for (let k in this.textures) {
            this.textures[k].returnToPool();
            delete this.textures[k];
        }
        // this.textures.clear();
        for (let k in value.textures) {
            const texture = this.createTexture();
            texture.copyFrom(value.textures[k]);
            this.textures[k] = texture;
        }
    }
    /**
     * @internal
     */
    addTexture(value) {
        if (value.name in this.textures) {
            console.warn("Same texture: " + value.name);
            return;
        }
        value.parent = this;
        this.textures[value.name] = value;
    }
    /**
     * @private
     */
    getTexture(textureName) {
        return textureName in this.textures ? this.textures[textureName] : null;
    }
}
/**
 * @private
 */
export class TextureData extends BaseObject {
    constructor() {
        super(...arguments);
        this.region = new Rectangle();
        this.frame = null; // Initial value.
    }
    static createRectangle() {
        return new Rectangle();
    }
    _onClear() {
        this.rotated = false;
        this.name = "";
        this.region.clear();
        this.parent = null; //
        this.frame = null;
    }
    copyFrom(value) {
        this.rotated = value.rotated;
        this.name = value.name;
        this.region.copyFrom(value.region);
        this.parent = value.parent;
        if (this.frame === null && value.frame !== null) {
            this.frame = TextureData.createRectangle();
        }
        else if (this.frame !== null && value.frame === null) {
            this.frame = null;
        }
        if (this.frame !== null && value.frame !== null) {
            this.frame.copyFrom(value.frame);
        }
    }
}
