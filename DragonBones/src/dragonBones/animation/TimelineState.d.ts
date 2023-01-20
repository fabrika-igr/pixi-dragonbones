import { TimelineState } from "./BaseTimelineState";
export declare class ActionTimelineState extends TimelineState {
    static toString(): string;
    private _onCrossFrame;
    protected _onArriveAtFrame(): void;
    protected _onUpdateFrame(): void;
    update(passedTime: number): void;
    setCurrentTime(value: number): void;
}
