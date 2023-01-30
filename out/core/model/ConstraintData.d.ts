import { BaseObject } from "../core/BaseObject";
import { ConstraintType, PositionMode, RotateMode, SpacingMode } from "../core/DragonBones";
import { BoneData, SlotData } from "./ArmatureData";
import { PathDisplayData } from "./DisplayData";
export declare abstract class ConstraintData extends BaseObject {
    order: number;
    name: string;
    type: ConstraintType;
    target: BoneData;
    root: BoneData;
    bone: BoneData | null;
    protected _onClear(): void;
}
/**
 * @internal
 */
export declare class IKConstraintData extends ConstraintData {
    static toString(): string;
    scaleEnabled: boolean;
    bendPositive: boolean;
    weight: number;
    protected _onClear(): void;
}
/**
 * @internal
 */
export declare class PathConstraintData extends ConstraintData {
    static toString(): string;
    pathSlot: SlotData;
    pathDisplayData: PathDisplayData;
    bones: Array<BoneData>;
    positionMode: PositionMode;
    spacingMode: SpacingMode;
    rotateMode: RotateMode;
    position: number;
    spacing: number;
    rotateOffset: number;
    rotateMix: number;
    translateMix: number;
    protected _onClear(): void;
    AddBone(value: BoneData): void;
}
