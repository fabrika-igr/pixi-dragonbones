import { BaseObject } from "../core/BaseObject";
export class CanvasData extends BaseObject {
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
