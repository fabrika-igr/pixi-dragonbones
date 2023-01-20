import { BaseObject } from "../core/BaseObject";
import { AnimationBlendType, TimelineType } from "../core/DragonBones";
import { ArmatureData } from "./ArmatureData";
export declare class AnimationData extends BaseObject {
    static toString(): string;
    /**
     * @private
     */
    blendType: AnimationBlendType;
    /**
     * - The frame count of the animation.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 动画的帧数。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    frameCount: number;
    /**
     * - The play times of the animation. [0: Loop play, [1~N]: Play N times]
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 动画的播放次数。 [0: 无限循环播放, [1~N]: 循环播放 N 次]
     * @version DragonBones 3.0
     * @language zh_CN
     */
    playTimes: number;
    /**
     * - The duration of the animation. (In seconds)
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 动画的持续时间。 （以秒为单位）
     * @version DragonBones 3.0
     * @language zh_CN
     */
    duration: number;
    /**
     * @private
     */
    scale: number;
    /**
     * - The fade in time of the animation. (In seconds)
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 动画的淡入时间。 （以秒为单位）
     * @version DragonBones 3.0
     * @language zh_CN
     */
    fadeInTime: number;
    /**
     * @private
     */
    cacheFrameRate: number;
    /**
     * - The animation name.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 动画名称。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    name: string;
    /**
     * @private
     */
    readonly cachedFrames: Array<boolean>;
    /**
     * @private
     */
    readonly boneTimelines: Record<string, Array<TimelineData>>;
    /**
     * @private
     */
    readonly slotTimelines: Record<string, Array<TimelineData>>;
    /**
     * @private
     */
    readonly constraintTimelines: Record<string, Array<TimelineData>>;
    /**
     * @private
     */
    readonly animationTimelines: Record<string, Array<TimelineData>>;
    /**
     * @private
     */
    readonly boneCachedFrameIndices: Record<string, Array<number>>;
    /**
     * @private
     */
    readonly slotCachedFrameIndices: Record<string, Array<number>>;
    /**
     * @private
     */
    actionTimeline: TimelineData | null;
    /**
     * @private
     */
    zOrderTimeline: TimelineData | null;
    /**
     * @private
     */
    parent: ArmatureData;
    protected _onClear(): void;
    /**
     * @private
     */
    addBoneTimeline(timelineName: string, timeline: TimelineData): void;
    /**
     * @private
     */
    addSlotTimeline(timelineName: string, timeline: TimelineData): void;
    /**
     * @private
     */
    addConstraintTimeline(timelineName: string, timeline: TimelineData): void;
    /**
     * @private
     */
    addAnimationTimeline(timelineName: string, timeline: TimelineData): void;
    /**
     * @private
     */
    getBoneTimelines(timelineName: string): Array<TimelineData> | null;
    /**
     * @private
     */
    getSlotTimelines(timelineName: string): Array<TimelineData> | null;
    /**
     * @private
     */
    getConstraintTimelines(timelineName: string): Array<TimelineData> | null;
    /**
     * @private
     */
    getAnimationTimelines(timelineName: string): Array<TimelineData> | null;
    /**
     * @private
     */
    getBoneCachedFrameIndices(boneName: string): Array<number> | null;
    /**
     * @private
     */
    getSlotCachedFrameIndices(slotName: string): Array<number> | null;
}
/**
 * @private
 */
export declare class TimelineData extends BaseObject {
    static toString(): string;
    type: TimelineType;
    offset: number;
    frameIndicesOffset: number;
    protected _onClear(): void;
}
