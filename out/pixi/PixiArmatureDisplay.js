import * as PIXI from "pixi.js";
import { DragonBones } from "../core/core/DragonBones";
export class PixiArmatureDisplay extends PIXI.Sprite {
    constructor() {
        super(...arguments);
        /**
         * @private
         */
        this.debugDraw = false;
        this._debugDraw = false;
        // private _disposeProxy: boolean = false;
        this._armature = null;
        this._debugDrawer = null;
    }
    /**
     * @inheritDoc
     */
    dbInit(armature) {
        this._armature = armature;
    }
    /**
     * @inheritDoc
     */
    dbClear() {
        if (this._debugDrawer !== null) {
            this._debugDrawer.destroy({ children: true, texture: true, baseTexture: true });
        }
        this._armature = null;
        this._debugDrawer = null;
        super.destroy();
    }
    /**
     * @inheritDoc
     */
    dbUpdate() {
        const drawed = DragonBones.debugDraw || this.debugDraw;
        if (drawed || this._debugDraw) {
            this._debugDraw = drawed;
            if (this._debugDraw) {
                if (this._debugDrawer === null) {
                    this._debugDrawer = new PIXI.Sprite(PIXI.Texture.EMPTY);
                    const boneDrawer = new PIXI.Graphics();
                    this._debugDrawer.addChild(boneDrawer);
                }
                this.addChild(this._debugDrawer);
                const boneDrawer = this._debugDrawer.getChildAt(0);
                boneDrawer.clear();
                const bones = this._armature.getBones();
                for (let i = 0, l = bones.length; i < l; ++i) {
                    const bone = bones[i];
                    const boneLength = bone.boneData.length;
                    const startX = bone.globalTransformMatrix.tx;
                    const startY = bone.globalTransformMatrix.ty;
                    const endX = startX + bone.globalTransformMatrix.a * boneLength;
                    const endY = startY + bone.globalTransformMatrix.b * boneLength;
                    boneDrawer.lineStyle(2.0, 0x00FFFF, 0.7);
                    boneDrawer.moveTo(startX, startY);
                    boneDrawer.lineTo(endX, endY);
                    boneDrawer.lineStyle(0.0, 0, 0.0);
                    boneDrawer.beginFill(0x00FFFF, 0.7);
                    boneDrawer.drawCircle(startX, startY, 3.0);
                    boneDrawer.endFill();
                }
                const slots = this._armature.getSlots();
                for (let i = 0, l = slots.length; i < l; ++i) {
                    const slot = slots[i];
                    const boundingBoxData = slot.boundingBoxData;
                    if (boundingBoxData) {
                        let child = this._debugDrawer.getChildByName(slot.name);
                        if (!child) {
                            child = new PIXI.Graphics();
                            child.name = slot.name;
                            this._debugDrawer.addChild(child);
                        }
                        child.clear();
                        child.lineStyle(2.0, 0xFF00FF, 0.7);
                        switch (boundingBoxData.type) {
                            case 0 /* BoundingBoxType.Rectangle */:
                                child.drawRect(-boundingBoxData.width * 0.5, -boundingBoxData.height * 0.5, boundingBoxData.width, boundingBoxData.height);
                                break;
                            case 1 /* BoundingBoxType.Ellipse */:
                                child.drawEllipse(-boundingBoxData.width * 0.5, -boundingBoxData.height * 0.5, boundingBoxData.width, boundingBoxData.height);
                                break;
                            case 2 /* BoundingBoxType.Polygon */:
                                const vertices = boundingBoxData.vertices;
                                for (let i = 0, l = vertices.length; i < l; i += 2) {
                                    const x = vertices[i];
                                    const y = vertices[i + 1];
                                    if (i === 0) {
                                        child.moveTo(x, y);
                                    }
                                    else {
                                        child.lineTo(x, y);
                                    }
                                }
                                child.lineTo(vertices[0], vertices[1]);
                                break;
                            default:
                                break;
                        }
                        child.endFill();
                        slot.updateTransformAndMatrix();
                        slot.updateGlobalTransform();
                        const transform = slot.global;
                        child.setTransform(transform.x, transform.y, transform.scaleX, transform.scaleY, transform.rotation, transform.skew, 0.0, slot._pivotX, slot._pivotY);
                    }
                    else {
                        const child = this._debugDrawer.getChildByName(slot.name);
                        if (child) {
                            this._debugDrawer.removeChild(child);
                        }
                    }
                }
            }
            else if (this._debugDrawer !== null && this._debugDrawer.parent === this) {
                this.removeChild(this._debugDrawer);
            }
        }
    }
    /**
     * @inheritDoc
     */
    dispose(disposeProxy = true) {
        // tslint:disable-next-line:no-unused-expression
        disposeProxy;
        if (this._armature !== null) {
            this._armature.dispose();
            this._armature = null;
        }
    }
    /**
     * @inheritDoc
     */
    destroy() {
        this.dispose();
    }
    /**
     * @private
     */
    dispatchDBEvent(type, eventObject) {
        // TODO change type pls
        this.emit(type, eventObject);
    }
    /**
     * @inheritDoc
     */
    hasDBEventListener(type) {
        // TODO change type pls
        return this.listenerCount(type) > 0;
    }
    /**
     * @inheritDoc
     */
    addDBEventListener(type, listener, target) {
        this.addListener(type, listener, target);
    }
    /**
     * @inheritDoc
     */
    removeDBEventListener(type, listener, target) {
        this.removeListener(type, listener, target);
    }
    /**
     * @inheritDoc
     */
    get armature() {
        return this._armature;
    }
    /**
     * @inheritDoc
     */
    get animation() {
        return this._armature.animation;
    }
}
