import { BaseObject } from "../core/BaseObject";
import { ArmatureType, BlendMode, BoneType } from "../core/DragonBones";
import { ColorTransform } from "../geom/ColorTransform";
import { Matrix } from "../geom/Matrix";
import { Rectangle } from "../geom/Rectangle";
import { Transform } from "../geom/Transform";
import { AnimationData } from "./AnimationData";
import { CanvasData } from "./CanvasData";
import { ConstraintData } from "./ConstraintData";
import { GeometryData, MeshDisplayData } from "./DisplayData";
import { DragonBonesData } from "./DragonBonesData";
import { SkinData } from "./SkinData";
import { ActionData, UserData } from "./UserData";
export declare class ArmatureData extends BaseObject {
    static toString(): string;
    /**
     * @private
     */
    type: ArmatureType;
    /**
     * - The animation frame rate.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 动画帧率。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    frameRate: number;
    /**
     * @private
     */
    cacheFrameRate: number;
    /**
     * @private
     */
    scale: number;
    /**
     * - The armature name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 骨架名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    name: string;
    /**
     * @private
     */
    readonly aabb: Rectangle;
    /**
     * - The names of all the animation data.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 所有的动画数据名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    readonly animationNames: Array<string>;
    /**
     * @private
     */
    readonly sortedBones: Array<BoneData>;
    /**
     * @private
     */
    readonly sortedSlots: Array<SlotData>;
    /**
     * @private
     */
    readonly defaultActions: Array<ActionData>;
    /**
     * @private
     */
    readonly actions: Array<ActionData>;
    /**
     * @private
     */
    readonly bones: Record<string, BoneData>;
    /**
     * @private
     */
    readonly slots: Record<string, SlotData>;
    /**
     * @private
     */
    readonly constraints: Record<string, ConstraintData>;
    /**
     * @private
     */
    readonly skins: Record<string, SkinData>;
    /**
     * @private
     */
    readonly animations: Record<string, AnimationData>;
    /**
     * - The default skin data.
     * @version DragonBones 4.5
     * @language en_US
     */
    /**
     * - 默认插槽数据。
     * @version DragonBones 4.5
     * @language zh_CN
     */
    defaultSkin: SkinData | null;
    /**
     * - The default animation data.
     * @version DragonBones 4.5
     * @language en_US
     */
    /**
     * - 默认动画数据。
     * @version DragonBones 4.5
     * @language zh_CN
     */
    defaultAnimation: AnimationData | null;
    /**
     * @private
     */
    canvas: CanvasData | null;
    /**
     * @private
     */
    userData: UserData | null;
    /**
     * @private
     */
    parent: DragonBonesData;
    protected _onClear(): void;
    /**
     * @internal
     */
    sortBones(): void;
    /**
     * @internal
     */
    cacheFrames(frameRate: number): void;
    /**
     * @internal
     */
    setCacheFrame(globalTransformMatrix: Matrix, transform: Transform): number;
    /**
     * @internal
     */
    getCacheFrame(globalTransformMatrix: Matrix, transform: Transform, arrayOffset: number): void;
    /**
     * @internal
     */
    addBone(value: BoneData): void;
    /**
     * @internal
     */
    addSlot(value: SlotData): void;
    /**
     * @internal
     */
    addConstraint(value: ConstraintData): void;
    /**
     * @internal
     */
    addSkin(value: SkinData): void;
    /**
     * @internal
     */
    addAnimation(value: AnimationData): void;
    /**
     * @internal
     */
    addAction(value: ActionData, isDefault: boolean): void;
    /**
     * - Get a specific done data.
     * @param boneName - The bone name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 获取特定的骨骼数据。
     * @param boneName - 骨骼名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    getBone(boneName: string): BoneData | null;
    /**
     * - Get a specific slot data.
     * @param slotName - The slot name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 获取特定的插槽数据。
     * @param slotName - 插槽名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    getSlot(slotName: string): SlotData | null;
    /**
     * @private
     */
    getConstraint(constraintName: string): ConstraintData | null;
    /**
     * - Get a specific skin data.
     * @param skinName - The skin name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 获取特定皮肤数据。
     * @param skinName - 皮肤名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    getSkin(skinName: string): SkinData | null;
    /**
     * @private
     */
    getMesh(skinName: string, slotName: string, meshName: string): MeshDisplayData | null;
    /**
     * - Get a specific animation data.
     * @param animationName - The animation animationName.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 获取特定的动画数据。
     * @param animationName - 动画名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    getAnimation(animationName: string): AnimationData | null;
}
/**
 * - The bone data.
 * @version DragonBones 3.0
 * @language en_US
 */
/**
 * - 骨骼数据。
 * @version DragonBones 3.0
 * @language zh_CN
 */
export declare class BoneData extends BaseObject {
    static toString(): string;
    /**
     * @private
     */
    inheritTranslation: boolean;
    /**
     * @private
     */
    inheritRotation: boolean;
    /**
     * @private
     */
    inheritScale: boolean;
    /**
     * @private
     */
    inheritReflection: boolean;
    /**
     * @private
     */
    type: BoneType;
    /**
     * - The bone length.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 骨骼长度。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    length: number;
    /**
     * @private
     */
    alpha: number;
    /**
     * - The bone name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 骨骼名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    name: string;
    /**
     * @private
     */
    readonly transform: Transform;
    /**
     * @private
     */
    userData: UserData | null;
    /**
     * - The parent bone data.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 父骨骼数据。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    parent: BoneData | null;
    protected _onClear(): void;
}
/**
 * @internal
 */
export declare class SurfaceData extends BoneData {
    static toString(): string;
    segmentX: number;
    segmentY: number;
    readonly geometry: GeometryData;
    protected _onClear(): void;
}
/**
 * - The slot data.
 * @version DragonBones 3.0
 * @language en_US
 */
/**
 * - 插槽数据。
 * @version DragonBones 3.0
 * @language zh_CN
 */
export declare class SlotData extends BaseObject {
    /**
     * @internal
     */
    static readonly DEFAULT_COLOR: ColorTransform;
    /**
     * @internal
     */
    static createColor(): ColorTransform;
    static toString(): string;
    /**
     * @private
     */
    blendMode: BlendMode;
    /**
     * @private
     */
    displayIndex: number;
    /**
     * @private
     */
    zOrder: number;
    /**
     * @private
     */
    zIndex: number;
    /**
     * @private
     */
    alpha: number;
    /**
     * - The slot name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 插槽名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    name: string;
    /**
     * @private
     */
    color: ColorTransform;
    /**
     * @private
     */
    userData: UserData | null;
    /**
     * - The parent bone data.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 父骨骼数据。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    parent: BoneData;
    protected _onClear(): void;
}
