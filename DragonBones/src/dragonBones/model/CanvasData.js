"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasData = void 0;
const BaseObject_1 = require("../core/BaseObject");
class CanvasData extends BaseObject_1.BaseObject {
    static toString() {
        return "[class dragonBones.CanvasData]";
    }
    _onClear() {
        this.hasBackground = false;
        this.color = 0x000000;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
}
exports.CanvasData = CanvasData;
