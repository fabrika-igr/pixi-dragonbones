import { WorldClock } from "../animation/WorldClock";
import { EventObject } from "../event/EventObject";
/**
 * @private
 */
export class DragonBones {
    constructor(eventManager) {
        this._clock = new WorldClock();
        this._events = [];
        this._objects = [];
        this._eventManager = null;
        this._eventManager = eventManager;
        console.info(`DragonBones: ${DragonBones.VERSION}\nWebsite: http://dragonbones.com/\nSource and Demo: https://github.com/DragonBones/`);
    }
    advanceTime(passedTime) {
        if (this._objects.length > 0) {
            for (const object of this._objects) {
                object.returnToPool();
            }
            this._objects.length = 0;
        }
        this._clock.advanceTime(passedTime);
        if (this._events.length > 0) {
            for (let i = 0; i < this._events.length; ++i) {
                const eventObject = this._events[i];
                const armature = eventObject.armature;
                if (armature._armatureData !== null) { // May be armature disposed before advanceTime.
                    armature.eventDispatcher.dispatchDBEvent(eventObject.type, eventObject);
                    if (eventObject.type === EventObject.SOUND_EVENT) {
                        this._eventManager.dispatchDBEvent(eventObject.type, eventObject);
                    }
                }
                this.bufferObject(eventObject);
            }
            this._events.length = 0;
        }
    }
    bufferEvent(value) {
        if (this._events.indexOf(value) < 0) {
            this._events.push(value);
        }
    }
    bufferObject(object) {
        if (this._objects.indexOf(object) < 0) {
            this._objects.push(object);
        }
    }
    get clock() {
        return this._clock;
    }
    get eventManager() {
        return this._eventManager;
    }
}
DragonBones.VERSION = "5.7.000";
DragonBones.yDown = true;
DragonBones.debug = false;
DragonBones.debugDraw = false;
//
if (!console.warn) {
    console.warn = function () { };
}
if (!console.assert) {
    console.assert = function () { };
}
//
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}
//
if (typeof global === "undefined" && typeof window !== "undefined") {
    var global = window;
}
