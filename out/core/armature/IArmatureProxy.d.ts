import { IEventDispatcher } from "../event/IEventDispatcher";
import { Armature } from "./Armature";
import { Animation } from "../animation/Animation";
export interface IArmatureProxy extends IEventDispatcher {
    /**
     * @internal
     */
    dbInit(armature: Armature): void;
    /**
     * @internal
     */
    dbClear(): void;
    /**
     * @internal
     */
    dbUpdate(): void;
    /**
     * - Dispose the instance and the Armature instance. (The Armature instance will return to the object pool)
     * @example
     * <pre>
     *     removeChild(armatureDisplay);
     *     armatureDisplay.dispose();
     * </pre>
     * @version DragonBones 4.5
     * @language en_US
     */
    /**
     * - 释放该实例和骨架。 （骨架会回收到对象池）
     * @example
     * <pre>
     *     removeChild(armatureDisplay);
     *     armatureDisplay.dispose();
     * </pre>
     * @version DragonBones 4.5
     * @language zh_CN
     */
    dispose(disposeProxy: boolean): void;
    /**
     * - The armature.
     * @version DragonBones 4.5
     * @language en_US
     */
    /**
     * - 骨架。
     * @version DragonBones 4.5
     * @language zh_CN
     */
    readonly armature: Armature;
    /**
     * - The animation player.
     * @version DragonBones 3.0
     * @language en_US
     */
    /**
     * - 动画播放器。
     * @version DragonBones 3.0
     * @language zh_CN
     */
    readonly animation: Animation;
}
