import * as PIXI from "pixi.js";
import { TextureAtlasData, TextureData } from "../../../../../DragonBones/src/dragonBones/model/TextureAtlasData";
export declare class PixiTextureAtlasData extends TextureAtlasData {
    static toString(): string;
    private _renderTexture;
    protected _onClear(): void;
    /**
     * @inheritDoc
     */
    createTexture(): TextureData;
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
    get renderTexture(): PIXI.BaseTexture | null;
    set renderTexture(value: PIXI.BaseTexture | null);
}
/**
 * @internal
 */
export declare class PixiTextureData extends TextureData {
    static toString(): string;
    renderTexture: PIXI.Texture | null;
    protected _onClear(): void;
}
