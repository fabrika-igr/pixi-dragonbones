"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventObject = void 0;
const BaseObject_1 = require("../core/BaseObject");
class EventObject extends BaseObject_1.BaseObject {
    /**
     * @internal
     * @private
     */
    static actionDataToInstance(data, instance, armature) {
        if (data.type === 0 /* Play */) {
            instance.type = EventObject.FRAME_EVENT;
        }
        else {
            instance.type = data.type === 10 /* Frame */ ? EventObject.FRAME_EVENT : EventObject.SOUND_EVENT;
        }
        instance.name = data.name;
        instance.armature = armature;
        instance.actionData = data;
        instance.data = data.data;
        if (data.bone !== null) {
            instance.bone = armature.getBone(data.bone.name);
        }
        if (data.slot !== null) {
            instance.slot = armature.getSlot(data.slot.name);
        }
    }
    static toString() {
        return "[class dragonBones.EventObject]";
    }
    _onClear() {
        this.time = 0.0;
        this.type = "";
        this.name = "";
        this.armature = null;
        this.bone = null;
        this.slot = null;
        this.animationState = null;
        this.actionData = null;
        this.data = null;
    }
}
exports.EventObject = EventObject;
/**
 * - Animation start play.
 * @version DragonBones 4.5
 * @language en_US
 */
/**
 * - 动画开始播放。
 * @version DragonBones 4.5
 * @language zh_CN
 */
EventObject.START = "start";
/**
 * - Animation loop play complete once.
 * @version DragonBones 4.5
 * @language en_US
 */
/**
 * - 动画循环播放完成一次。
 * @version DragonBones 4.5
 * @language zh_CN
 */
EventObject.LOOP_COMPLETE = "loopComplete";
/**
 * - Animation play complete.
 * @version DragonBones 4.5
 * @language en_US
 */
/**
 * - 动画播放完成。
 * @version DragonBones 4.5
 * @language zh_CN
 */
EventObject.COMPLETE = "complete";
/**
 * - Animation fade in start.
 * @version DragonBones 4.5
 * @language en_US
 */
/**
 * - 动画淡入开始。
 * @version DragonBones 4.5
 * @language zh_CN
 */
EventObject.FADE_IN = "fadeIn";
/**
 * - Animation fade in complete.
 * @version DragonBones 4.5
 * @language en_US
 */
/**
 * - 动画淡入完成。
 * @version DragonBones 4.5
 * @language zh_CN
 */
EventObject.FADE_IN_COMPLETE = "fadeInComplete";
/**
 * - Animation fade out start.
 * @version DragonBones 4.5
 * @language en_US
 */
/**
 * - 动画淡出开始。
 * @version DragonBones 4.5
 * @language zh_CN
 */
EventObject.FADE_OUT = "fadeOut";
/**
 * - Animation fade out complete.
 * @version DragonBones 4.5
 * @language en_US
 */
/**
 * - 动画淡出完成。
 * @version DragonBones 4.5
 * @language zh_CN
 */
EventObject.FADE_OUT_COMPLETE = "fadeOutComplete";
/**
 * - Animation frame event.
 * @version DragonBones 4.5
 * @language en_US
 */
/**
 * - 动画帧事件。
 * @version DragonBones 4.5
 * @language zh_CN
 */
EventObject.FRAME_EVENT = "frameEvent";
/**
 * - Animation frame sound event.
 * @version DragonBones 4.5
 * @language en_US
 */
/**
 * - 动画帧声音事件。
 * @version DragonBones 4.5
 * @language zh_CN
 */
EventObject.SOUND_EVENT = "soundEvent";
