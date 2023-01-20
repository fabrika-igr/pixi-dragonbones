import { Slot } from "../../../../../DragonBones/src/dragonBones/armature/Slot";
export declare class PixiSlot extends Slot {
    static toString(): string;
    private _textureScale;
    private _renderDisplay;
    protected _onClear(): void;
    protected _initDisplay(value: any, isRetain: boolean): void;
    protected _disposeDisplay(value: any, isRelease: boolean): void;
    protected _onUpdateDisplay(): void;
    protected _addDisplay(): void;
    protected _replaceDisplay(value: any): void;
    protected _removeDisplay(): void;
    protected _updateZOrder(): void;
    /**
     * @internal
     */
    _updateVisible(): void;
    protected _updateBlendMode(): void;
    protected _updateColor(): void;
    protected _updateFrame(): void;
    protected _updateMesh(): void;
    protected _updateTransform(): void;
    protected _updateTransformV3(): void;
    protected _updateTransformV4(): void;
    protected _identityTransform(): void;
}
