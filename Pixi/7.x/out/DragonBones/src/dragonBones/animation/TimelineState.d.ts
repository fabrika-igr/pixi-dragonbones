import { Armature } from "../armature/Armature";
import { DisplayFrame } from "../armature/Slot";
import { TimelineData } from "../model/AnimationData";
import { AnimationState } from "./AnimationState";
import { DoubleValueTimelineState, MutilpleValueTimelineState, SingleValueTimelineState, TimelineState, TweenTimelineState } from "./BaseTimelineState";
export declare class ActionTimelineState extends TimelineState {
    static toString(): string;
    private _onCrossFrame;
    protected _onArriveAtFrame(): void;
    protected _onUpdateFrame(): void;
    update(passedTime: number): void;
    setCurrentTime(value: number): void;
}
/**
 * @internal
 */
export declare class ZOrderTimelineState extends TimelineState {
    static toString(): string;
    protected _onArriveAtFrame(): void;
    protected _onUpdateFrame(): void;
}
/**
 * @internal
 */
export declare class BoneAllTimelineState extends MutilpleValueTimelineState {
    static toString(): string;
    protected _onArriveAtFrame(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
    fadeOut(): void;
    blend(isDirty: boolean): void;
}
/**
 * @internal
 */
export declare class BoneTranslateTimelineState extends DoubleValueTimelineState {
    static toString(): string;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
    blend(isDirty: boolean): void;
}
/**
 * @internal
 */
export declare class BoneRotateTimelineState extends DoubleValueTimelineState {
    static toString(): string;
    protected _onArriveAtFrame(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
    fadeOut(): void;
    blend(isDirty: boolean): void;
}
/**
 * @internal
 */
export declare class BoneScaleTimelineState extends DoubleValueTimelineState {
    static toString(): string;
    protected _onArriveAtFrame(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
    blend(isDirty: boolean): void;
}
/**
 * @internal
 */
export declare class SurfaceTimelineState extends MutilpleValueTimelineState {
    static toString(): string;
    private _deformCount;
    private _deformOffset;
    private _sameValueOffset;
    protected _onClear(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
    blend(isDirty: boolean): void;
}
/**
 * @internal
 */
export declare class AlphaTimelineState extends SingleValueTimelineState {
    static toString(): string;
    protected _onArriveAtFrame(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
    blend(isDirty: boolean): void;
}
/**
 * @internal
 */
export declare class SlotDisplayTimelineState extends TimelineState {
    static toString(): string;
    protected _onArriveAtFrame(): void;
    protected _onUpdateFrame(): void;
}
/**
 * @internal
 */
export declare class SlotColorTimelineState extends TweenTimelineState {
    static toString(): string;
    private readonly _current;
    private readonly _difference;
    private readonly _result;
    protected _onArriveAtFrame(): void;
    protected _onUpdateFrame(): void;
    fadeOut(): void;
    update(passedTime: number): void;
}
/**
 * @internal
 */
export declare class SlotZIndexTimelineState extends SingleValueTimelineState {
    static toString(): string;
    protected _onArriveAtFrame(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
    blend(isDirty: boolean): void;
}
/**
 * @internal
 */
export declare class DeformTimelineState extends MutilpleValueTimelineState {
    static toString(): string;
    displayFrame: DisplayFrame;
    private _deformCount;
    private _deformOffset;
    private _sameValueOffset;
    protected _onClear(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
    blend(isDirty: boolean): void;
}
/**
 * @internal
 */
export declare class IKConstraintTimelineState extends DoubleValueTimelineState {
    static toString(): string;
    protected _onUpdateFrame(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
}
/**
 * @internal
 */
export declare class AnimationProgressTimelineState extends SingleValueTimelineState {
    static toString(): string;
    protected _onUpdateFrame(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
}
/**
 * @internal
 */
export declare class AnimationWeightTimelineState extends SingleValueTimelineState {
    static toString(): string;
    protected _onUpdateFrame(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
}
/**
 * @internal
 */
export declare class AnimationParametersTimelineState extends DoubleValueTimelineState {
    static toString(): string;
    protected _onUpdateFrame(): void;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
}
