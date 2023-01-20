import { BaseObject } from "../core/BaseObject";
import { Point } from "../geom/Point";
import { Transform } from "../geom/Transform";
/**
 * @private
 */
export class GeometryData {
    constructor() {
        this.weight = null; // Initial value.
    }
    clear() {
        if (!this.isShared && this.weight !== null) {
            this.weight.returnToPool();
        }
        this.isShared = false;
        this.inheritDeform = false;
        this.offset = 0;
        this.data = null;
        this.weight = null;
    }
    shareFrom(value) {
        this.isShared = true;
        this.offset = value.offset;
        this.weight = value.weight;
    }
    get vertexCount() {
        const intArray = this.data.intArray;
        return intArray[this.offset + 0 /* GeometryVertexCount */];
    }
    get triangleCount() {
        const intArray = this.data.intArray;
        return intArray[this.offset + 1 /* GeometryTriangleCount */];
    }
}
/**
 * @private
 */
export class DisplayData extends BaseObject {
    constructor() {
        super(...arguments);
        this.transform = new Transform();
    }
    _onClear() {
        this.name = "";
        this.path = "";
        this.transform.identity();
        this.parent = null; //
    }
}
/**
 * @private
 */
export class ImageDisplayData extends DisplayData {
    constructor() {
        super(...arguments);
        this.pivot = new Point();
    }
    static toString() {
        return "[class dragonBones.ImageDisplayData]";
    }
    _onClear() {
        super._onClear();
        this.type = 0 /* Image */;
        this.pivot.clear();
        this.texture = null;
    }
}
/**
 * @private
 */
export class ArmatureDisplayData extends DisplayData {
    constructor() {
        super(...arguments);
        this.actions = [];
    }
    static toString() {
        return "[class dragonBones.ArmatureDisplayData]";
    }
    _onClear() {
        super._onClear();
        for (const action of this.actions) {
            action.returnToPool();
        }
        this.type = 1 /* Armature */;
        this.inheritAnimation = false;
        this.actions.length = 0;
        this.armature = null;
    }
    /**
     * @private
     */
    addAction(value) {
        this.actions.push(value);
    }
}
/**
 * @private
 */
export class MeshDisplayData extends DisplayData {
    constructor() {
        super(...arguments);
        this.geometry = new GeometryData();
    }
    static toString() {
        return "[class dragonBones.MeshDisplayData]";
    }
    _onClear() {
        super._onClear();
        this.type = 2 /* Mesh */;
        this.geometry.clear();
        this.texture = null;
    }
}
/**
 * @private
 */
export class BoundingBoxDisplayData extends DisplayData {
    constructor() {
        super(...arguments);
        this.boundingBox = null; // Initial value.
    }
    static toString() {
        return "[class dragonBones.BoundingBoxDisplayData]";
    }
    _onClear() {
        super._onClear();
        if (this.boundingBox !== null) {
            this.boundingBox.returnToPool();
        }
        this.type = 3 /* BoundingBox */;
        this.boundingBox = null;
    }
}
/**
 * @private
 */
export class PathDisplayData extends DisplayData {
    constructor() {
        super(...arguments);
        this.geometry = new GeometryData();
        this.curveLengths = [];
    }
    static toString() {
        return "[class dragonBones.PathDisplayData]";
    }
    _onClear() {
        super._onClear();
        this.type = 4 /* Path */;
        this.closed = false;
        this.constantSpeed = false;
        this.geometry.clear();
        this.curveLengths.length = 0;
    }
}
/**
 * @private
 */
export class WeightData extends BaseObject {
    constructor() {
        super(...arguments);
        this.bones = [];
    }
    static toString() {
        return "[class dragonBones.WeightData]";
    }
    _onClear() {
        this.count = 0;
        this.offset = 0;
        this.bones.length = 0;
    }
    addBone(value) {
        this.bones.push(value);
    }
}
