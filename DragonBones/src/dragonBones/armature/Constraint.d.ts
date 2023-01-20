import { BaseObject } from "../core/BaseObject";
import { Matrix } from "../geom/Matrix";
import { Point } from "../geom/Point";
import { Transform } from "../geom/Transform";
import { ConstraintData } from "../model/ConstraintData";
import { Armature } from "./Armature";
import { Bone } from "./Bone";
export declare abstract class Constraint extends BaseObject {
    protected static readonly _helpMatrix: Matrix;
    protected static readonly _helpTransform: Transform;
    protected static readonly _helpPoint: Point;
    protected _armature: Armature;
    protected _bone: Bone | null;
    protected _onClear(): void;
    abstract init(constraintData: ConstraintData, armature: Armature): void;
    abstract update(): void;
    abstract invalidUpdate(): void;
    get name(): string;
}
