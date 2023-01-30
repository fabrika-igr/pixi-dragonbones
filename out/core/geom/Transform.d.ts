import { Matrix } from "./Matrix";
export declare class Transform {
    /**
     * @private
     */
    static readonly PI: number;
    /**
     * @private
     */
    static readonly PI_D: number;
    /**
     * @private
     */
    static readonly PI_H: number;
    /**
     * @private
     */
    static readonly PI_Q: number;
    /**
     * @private
     */
    static readonly RAD_DEG: number;
    /**
     * @private
     */
    static readonly DEG_RAD: number;
    /**
     * @private
     */
    static normalizeRadian(value: number): number;
    /**
     * - Horizontal translate.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 水平位移。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    x: number;
    /**
     * - Vertical translate.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 垂直位移。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    y: number;
    /**
     * - Skew. (In radians)
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 倾斜。 （以弧度为单位）
     * @version DragonBones 3.0
     * @language zh_CN
     */
    skew: number;
    /**
     * - rotation. (In radians)
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 旋转。 （以弧度为单位）
     * @version DragonBones 3.0
     * @language zh_CN
     */
    rotation: number;
    /**
     * - Horizontal Scaling.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 水平缩放。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    scaleX: number;
    /**
     * - Vertical scaling.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 垂直缩放。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    scaleY: number;
    /**
     * @private
     */
    constructor(x?: number, y?: number, skew?: number, rotation?: number, scaleX?: number, scaleY?: number);
    toString(): string;
    /**
     * @private
     */
    copyFrom(value: Transform): Transform;
    /**
     * @private
     */
    identity(): Transform;
    /**
     * @private
     */
    add(value: Transform): Transform;
    /**
     * @private
     */
    minus(value: Transform): Transform;
    /**
     * @private
     */
    fromMatrix(matrix: Matrix): Transform;
    /**
     * @private
     */
    toMatrix(matrix: Matrix): Transform;
}
