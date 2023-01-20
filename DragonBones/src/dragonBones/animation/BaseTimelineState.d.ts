import { Armature } from "../armature/Armature";
import { BaseObject } from "../core/BaseObject";
import { AnimationData, TimelineData } from "../model/AnimationData";
import { AnimationState } from "./AnimationState";
export declare abstract class TimelineState extends BaseObject {
    dirty: boolean;
    /**
     * -1: start, 0: play, 1: complete;
     */
    playState: number;
    currentPlayTimes: number;
    currentTime: number;
    target: BaseObject;
    protected _isTween: boolean;
    protected _valueOffset: number;
    protected _frameValueOffset: number;
    protected _frameOffset: number;
    protected _frameRate: number;
    protected _frameCount: number;
    protected _frameIndex: number;
    protected _frameRateR: number;
    protected _position: number;
    protected _duration: number;
    protected _timeScale: number;
    protected _timeOffset: number;
    protected _animationData: AnimationData;
    protected _timelineData: TimelineData | null;
    protected _armature: Armature;
    protected _animationState: AnimationState;
    protected _actionTimeline: TimelineState;
    protected _timelineArray: Array<number> | Uint16Array;
    protected _frameArray: Array<number> | Int16Array;
    protected _valueArray: Array<number> | Int16Array | Float32Array;
    protected _frameIndices: Array<number>;
    protected _onClear(): void;
    protected abstract _onArriveAtFrame(): void;
    protected abstract _onUpdateFrame(): void;
    protected _setCurrentTime(passedTime: number): boolean;
    init(armature: Armature, animationState: AnimationState, timelineData: TimelineData | null): void;
    fadeOut(): void;
    update(passedTime: number): void;
    blend(_isDirty: boolean): void;
}
