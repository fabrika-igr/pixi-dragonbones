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
export declare abstract class TextureAtlasData extends BaseObject {
    /**
     * @private
     */
    autoSearch: boolean;
    /**
     * @private
     */
    width: number;
    /**
     * @private
     */
    height: number;
    /**
     * @private
     */
    scale: number;
    /**
     * - The texture atlas name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 贴图集名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    name: string;
    /**
     * - The image path of the texture atlas.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 贴图集图片路径。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    imagePath: string;
    /**
     * @private
     */
    readonly textures: Record<string, TextureData>;
    protected _onClear(): void;
    /**
     * @private
     */
    copyFrom(value: TextureAtlasData): void;
    /**
     * @internal
     */
    abstract createTexture(): TextureData;
    /**
     * @internal
     */
    addTexture(value: TextureData): void;
    /**
     * @private
     */
    getTexture(textureName: string): TextureData | null;
}
/**
 * @private
 */
export declare abstract class TextureData extends BaseObject {
    static createRectangle(): Rectangle;
    rotated: boolean;
    name: string;
    readonly region: Rectangle;
    parent: TextureAtlasData;
    frame: Rectangle | null;
    protected _onClear(): void;
    copyFrom(value: TextureData): void;
}
