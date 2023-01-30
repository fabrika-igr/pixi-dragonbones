import { BaseObject } from "../core/BaseObject";
import { ArmatureData } from "./ArmatureData";
import { DisplayData } from "./DisplayData";
export declare class SkinData extends BaseObject {
    static toString(): string;
    /**
     * - The skin name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 皮肤名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    name: string;
    /**
     * @private
     */
    readonly displays: Record<string, Array<DisplayData | null>>;
    /**
     * @private
     */
    parent: ArmatureData;
    protected _onClear(): void;
    /**
     * @internal
     */
    addDisplay(slotName: string, value: DisplayData | null): void;
    /**
     * @private
     */
    getDisplay(slotName: string, displayName: string): DisplayData | null;
    /**
     * @private
     */
    getDisplays(slotName: string): Array<DisplayData | null> | null;
}
