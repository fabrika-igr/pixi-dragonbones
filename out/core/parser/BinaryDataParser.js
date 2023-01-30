import { BaseObject } from "../core/BaseObject";
import { AnimationData, AnimationTimelineData, TimelineData } from "../model/AnimationData";
import { WeightData } from "../model/DisplayData";
import { DataParser } from "./DataParser";
import { ObjectDataParser } from "./ObjectDataParser";
export class BinaryDataParser extends ObjectDataParser {
    _inRange(a, min, max) {
        return min <= a && a <= max;
    }
    _decodeUTF8(data) {
        const EOF_byte = -1;
        const EOF_code_point = -1;
        const FATAL_POINT = 0xFFFD;
        let pos = 0;
        let result = "";
        let code_point;
        let utf8_code_point = 0;
        let utf8_bytes_needed = 0;
        let utf8_bytes_seen = 0;
        let utf8_lower_boundary = 0;
        while (data.length > pos) {
            let _byte = data[pos++];
            if (_byte === EOF_byte) {
                if (utf8_bytes_needed !== 0) {
                    code_point = FATAL_POINT;
                }
                else {
                    code_point = EOF_code_point;
                }
            }
            else {
                if (utf8_bytes_needed === 0) {
                    if (this._inRange(_byte, 0x00, 0x7F)) {
                        code_point = _byte;
                    }
                    else {
                        if (this._inRange(_byte, 0xC2, 0xDF)) {
                            utf8_bytes_needed = 1;
                            utf8_lower_boundary = 0x80;
                            utf8_code_point = _byte - 0xC0;
                        }
                        else if (this._inRange(_byte, 0xE0, 0xEF)) {
                            utf8_bytes_needed = 2;
                            utf8_lower_boundary = 0x800;
                            utf8_code_point = _byte - 0xE0;
                        }
                        else if (this._inRange(_byte, 0xF0, 0xF4)) {
                            utf8_bytes_needed = 3;
                            utf8_lower_boundary = 0x10000;
                            utf8_code_point = _byte - 0xF0;
                        }
                        else {
                        }
                        utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                        code_point = null;
                    }
                }
                else if (!this._inRange(_byte, 0x80, 0xBF)) {
                    utf8_code_point = 0;
                    utf8_bytes_needed = 0;
                    utf8_bytes_seen = 0;
                    utf8_lower_boundary = 0;
                    pos--;
                    code_point = _byte;
                }
                else {
                    utf8_bytes_seen += 1;
                    utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                    if (utf8_bytes_seen !== utf8_bytes_needed) {
                        code_point = null;
                    }
                    else {
                        let cp = utf8_code_point;
                        let lower_boundary = utf8_lower_boundary;
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        if (this._inRange(cp, lower_boundary, 0x10FFFF) && !this._inRange(cp, 0xD800, 0xDFFF)) {
                            code_point = cp;
                        }
                        else {
                            code_point = _byte;
                        }
                    }
                }
            }
            //Decode string
            if (code_point !== null && code_point !== EOF_code_point) {
                if (code_point <= 0xFFFF) {
                    if (code_point > 0)
                        result += String.fromCharCode(code_point);
                }
                else {
                    code_point -= 0x10000;
                    result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                    result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                }
            }
        }
        return result;
    }
    _parseBinaryTimeline(type, offset, timelineData = null) {
        const timeline = timelineData !== null ? timelineData : BaseObject.borrowObject(TimelineData);
        timeline.type = type;
        timeline.offset = offset;
        this._timeline = timeline;
        const keyFrameCount = this._timelineArrayBuffer[timeline.offset + 2 /* BinaryOffset.TimelineKeyFrameCount */];
        if (keyFrameCount === 1) {
            timeline.frameIndicesOffset = -1;
        }
        else {
            let frameIndicesOffset = 0;
            const totalFrameCount = this._animation.frameCount + 1; // One more frame than animation.
            const frameIndices = this._data.frameIndices;
            frameIndicesOffset = frameIndices.length;
            frameIndices.length += totalFrameCount;
            timeline.frameIndicesOffset = frameIndicesOffset;
            for (let i = 0, iK = 0, frameStart = 0, frameCount = 0; i < totalFrameCount; ++i) {
                if (frameStart + frameCount <= i && iK < keyFrameCount) {
                    frameStart = this._frameArrayBuffer[this._animation.frameOffset + this._timelineArrayBuffer[timeline.offset + 5 /* BinaryOffset.TimelineFrameOffset */ + iK]];
                    if (iK === keyFrameCount - 1) {
                        frameCount = this._animation.frameCount - frameStart;
                    }
                    else {
                        frameCount = this._frameArrayBuffer[this._animation.frameOffset + this._timelineArrayBuffer[timeline.offset + 5 /* BinaryOffset.TimelineFrameOffset */ + iK + 1]] - frameStart;
                    }
                    iK++;
                }
                frameIndices[frameIndicesOffset + i] = iK - 1;
            }
        }
        this._timeline = null; //
        return timeline;
    }
    _parseAnimation(rawData) {
        const animation = BaseObject.borrowObject(AnimationData);
        animation.blendType = DataParser._getAnimationBlendType(ObjectDataParser._getString(rawData, DataParser.BLEND_TYPE, ""));
        animation.frameCount = ObjectDataParser._getNumber(rawData, DataParser.DURATION, 0);
        animation.playTimes = ObjectDataParser._getNumber(rawData, DataParser.PLAY_TIMES, 1);
        animation.duration = animation.frameCount / this._armature.frameRate; // float
        animation.fadeInTime = ObjectDataParser._getNumber(rawData, DataParser.FADE_IN_TIME, 0.0);
        animation.scale = ObjectDataParser._getNumber(rawData, DataParser.SCALE, 1.0);
        animation.name = ObjectDataParser._getString(rawData, DataParser.NAME, DataParser.DEFAULT_NAME);
        if (animation.name.length === 0) {
            animation.name = DataParser.DEFAULT_NAME;
        }
        // Offsets.
        const offsets = rawData[DataParser.OFFSET];
        animation.frameIntOffset = offsets[0];
        animation.frameFloatOffset = offsets[1];
        animation.frameOffset = offsets[2];
        this._animation = animation;
        if (DataParser.ACTION in rawData) {
            animation.actionTimeline = this._parseBinaryTimeline(0 /* TimelineType.Action */, rawData[DataParser.ACTION]);
        }
        if (DataParser.Z_ORDER in rawData) {
            animation.zOrderTimeline = this._parseBinaryTimeline(1 /* TimelineType.ZOrder */, rawData[DataParser.Z_ORDER]);
        }
        if (DataParser.BONE in rawData) {
            const rawTimeliness = rawData[DataParser.BONE];
            for (let k in rawTimeliness) {
                const rawTimelines = rawTimeliness[k];
                const bone = this._armature.getBone(k);
                if (bone === null) {
                    continue;
                }
                for (let i = 0, l = rawTimelines.length; i < l; i += 2) {
                    const timelineType = rawTimelines[i];
                    const timelineOffset = rawTimelines[i + 1];
                    const timeline = this._parseBinaryTimeline(timelineType, timelineOffset);
                    this._animation.addBoneTimeline(bone.name, timeline);
                }
            }
        }
        if (DataParser.SLOT in rawData) {
            const rawTimeliness = rawData[DataParser.SLOT];
            for (let k in rawTimeliness) {
                const rawTimelines = rawTimeliness[k];
                const slot = this._armature.getSlot(k);
                if (slot === null) {
                    continue;
                }
                for (let i = 0, l = rawTimelines.length; i < l; i += 2) {
                    const timelineType = rawTimelines[i];
                    const timelineOffset = rawTimelines[i + 1];
                    const timeline = this._parseBinaryTimeline(timelineType, timelineOffset);
                    this._animation.addSlotTimeline(slot.name, timeline);
                }
            }
        }
        if (DataParser.CONSTRAINT in rawData) {
            const rawTimeliness = rawData[DataParser.CONSTRAINT];
            for (let k in rawTimeliness) {
                const rawTimelines = rawTimeliness[k];
                const constraint = this._armature.getConstraint(k);
                if (constraint === null) {
                    continue;
                }
                for (let i = 0, l = rawTimelines.length; i < l; i += 2) {
                    const timelineType = rawTimelines[i];
                    const timelineOffset = rawTimelines[i + 1];
                    const timeline = this._parseBinaryTimeline(timelineType, timelineOffset);
                    this._animation.addConstraintTimeline(constraint.name, timeline);
                }
            }
        }
        if (DataParser.TIMELINE in rawData) {
            const rawTimelines = rawData[DataParser.TIMELINE];
            for (const rawTimeline of rawTimelines) {
                const timelineOffset = ObjectDataParser._getNumber(rawTimeline, DataParser.OFFSET, 0);
                if (timelineOffset >= 0) {
                    const timelineType = ObjectDataParser._getNumber(rawTimeline, DataParser.TYPE, 0 /* TimelineType.Action */);
                    const timelineName = ObjectDataParser._getString(rawTimeline, DataParser.NAME, "");
                    let timeline = null;
                    if (timelineType === 40 /* TimelineType.AnimationProgress */ && animation.blendType !== 0 /* AnimationBlendType.None */) {
                        timeline = BaseObject.borrowObject(AnimationTimelineData);
                        const animaitonTimeline = timeline;
                        animaitonTimeline.x = ObjectDataParser._getNumber(rawTimeline, DataParser.X, 0.0);
                        animaitonTimeline.y = ObjectDataParser._getNumber(rawTimeline, DataParser.Y, 0.0);
                    }
                    timeline = this._parseBinaryTimeline(timelineType, timelineOffset, timeline);
                    switch (timelineType) {
                        case 0 /* TimelineType.Action */:
                            // TODO
                            break;
                        case 1 /* TimelineType.ZOrder */:
                            // TODO
                            break;
                        case 11 /* TimelineType.BoneTranslate */:
                        case 12 /* TimelineType.BoneRotate */:
                        case 13 /* TimelineType.BoneScale */:
                        case 50 /* TimelineType.Surface */:
                        case 60 /* TimelineType.BoneAlpha */:
                            this._animation.addBoneTimeline(timelineName, timeline);
                            break;
                        case 20 /* TimelineType.SlotDisplay */:
                        case 21 /* TimelineType.SlotColor */:
                        case 22 /* TimelineType.SlotDeform */:
                        case 23 /* TimelineType.SlotZIndex */:
                        case 24 /* TimelineType.SlotAlpha */:
                            this._animation.addSlotTimeline(timelineName, timeline);
                            break;
                        case 30 /* TimelineType.IKConstraint */:
                            this._animation.addConstraintTimeline(timelineName, timeline);
                            break;
                        case 40 /* TimelineType.AnimationProgress */:
                        case 41 /* TimelineType.AnimationWeight */:
                        case 42 /* TimelineType.AnimationParameter */:
                            this._animation.addAnimationTimeline(timelineName, timeline);
                            break;
                    }
                }
            }
        }
        this._animation = null;
        return animation;
    }
    _parseGeometry(rawData, geometry) {
        geometry.offset = rawData[DataParser.OFFSET];
        geometry.data = this._data;
        let weightOffset = this._intArrayBuffer[geometry.offset + 3 /* BinaryOffset.GeometryWeightOffset */];
        if (weightOffset < -1) { // -1 is a special flag that there is no bones weight.
            weightOffset += 65536; // Fixed out of bounds bug. 
        }
        if (weightOffset >= 0) {
            const weight = BaseObject.borrowObject(WeightData);
            const vertexCount = this._intArrayBuffer[geometry.offset + 0 /* BinaryOffset.GeometryVertexCount */];
            const boneCount = this._intArrayBuffer[weightOffset + 0 /* BinaryOffset.WeigthBoneCount */];
            weight.offset = weightOffset;
            for (let i = 0; i < boneCount; ++i) {
                const boneIndex = this._intArrayBuffer[weightOffset + 2 /* BinaryOffset.WeigthBoneIndices */ + i];
                weight.addBone(this._rawBones[boneIndex]);
            }
            let boneIndicesOffset = weightOffset + 2 /* BinaryOffset.WeigthBoneIndices */ + boneCount;
            let weightCount = 0;
            for (let i = 0, l = vertexCount; i < l; ++i) {
                const vertexBoneCount = this._intArrayBuffer[boneIndicesOffset++];
                weightCount += vertexBoneCount;
                boneIndicesOffset += vertexBoneCount;
            }
            weight.count = weightCount;
            geometry.weight = weight;
        }
    }
    _parseArray(rawData) {
        const offsets = rawData[DataParser.OFFSET];
        const l1 = offsets[1];
        const l2 = offsets[3];
        const l3 = offsets[5];
        const l4 = offsets[7];
        const l5 = offsets[9];
        const l6 = offsets[11];
        const l7 = offsets.length > 12 ? offsets[13] : 0; // Color.
        const intArray = new Int16Array(this._binary, this._binaryOffset + offsets[0], l1 / Int16Array.BYTES_PER_ELEMENT);
        const floatArray = new Float32Array(this._binary, this._binaryOffset + offsets[2], l2 / Float32Array.BYTES_PER_ELEMENT);
        const frameIntArray = new Int16Array(this._binary, this._binaryOffset + offsets[4], l3 / Int16Array.BYTES_PER_ELEMENT);
        const frameFloatArray = new Float32Array(this._binary, this._binaryOffset + offsets[6], l4 / Float32Array.BYTES_PER_ELEMENT);
        const frameArray = new Int16Array(this._binary, this._binaryOffset + offsets[8], l5 / Int16Array.BYTES_PER_ELEMENT);
        const timelineArray = new Uint16Array(this._binary, this._binaryOffset + offsets[10], l6 / Uint16Array.BYTES_PER_ELEMENT);
        const colorArray = l7 > 0 ? new Int16Array(this._binary, this._binaryOffset + offsets[12], l7 / Uint16Array.BYTES_PER_ELEMENT) : intArray; // Color.
        this._data.binary = this._binary;
        this._data.intArray = this._intArrayBuffer = intArray;
        this._data.floatArray = floatArray;
        this._data.frameIntArray = frameIntArray;
        this._data.frameFloatArray = frameFloatArray;
        this._data.frameArray = this._frameArrayBuffer = frameArray;
        this._data.timelineArray = this._timelineArrayBuffer = timelineArray;
        this._data.colorArray = colorArray;
    }
    parseDragonBonesData(rawData, scale = 1) {
        console.assert(rawData !== null && rawData !== undefined && rawData instanceof ArrayBuffer, "Data error.");
        const tag = new Uint8Array(rawData, 0, 8);
        if (tag[0] !== "D".charCodeAt(0) ||
            tag[1] !== "B".charCodeAt(0) ||
            tag[2] !== "D".charCodeAt(0) ||
            tag[3] !== "T".charCodeAt(0)) {
            console.assert(false, "Nonsupport data.");
            return null;
        }
        const headerLength = new Uint32Array(rawData, 8, 1)[0];
        const headerBytes = new Uint8Array(rawData, 8 + 4, headerLength);
        const headerString = this._decodeUTF8(headerBytes);
        const header = JSON.parse(headerString);
        //
        this._binaryOffset = 8 + 4 + headerLength;
        this._binary = rawData;
        return super.parseDragonBonesData(header, scale);
    }
    /**
     * - Deprecated, please refer to {@link dragonBones.BaseFactory#parseDragonBonesData()}.
     * @deprecated
     * @language en_US
     */
    /**
     * - 已废弃，请参考 {@link dragonBones.BaseFactory#parseDragonBonesData()}。
     * @deprecated
     * @language zh_CN
     */
    static getInstance() {
        if (BinaryDataParser._binaryDataParserInstance === null) {
            BinaryDataParser._binaryDataParserInstance = new BinaryDataParser();
        }
        return BinaryDataParser._binaryDataParserInstance;
    }
}
BinaryDataParser._binaryDataParserInstance = null;
