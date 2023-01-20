export class Point {
    /**
     * - Creates a new point. If you pass no parameters to this method, a point is created at (0,0).
     * @param x - The horizontal coordinate.
     * @param y - The vertical coordinate.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 创建一个 egret.Point 对象.若不传入任何参数，将会创建一个位于（0，0）位置的点。
     * @param x - 该对象的x属性值，默认为 0.0。
     * @param y - 该对象的y属性值，默认为 0.0。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }
    /**
     * @private
     */
    copyFrom(value) {
        this.x = value.x;
        this.y = value.y;
    }
    /**
     * @private
     */
    clear() {
        this.x = this.y = 0.0;
    }
}
