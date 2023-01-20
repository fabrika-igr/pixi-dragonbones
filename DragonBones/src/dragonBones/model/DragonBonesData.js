"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragonBonesData = void 0;
const BaseObject_1 = require("../core/BaseObject");
class DragonBonesData extends BaseObject_1.BaseObject {
    constructor() {
        super(...arguments);
        /**
         * @internal
         */
        this.frameIndices = [];
        /**
         * @internal
         */
        this.cachedFrames = [];
        /**
         * - All armature data names.
         * @version DragonBones 3.0
         * @language en_US
         */
        /**
         * - 所有的骨架数据名称。
         * @version DragonBones 3.0
         * @language zh_CN
         */
        this.armatureNames = [];
        /**
         * @private
         */
        this.armatures = {};
        /**
         * @private
         */
        this.userData = null; // Initial value.
    }
    static toString() {
        return "[class dragonBones.DragonBonesData]";
    }
    _onClear() {
        for (let k in this.armatures) {
            this.armatures[k].returnToPool();
            delete this.armatures[k];
        }
        if (this.userData !== null) {
            this.userData.returnToPool();
        }
        this.autoSearch = false;
        this.frameRate = 0;
        this.version = "";
        this.name = "";
        this.stage = null;
        this.frameIndices.length = 0;
        this.cachedFrames.length = 0;
        this.armatureNames.length = 0;
        //this.armatures.clear();
        this.binary = null; //
        this.intArray = null; //
        this.floatArray = null; //
        this.frameIntArray = null; //
        this.frameFloatArray = null; //
        this.frameArray = null; //
        this.timelineArray = null; //
        this.colorArray = null; //
        this.userData = null;
    }
    /**
     * @internal
     */
    addArmature(value) {
        if (value.name in this.armatures) {
            console.warn("Same armature: " + value.name);
            return;
        }
        value.parent = this;
        this.armatures[value.name] = value;
        this.armatureNames.push(value.name);
    }
    /**
     * - Get a specific armature data.
     * @param armatureName - The armature data name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 获取特定的骨架数据。
     * @param armatureName - 骨架数据名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    getArmature(armatureName) {
        return armatureName in this.armatures ? this.armatures[armatureName] : null;
    }
}
exports.DragonBonesData = DragonBonesData;
