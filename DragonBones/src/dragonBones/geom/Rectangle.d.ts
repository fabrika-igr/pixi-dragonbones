export declare class Rectangle {
    /**
     * - The x coordinate of the top-left corner of the rectangle.
     * @default 0.0
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 矩形左上角的 x 坐标。
     * @default 0.0
     * @version DragonBones 3.0
     * @language zh_CN
     */
    x: number;
    /**
     * - The y coordinate of the top-left corner of the rectangle.
     * @default 0.0
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 矩形左上角的 y 坐标。
     * @default 0.0
     * @version DragonBones 3.0
     * @language zh_CN
     */
    y: number;
    /**
     * - The width of the rectangle, in pixels.
     * @default 0.0
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 矩形的宽度（以像素为单位）。
     * @default 0.0
     * @version DragonBones 3.0
     * @language zh_CN
     */
    width: number;
    /**
     * - 矩形的高度（以像素为单位）。
     * @default 0.0
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - The height of the rectangle, in pixels.
     * @default 0.0
     * @version DragonBones 3.0
     * @language zh_CN
     */
    height: number;
    /**
     * @private
     */
    constructor(x?: number, y?: number, width?: number, height?: number);
    /**
     * @private
     */
    copyFrom(value: Rectangle): void;
    /**
     * @private
     */
    clear(): void;
}
