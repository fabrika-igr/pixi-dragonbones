import { BaseObject } from "../core/BaseObject";
import { Matrix } from "../geom/Matrix";
import { Point } from "../geom/Point";
import { Transform } from "../geom/Transform";
import { ConstraintData } from "../model/ConstraintData";
import { GeometryData, PathDisplayData } from "../model/DisplayData";
import { Armature } from "./Armature";
import { Bone } from "./Bone";
export declare abstract class Constraint extends BaseObject {
    protected static readonly _helpMatrix: Matrix;
    protected static readonly _helpTransform: Transform;
    protected static readonly _helpPoint: Point;
    /**
     * - For timeline state.
     * @internal
     */
    _constraintData: ConstraintData;
    protected _armature: Armature;
    /**
     * - For sort bones.
     * @internal
     */
    _target: Bone;
    /**
     * - For sort bones.
     * @internal
     */
    _root: Bone;
    protected _bone: Bone | null;
    protected _onClear(): void;
    abstract init(constraintData: ConstraintData, armature: Armature): void;
    abstract update(): void;
    abstract invalidUpdate(): void;
    get name(): string;
}
/**
 * @internal
 */
export declare class IKConstraint extends Constraint {
    static toString(): string;
    /**
     * - For timeline state.
     * @internal
     */
    _bendPositive: boolean;
    /**
     * - For timeline state.
     * @internal
     */
    _weight: number;
    protected _onClear(): void;
    private _computeA;
    private _computeB;
    init(constraintData: ConstraintData, armature: Armature): void;
    update(): void;
    invalidUpdate(): void;
}
/**
 * @internal
 */
export declare class PathConstraint extends Constraint {
    dirty: boolean;
    pathOffset: number;
    position: number;
    spacing: number;
    rotateOffset: number;
    rotateMix: number;
    translateMix: number;
    private _pathSlot;
    private _bones;
    private _spaces;
    private _positions;
    private _curves;
    private _boneLengths;
    private _pathGlobalVertices;
    private _segments;
    static toString(): string;
    protected _onClear(): void;
    protected _updatePathVertices(verticesData: GeometryData): void;
    protected _computeVertices(start: number, count: number, offset: number, out: Array<number>): void;
    protected _computeBezierCurve(pathDisplayDta: PathDisplayData, spaceCount: number, tangents: boolean, percentPosition: boolean, percentSpacing: boolean): void;
    private addCurvePosition;
    init(constraintData: ConstraintData, armature: Armature): void;
    update(): void;
    invalidUpdate(): void;
}
