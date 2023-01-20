"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathConstraintData = exports.IKConstraintData = exports.ConstraintData = void 0;
const BaseObject_1 = require("../core/BaseObject");
class ConstraintData extends BaseObject_1.BaseObject {
    _onClear() {
        this.order = 0;
        this.name = "";
        this.type = 0 /* IK */;
        this.target = null; //
        this.root = null; //
        this.bone = null;
    }
}
exports.ConstraintData = ConstraintData;
/**
 * @internal
 */
class IKConstraintData extends ConstraintData {
    static toString() {
        return "[class dragonBones.IKConstraintData]";
    }
    _onClear() {
        super._onClear();
        this.scaleEnabled = false;
        this.bendPositive = false;
        this.weight = 1.0;
    }
}
exports.IKConstraintData = IKConstraintData;
/**
 * @internal
 */
class PathConstraintData extends ConstraintData {
    constructor() {
        super(...arguments);
        this.bones = [];
    }
    static toString() {
        return "[class dragonBones.PathConstraintData]";
    }
    _onClear() {
        super._onClear();
        this.pathSlot = null;
        this.pathDisplayData = null;
        this.bones.length = 0;
        this.positionMode = 0 /* Fixed */;
        this.spacingMode = 1 /* Fixed */;
        this.rotateMode = 1 /* Chain */;
        this.position = 0.0;
        this.spacing = 0.0;
        this.rotateOffset = 0.0;
        this.rotateMix = 0.0;
        this.translateMix = 0.0;
    }
    AddBone(value) {
        this.bones.push(value);
    }
}
exports.PathConstraintData = PathConstraintData;
