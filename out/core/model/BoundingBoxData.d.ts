import { BaseObject } from "../core/BaseObject";
import { BoundingBoxType } from "../core/DragonBones";
export declare abstract class BoundingBoxData extends BaseObject {
    /**
     * - The bounding box type.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 边界框类型。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    type: BoundingBoxType;
    /**
     * @private
     */
    color: number;
    /**
     * @private
     */
    width: number;
    /**
     * @private
     */
    height: number;
    protected _onClear(): void;
    /**
     * - Check whether the bounding box contains a specific point. (Local coordinate system)
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 检查边界框是否包含特定点。（本地坐标系）
     * @version DragonBones 5.0
     * @language zh_CN
     */
    abstract containsPoint(pX: number, pY: number): boolean;
    /**
     * - Check whether the bounding box intersects a specific segment. (Local coordinate system)
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 检查边界框是否与特定线段相交。（本地坐标系）
     * @version DragonBones 5.0
     * @language zh_CN
     */
    abstract intersectsSegment(xA: number, yA: number, xB: number, yB: number, intersectionPointA: {
        x: number;
        y: number;
    } | null, intersectionPointB: {
        x: number;
        y: number;
    } | null, normalRadians: {
        x: number;
        y: number;
    } | null): number;
}
/**
 * - The rectangle bounding box data.
 * @version DragonBones 5.1
 * @language en_US
 */
/**
 * - 矩形边界框数据。
 * @version DragonBones 5.1
 * @language zh_CN
 */
export declare class RectangleBoundingBoxData extends BoundingBoxData {
    static toString(): string;
    /**
     * - Compute the bit code for a point (x, y) using the clip rectangle
     */
    private static _computeOutCode;
    /**
     * @private
     */
    static rectangleIntersectsSegment(xA: number, yA: number, xB: number, yB: number, xMin: number, yMin: number, xMax: number, yMax: number, intersectionPointA?: {
        x: number;
        y: number;
    } | null, intersectionPointB?: {
        x: number;
        y: number;
    } | null, normalRadians?: {
        x: number;
        y: number;
    } | null): number;
    protected _onClear(): void;
    /**
     * @inheritDoc
     */
    containsPoint(pX: number, pY: number): boolean;
    /**
     * @inheritDoc
     */
    intersectsSegment(xA: number, yA: number, xB: number, yB: number, intersectionPointA?: {
        x: number;
        y: number;
    } | null, intersectionPointB?: {
        x: number;
        y: number;
    } | null, normalRadians?: {
        x: number;
        y: number;
    } | null): number;
}
/**
 * - The ellipse bounding box data.
 * @version DragonBones 5.1
 * @language en_US
 */
/**
 * - 椭圆边界框数据。
 * @version DragonBones 5.1
 * @language zh_CN
 */
export declare class EllipseBoundingBoxData extends BoundingBoxData {
    static toString(): string;
    /**
     * @private
     */
    static ellipseIntersectsSegment(xA: number, yA: number, xB: number, yB: number, xC: number, yC: number, widthH: number, heightH: number, intersectionPointA?: {
        x: number;
        y: number;
    } | null, intersectionPointB?: {
        x: number;
        y: number;
    } | null, normalRadians?: {
        x: number;
        y: number;
    } | null): number;
    protected _onClear(): void;
    /**
     * @inheritDoc
     */
    containsPoint(pX: number, pY: number): boolean;
    /**
     * @inheritDoc
     */
    intersectsSegment(xA: number, yA: number, xB: number, yB: number, intersectionPointA?: {
        x: number;
        y: number;
    } | null, intersectionPointB?: {
        x: number;
        y: number;
    } | null, normalRadians?: {
        x: number;
        y: number;
    } | null): number;
}
/**
 * - The polygon bounding box data.
 * @version DragonBones 5.1
 * @language en_US
 */
/**
 * - 多边形边界框数据。
 * @version DragonBones 5.1
 * @language zh_CN
 */
export declare class PolygonBoundingBoxData extends BoundingBoxData {
    static toString(): string;
    /**
     * @private
     */
    static polygonIntersectsSegment(xA: number, yA: number, xB: number, yB: number, vertices: Array<number>, intersectionPointA?: {
        x: number;
        y: number;
    } | null, intersectionPointB?: {
        x: number;
        y: number;
    } | null, normalRadians?: {
        x: number;
        y: number;
    } | null): number;
    /**
     * @private
     */
    x: number;
    /**
     * @private
     */
    y: number;
    /**
     * - The polygon vertices.
     * @version DragonBones 5.1
     * @language en_US
     */
    /**
     * - 多边形顶点。
     * @version DragonBones 5.1
     * @language zh_CN
     */
    readonly vertices: Array<number>;
    protected _onClear(): void;
    /**
     * @inheritDoc
     */
    containsPoint(pX: number, pY: number): boolean;
    /**
     * @inheritDoc
     */
    intersectsSegment(xA: number, yA: number, xB: number, yB: number, intersectionPointA?: {
        x: number;
        y: number;
    } | null, intersectionPointB?: {
        x: number;
        y: number;
    } | null, normalRadians?: {
        x: number;
        y: number;
    } | null): number;
}
