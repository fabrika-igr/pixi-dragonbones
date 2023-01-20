import * as PIXI from "pixi.js";
import { Slot } from "../../../../../DragonBones/src/dragonBones/armature/Slot";
import { BaseObject } from "../../../../../DragonBones/src/dragonBones/core/BaseObject";
import { PixiTextureAtlasData } from "./PixiTextureAtlasData";
export class PixiSlot extends Slot {
    static toString() {
        return "[class dragonBones.PixiSlot]";
    }
    _onClear() {
        super._onClear();
        this._textureScale = 1.0;
        this._renderDisplay = null;
        this._updateTransform = PIXI.VERSION[0] === "3" ? this._updateTransformV3 : this._updateTransformV4;
    }
    _initDisplay(value, isRetain) {
        // tslint:disable-next-line:no-unused-expression
        value;
        // tslint:disable-next-line:no-unused-expression
        isRetain;
    }
    _disposeDisplay(value, isRelease) {
        // tslint:disable-next-line:no-unused-expression
        value;
        if (!isRelease) {
            value.destroy();
        }
    }
    _onUpdateDisplay() {
        this._renderDisplay = (this._display ? this._display : this._rawDisplay);
    }
    _addDisplay() {
        const container = this._armature.display;
        container.addChild(this._renderDisplay);
    }
    _replaceDisplay(value) {
        const container = this._armature.display;
        const prevDisplay = value;
        container.addChild(this._renderDisplay);
        container.swapChildren(this._renderDisplay, prevDisplay);
        container.removeChild(prevDisplay);
        this._textureScale = 1.0;
    }
    _removeDisplay() {
        this._renderDisplay.parent.removeChild(this._renderDisplay);
    }
    _updateZOrder() {
        const container = this._armature.display;
        const index = container.getChildIndex(this._renderDisplay);
        if (index === this._zOrder) {
            return;
        }
        container.addChildAt(this._renderDisplay, this._zOrder);
    }
    /**
     * @internal
     */
    _updateVisible() {
        this._renderDisplay.visible = this._parent.visible && this._visible;
    }
    _updateBlendMode() {
        if (this._renderDisplay instanceof PIXI.Sprite) {
            switch (this._blendMode) {
                case 0 /* Normal */:
                    this._renderDisplay.blendMode = PIXI.BLEND_MODES.NORMAL;
                    break;
                case 1 /* Add */:
                    this._renderDisplay.blendMode = PIXI.BLEND_MODES.ADD;
                    break;
                case 3 /* Darken */:
                    this._renderDisplay.blendMode = PIXI.BLEND_MODES.DARKEN;
                    break;
                case 4 /* Difference */:
                    this._renderDisplay.blendMode = PIXI.BLEND_MODES.DIFFERENCE;
                    break;
                case 6 /* HardLight */:
                    this._renderDisplay.blendMode = PIXI.BLEND_MODES.HARD_LIGHT;
                    break;
                case 9 /* Lighten */:
                    this._renderDisplay.blendMode = PIXI.BLEND_MODES.LIGHTEN;
                    break;
                case 10 /* Multiply */:
                    this._renderDisplay.blendMode = PIXI.BLEND_MODES.MULTIPLY;
                    break;
                case 11 /* Overlay */:
                    this._renderDisplay.blendMode = PIXI.BLEND_MODES.OVERLAY;
                    break;
                case 12 /* Screen */:
                    this._renderDisplay.blendMode = PIXI.BLEND_MODES.SCREEN;
                    break;
                default:
                    break;
            }
        }
        // TODO child armature.
    }
    _updateColor() {
        const alpha = this._colorTransform.alphaMultiplier * this._globalAlpha;
        this._renderDisplay.alpha = alpha;
        if (this._renderDisplay instanceof PIXI.Sprite || this._renderDisplay instanceof PIXI.SimpleMesh) {
            const color = (Math.round(this._colorTransform.redMultiplier * 0xFF) << 16) + (Math.round(this._colorTransform.greenMultiplier * 0xFF) << 8) + Math.round(this._colorTransform.blueMultiplier * 0xFF);
            this._renderDisplay.tint = color;
        }
        // TODO child armature.
    }
    _updateFrame() {
        let currentTextureData = this._textureData;
        if (this._displayIndex >= 0 && this._display !== null && currentTextureData !== null) {
            let currentTextureAtlasData = currentTextureData.parent;
            if (this._armature.replacedTexture !== null) { // Update replaced texture atlas.
                if (this._armature._replaceTextureAtlasData === null) {
                    currentTextureAtlasData = BaseObject.borrowObject(PixiTextureAtlasData);
                    currentTextureAtlasData.copyFrom(currentTextureData.parent);
                    currentTextureAtlasData.renderTexture = this._armature.replacedTexture;
                    this._armature._replaceTextureAtlasData = currentTextureAtlasData;
                }
                else {
                    currentTextureAtlasData = this._armature._replaceTextureAtlasData;
                }
                currentTextureData = currentTextureAtlasData.getTexture(currentTextureData.name);
            }
            const renderTexture = currentTextureData.renderTexture;
            if (renderTexture !== null) {
                if (this._geometryData !== null) { // Mesh.
                    const data = this._geometryData.data;
                    const intArray = data.intArray;
                    const floatArray = data.floatArray;
                    const vertexCount = intArray[this._geometryData.offset + 0 /* GeometryVertexCount */];
                    const triangleCount = intArray[this._geometryData.offset + 1 /* GeometryTriangleCount */];
                    let vertexOffset = intArray[this._geometryData.offset + 2 /* GeometryFloatOffset */];
                    if (vertexOffset < 0) {
                        vertexOffset += 65536; // Fixed out of bouds bug.
                    }
                    const uvOffset = vertexOffset + vertexCount * 2;
                    const scale = this._armature._armatureData.scale;
                    const meshDisplay = this._renderDisplay;
                    const vertices = new Float32Array(vertexCount * 2);
                    const uvs = new Float32Array(vertexCount * 2);
                    const indices = new Uint16Array(triangleCount * 3);
                    for (let i = 0, l = vertexCount * 2; i < l; ++i) {
                        vertices[i] = floatArray[vertexOffset + i] * scale;
                    }
                    for (let i = 0; i < triangleCount * 3; ++i) {
                        indices[i] = intArray[this._geometryData.offset + 4 /* GeometryVertexIndices */ + i];
                    }
                    for (let i = 0, l = vertexCount * 2; i < l; i += 2) {
                        const u = floatArray[uvOffset + i];
                        const v = floatArray[uvOffset + i + 1];
                        if (currentTextureData.rotated) {
                            uvs[i] = 1 - v;
                            uvs[i + 1] = u;
                        }
                        else {
                            uvs[i] = u;
                            uvs[i + 1] = v;
                        }
                    }
                    this._textureScale = 1.0;
                    meshDisplay.texture = renderTexture;
                    meshDisplay.vertices = vertices;
                    meshDisplay.uvBuffer.update(uvs);
                    meshDisplay.geometry.addIndex(indices);
                    const isSkinned = this._geometryData.weight !== null;
                    const isSurface = this._parent._boneData.type !== 0 /* Bone */;
                    if (isSkinned || isSurface) {
                        this._identityTransform();
                    }
                }
                else {
                    // Normal texture.
                    this._textureScale = currentTextureData.parent.scale * this._armature._armatureData.scale;
                    const normalDisplay = this._renderDisplay;
                    normalDisplay.texture = renderTexture;
                }
                this._visibleDirty = true;
                return;
            }
        }
        if (this._geometryData !== null) {
            const meshDisplay = this._renderDisplay;
            meshDisplay.texture = null;
            meshDisplay.x = 0.0;
            meshDisplay.y = 0.0;
            meshDisplay.visible = false;
        }
        else {
            const normalDisplay = this._renderDisplay;
            normalDisplay.texture = null;
            normalDisplay.x = 0.0;
            normalDisplay.y = 0.0;
            normalDisplay.visible = false;
        }
    }
    _updateMesh() {
        const scale = this._armature._armatureData.scale;
        const deformVertices = this._displayFrame.deformVertices;
        const bones = this._geometryBones;
        const geometryData = this._geometryData;
        const weightData = geometryData.weight;
        const hasDeform = deformVertices.length > 0 && geometryData.inheritDeform;
        const meshDisplay = this._renderDisplay;
        if (weightData !== null) {
            const data = geometryData.data;
            const intArray = data.intArray;
            const floatArray = data.floatArray;
            const vertexCount = intArray[geometryData.offset + 0 /* GeometryVertexCount */];
            let weightFloatOffset = intArray[weightData.offset + 1 /* WeigthFloatOffset */];
            if (weightFloatOffset < 0) {
                weightFloatOffset += 65536; // Fixed out of bouds bug.
            }
            for (let i = 0, iD = 0, iB = weightData.offset + 2 /* WeigthBoneIndices */ + bones.length, iV = weightFloatOffset, iF = 0; i < vertexCount; ++i) {
                const boneCount = intArray[iB++];
                let xG = 0.0, yG = 0.0;
                for (let j = 0; j < boneCount; ++j) {
                    const boneIndex = intArray[iB++];
                    const bone = bones[boneIndex];
                    if (bone !== null) {
                        const matrix = bone.globalTransformMatrix;
                        const weight = floatArray[iV++];
                        let xL = floatArray[iV++] * scale;
                        let yL = floatArray[iV++] * scale;
                        if (hasDeform) {
                            xL += deformVertices[iF++];
                            yL += deformVertices[iF++];
                        }
                        xG += (matrix.a * xL + matrix.c * yL + matrix.tx) * weight;
                        yG += (matrix.b * xL + matrix.d * yL + matrix.ty) * weight;
                    }
                }
                meshDisplay.vertices[iD++] = xG;
                meshDisplay.vertices[iD++] = yG;
            }
        }
        else {
            const isSurface = this._parent._boneData.type !== 0 /* Bone */;
            const data = geometryData.data;
            const intArray = data.intArray;
            const floatArray = data.floatArray;
            const vertexCount = intArray[geometryData.offset + 0 /* GeometryVertexCount */];
            let vertexOffset = intArray[geometryData.offset + 2 /* GeometryFloatOffset */];
            if (vertexOffset < 0) {
                vertexOffset += 65536; // Fixed out of bouds bug.
            }
            for (let i = 0, l = vertexCount * 2; i < l; i += 2) {
                let x = floatArray[vertexOffset + i] * scale;
                let y = floatArray[vertexOffset + i + 1] * scale;
                if (hasDeform) {
                    x += deformVertices[i];
                    y += deformVertices[i + 1];
                }
                if (isSurface) {
                    const matrix = this._parent._getGlobalTransformMatrix(x, y);
                    meshDisplay.vertices[i] = matrix.a * x + matrix.c * y + matrix.tx;
                    meshDisplay.vertices[i + 1] = matrix.b * x + matrix.d * y + matrix.ty;
                }
                else {
                    meshDisplay.vertices[i] = x;
                    meshDisplay.vertices[i + 1] = y;
                }
            }
        }
    }
    _updateTransform() {
        throw new Error();
    }
    _updateTransformV3() {
        this.updateGlobalTransform(); // Update transform.
        const transform = this.global;
        if (this._renderDisplay === this._rawDisplay || this._renderDisplay === this._meshDisplay) {
            const x = transform.x - (this.globalTransformMatrix.a * this._pivotX + this.globalTransformMatrix.c * this._pivotY);
            const y = transform.y - (this.globalTransformMatrix.b * this._pivotX + this.globalTransformMatrix.d * this._pivotY);
            this._renderDisplay.setTransform(x, y, transform.scaleX * this._textureScale, transform.scaleY * this._textureScale, transform.rotation, transform.skew, 0.0);
        }
        else {
            this._renderDisplay.position.set(transform.x, transform.y);
            this._renderDisplay.rotation = transform.rotation;
            this._renderDisplay.skew.set(transform.skew, 0.0);
            this._renderDisplay.scale.set(transform.scaleX, transform.scaleY);
        }
    }
    _updateTransformV4() {
        this.updateGlobalTransform(); // Update transform.
        const transform = this.global;
        if (this._renderDisplay === this._rawDisplay || this._renderDisplay === this._meshDisplay) {
            const x = transform.x - (this.globalTransformMatrix.a * this._pivotX + this.globalTransformMatrix.c * this._pivotY);
            const y = transform.y - (this.globalTransformMatrix.b * this._pivotX + this.globalTransformMatrix.d * this._pivotY);
            this._renderDisplay.setTransform(x, y, transform.scaleX * this._textureScale, transform.scaleY * this._textureScale, transform.rotation, -transform.skew, 0.0);
        }
        else {
            this._renderDisplay.position.set(transform.x, transform.y);
            this._renderDisplay.rotation = transform.rotation;
            this._renderDisplay.skew.set(-transform.skew, 0.0);
            this._renderDisplay.scale.set(transform.scaleX, transform.scaleY);
        }
    }
    _identityTransform() {
        this._renderDisplay.setTransform(0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0);
    }
}
