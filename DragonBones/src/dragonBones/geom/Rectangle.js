"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
class Rectangle {
    /**
     * @private
     */
    constructor(x = 0.0, y = 0.0, width = 0.0, height = 0.0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    /**
     * @private
     */
    copyFrom(value) {
        this.x = value.x;
        this.y = value.y;
        this.width = value.width;
        this.height = value.height;
    }
    /**
     * @private
     */
    clear() {
        this.x = this.y = 0.0;
        this.width = this.height = 0.0;
    }
}
exports.Rectangle = Rectangle;
