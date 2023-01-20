import { BaseObject } from "../core/BaseObject";
import { ActionType } from "../core/DragonBones";
import { BoneData, SlotData } from "./ArmatureData";
export declare class UserData extends BaseObject {
    static toString(): string;
    /**
     * - The custom int numbers.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 自定义整数。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    readonly ints: Array<number>;
    /**
     * - The custom float numbers.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 自定义浮点数。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    readonly floats: Array<number>;
    /**
     * - The custom strings.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 自定义字符串。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    readonly strings: Array<string>;
    protected _onClear(): void;
    /**
     * @internal
     */
    addInt(value: number): void;
    /**
     * @internal
     */
    addFloat(value: number): void;
    /**
     * @internal
     */
    addString(value: string): void;
    /**
     * - Get the custom int number.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 获取自定义整数。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    getInt(index?: number): number;
    /**
     * - Get the custom float number.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 获取自定义浮点数。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    getFloat(index?: number): number;
    /**
     * - Get the custom string.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 获取自定义字符串。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    getString(index?: number): string;
}
/**
 * @private
 */
export declare class ActionData extends BaseObject {
    static toString(): string;
    type: ActionType;
    name: string;
    bone: BoneData | null;
    slot: SlotData | null;
    data: UserData | null;
    protected _onClear(): void;
}
