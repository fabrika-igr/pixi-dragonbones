
export class Rectangle {
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
    public x: number;
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
    public y: number;
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
    public width: number;
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
    public height: number;
    /**
     * @private
     */
    public constructor(
        x: number = 0.0, y: number = 0.0,
        width: number = 0.0, height: number = 0.0
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    /**
     * @private
     */
    public copyFrom(value: Rectangle): void {
        this.x = value.x;
        this.y = value.y;
        this.width = value.width;
        this.height = value.height;
    }
    /**
     * @private
     */
    public clear(): void {
        this.x = this.y = 0.0;
        this.width = this.height = 0.0;
    }
}