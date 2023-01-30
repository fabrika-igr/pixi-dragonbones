import { BaseObject } from "../core/BaseObject";
export declare class CanvasData extends BaseObject {
    static toString(): string;
    hasBackground: boolean;
    color: number;
    x: number;
    y: number;
    width: number;
    height: number;
    protected _onClear(): void;
}
