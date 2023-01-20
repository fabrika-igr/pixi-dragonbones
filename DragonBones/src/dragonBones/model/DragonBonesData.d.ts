import { BaseObject } from "../core/BaseObject";
import { ArmatureData } from "./ArmatureData";
import { UserData } from "./UserData";
export declare class DragonBonesData extends BaseObject {
    static toString(): string;
    /**
     * @private
     */
    autoSearch: boolean;
    /**
     * - The animation frame rate.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 动画帧频。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    frameRate: number;
    /**
     * - The data version.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 数据版本。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    version: string;
    /**
     * - The DragonBones data name.
     * The name is consistent with the DragonBones project name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 龙骨数据名称。
     * 该名称与龙骨项目名保持一致。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    name: string;
    /**
     * @private
     */
    stage: ArmatureData | null;
    /**
     * - All armature data names.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 所有的骨架数据名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    readonly armatureNames: Array<string>;
    /**
     * @private
     */
    readonly armatures: Record<string, ArmatureData>;
    /**
     * @private
     */
    userData: UserData | null;
    protected _onClear(): void;
    /**
     * - Get a specific armature data.
     * @param armatureName - The armature data name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 获取特定的骨架数据。
     * @param armatureName - 骨架数据名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    getArmature(armatureName: string): ArmatureData | null;
}
