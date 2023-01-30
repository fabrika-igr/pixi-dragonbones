import * as PIXI from "pixi.js";
import { Armature } from "../core/armature/Armature";
import { IArmatureProxy } from "../core/armature/IArmatureProxy";
import { EventObject } from "../core/event/EventObject";
import { EventStringType } from "../core/event/IEventDispatcher";
import { Animation } from "../core/Animation/Animation";
export declare class PixiArmatureDisplay extends PIXI.Sprite implements IArmatureProxy {
    /**
     * @private
     */
    debugDraw: boolean;
    private _debugDraw;
    private _armature;
    private _debugDrawer;
    /**
     * @inheritDoc
     */
    dbInit(armature: Armature): void;
    /**
     * @inheritDoc
     */
    dbClear(): void;
    /**
     * @inheritDoc
     */
    dbUpdate(): void;
    /**
     * @inheritDoc
     */
    dispose(disposeProxy?: boolean): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * @private
     */
    dispatchDBEvent(type: EventStringType, eventObject: EventObject): void;
    /**
     * @inheritDoc
     */
    hasDBEventListener(type: EventStringType): boolean;
    /**
     * @inheritDoc
     */
    addDBEventListener(type: EventStringType, listener: (event: EventObject) => void, target: any): void;
    /**
     * @inheritDoc
     */
    removeDBEventListener(type: EventStringType, listener: (event: EventObject) => void, target: any): void;
    /**
     * @inheritDoc
     */
    get armature(): Armature;
    /**
     * @inheritDoc
     */
    get animation(): Animation;
}
