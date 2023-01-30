import { Matrix } from "../geom/Matrix";
import { SurfaceData } from "../model/ArmatureData";
import { Armature } from "./Armature";
import { Bone } from "./Bone";
export declare class Surface extends Bone {
    static toString(): string;
    private _dX;
    private _dY;
    private _k;
    private _kX;
    private _kY;
    readonly _vertices: Array<number>;
    readonly _deformVertices: Array<number>;
    /**
     * - x1, y1, x2, y2, x3, y3, x4, y4, d1X, d1Y, d2X, d2Y
     */
    private readonly _hullCache;
    /**
     * - Inside [flag, a, b, c, d, tx, ty], Outside [flag, a, b, c, d, tx, ty]
     */
    private readonly _matrixCahce;
    _bone: Bone | null;
    protected _onClear(): void;
    private _getAffineTransform;
    private _updateVertices;
    protected _updateGlobalTransformMatrix(isCache: boolean): void;
    _getGlobalTransformMatrix(x: number, y: number): Matrix;
    /**
     * @internal
     * @private
     */
    init(surfaceData: SurfaceData, armatureValue: Armature): void;
    /**
     * @internal
     */
    update(cacheFrameIndex: number): void;
}
