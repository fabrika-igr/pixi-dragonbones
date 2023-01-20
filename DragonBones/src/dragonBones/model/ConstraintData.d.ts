import { BaseObject } from "../core/BaseObject";
import { ConstraintType } from "../core/DragonBones";
import { BoneData } from "./ArmatureData";
export declare abstract class ConstraintData extends BaseObject {
    order: number;
    name: string;
    type: ConstraintType;
    target: BoneData;
    root: BoneData;
    bone: BoneData | null;
    protected _onClear(): void;
}
