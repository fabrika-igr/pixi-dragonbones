import { BaseObject } from "../core/BaseObject";
export class ConstraintData extends BaseObject {
    _onClear() {
        this.order = 0;
        this.name = "";
        this.type = 0 /* ConstraintType.IK */;
        this.target = null; //
        this.root = null; //
        this.bone = null;
    }
}
/**
 * @internal
 */
export class IKConstraintData extends ConstraintData {
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
/**
 * @internal
 */
export class PathConstraintData extends ConstraintData {
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
        this.positionMode = 0 /* PositionMode.Fixed */;
        this.spacingMode = 1 /* SpacingMode.Fixed */;
        this.rotateMode = 1 /* RotateMode.Chain */;
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
