import { BaseObject } from "../core/BaseObject";
export class AnimationConfig extends BaseObject {
    constructor() {
        super(...arguments);
        /**
         * @private
         */
        this.boneMask = [];
    }
    static toString() {
        return "[class dragonBones.AnimationConfig]";
    }
    _onClear() {
        this.pauseFadeOut = true;
        this.fadeOutMode = 4 /* All */;
        this.fadeOutTweenType = 1 /* Line */;
        this.fadeOutTime = -1.0;
        this.actionEnabled = true;
        this.additive = false;
        this.displayControl = true;
        this.pauseFadeIn = true;
        this.resetToPose = true;
        this.fadeInTweenType = 1 /* Line */;
        this.playTimes = -1;
        this.layer = 0;
        this.position = 0.0;
        this.duration = -1.0;
        this.timeScale = -100.0;
        this.weight = 1.0;
        this.fadeInTime = -1.0;
        this.autoFadeOutTime = -1.0;
        this.name = "";
        this.animation = "";
        this.group = "";
        this.boneMask.length = 0;
    }
    /**
     * @private
     */
    clear() {
        this._onClear();
    }
    /**
     * @private
     */
    copyFrom(value) {
        this.pauseFadeOut = value.pauseFadeOut;
        this.fadeOutMode = value.fadeOutMode;
        this.autoFadeOutTime = value.autoFadeOutTime;
        this.fadeOutTweenType = value.fadeOutTweenType;
        this.actionEnabled = value.actionEnabled;
        this.additive = value.additive;
        this.displayControl = value.displayControl;
        this.pauseFadeIn = value.pauseFadeIn;
        this.resetToPose = value.resetToPose;
        this.playTimes = value.playTimes;
        this.layer = value.layer;
        this.position = value.position;
        this.duration = value.duration;
        this.timeScale = value.timeScale;
        this.fadeInTime = value.fadeInTime;
        this.fadeOutTime = value.fadeOutTime;
        this.fadeInTweenType = value.fadeInTweenType;
        this.weight = value.weight;
        this.name = value.name;
        this.animation = value.animation;
        this.group = value.group;
        this.boneMask.length = value.boneMask.length;
        for (let i = 0, l = this.boneMask.length; i < l; ++i) {
            this.boneMask[i] = value.boneMask[i];
        }
    }
}
