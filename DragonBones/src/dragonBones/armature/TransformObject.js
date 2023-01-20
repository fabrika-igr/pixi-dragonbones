"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformObject = void 0;
const BaseObject_1 = require("../core/BaseObject");
const Matrix_1 = require("../geom/Matrix");
const Point_1 = require("../geom/Point");
const Transform_1 = require("../geom/Transform");
class TransformObject extends BaseObject_1.BaseObject {
    constructor() {
        super(...arguments);
        /**
         * - A matrix relative to the armature coordinate system.
         * @version DragonBones 3.0
         * @language en_US
         */
        /**
         * - 相对于骨架坐标系的矩阵。
         * @version DragonBones 3.0
         * @language zh_CN
         */
        this.globalTransformMatrix = new Matrix_1.Matrix();
        /**
         * - A transform relative to the armature coordinate system.
         * @see #updateGlobalTransform()
         * @version DragonBones 3.0
         * @language en_US
         */
        /**
         * - 相对于骨架坐标系的变换。
         * @see #updateGlobalTransform()
         * @version DragonBones 3.0
         * @language zh_CN
         */
        this.global = new Transform_1.Transform();
        /**
         * - The offset transform relative to the armature or the parent bone coordinate system.
         * @see #dragonBones.Bone#invalidUpdate()
         * @version DragonBones 3.0
         * @language en_US
         */
        /**
         * - 相对于骨架或父骨骼坐标系的偏移变换。
         * @see #dragonBones.Bone#invalidUpdate()
         * @version DragonBones 3.0
         * @language zh_CN
         */
        this.offset = new Transform_1.Transform();
    }
    /**
     */
    _onClear() {
        this.globalTransformMatrix.identity();
        this.global.identity();
        this.offset.identity();
        this.origin = null;
        this.userData = null;
        this._globalDirty = false;
        this._alpha = 1.0;
        this._globalAlpha = 1.0;
        this._armature = null; //
    }
    /**
     * - For performance considerations, rotation or scale in the {@link #global} attribute of the bone or slot is not always properly accessible,
     * some engines do not rely on these attributes to update rendering, such as Egret.
     * The use of this method ensures that the access to the {@link #global} property is correctly rotation or scale.
     * @example
     * <pre>
     *     bone.updateGlobalTransform();
     *     let rotation = bone.global.rotation;
     * </pre>
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 出于性能的考虑，骨骼或插槽的 {@link #global} 属性中的旋转或缩放并不总是正确可访问的，有些引擎并不依赖这些属性更新渲染，比如 Egret。
     * 使用此方法可以保证访问到 {@link #global} 属性中正确的旋转或缩放。
     * @example
     * <pre>
     *     bone.updateGlobalTransform();
     *     let rotation = bone.global.rotation;
     * </pre>
     * @version DragonBones 3.0
     * @language zh_CN
     */
    updateGlobalTransform() {
        if (this._globalDirty) {
            this._globalDirty = false;
            this.global.fromMatrix(this.globalTransformMatrix);
        }
    }
    /**
     * - The armature to which it belongs.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 所属的骨架。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    get armature() {
        return this._armature;
    }
}
exports.TransformObject = TransformObject;
TransformObject._helpMatrix = new Matrix_1.Matrix();
TransformObject._helpTransform = new Transform_1.Transform();
TransformObject._helpPoint = new Point_1.Point();
