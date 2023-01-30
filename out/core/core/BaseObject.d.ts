export declare abstract class BaseObject {
    private static _hashCode;
    private static _defaultMaxCount;
    private static readonly _maxCountMap;
    private static readonly _poolsMap;
    private static _returnObject;
    static toString(): string;
    /**
     * - Set the maximum cache count of the specify object pool.
     * @param objectConstructor - The specify class. (Set all object pools max cache count if not set)
     * @param maxCount - Max count.
     * @version DragonBones 4.5
     * @language en_US
     */
    /**
     * - 设置特定对象池的最大缓存数量。
     * @param objectConstructor - 特定的类。 (不设置则设置所有对象池的最大缓存数量)
     * @param maxCount - 最大缓存数量。
     * @version DragonBones 4.5
     * @language zh_CN
     */
    static setMaxCount(objectConstructor: (typeof BaseObject) | null, maxCount: number): void;
    /**
     * - Clear the cached instances of a specify object pool.
     * @param objectConstructor - Specify class. (Clear all cached instances if not set)
     * @version DragonBones 4.5
     * @language en_US
     */
    /**
     * - 清除特定对象池的缓存实例。
     * @param objectConstructor - 特定的类。 (不设置则清除所有缓存的实例)
     * @version DragonBones 4.5
     * @language zh_CN
     */
    static clearPool(objectConstructor?: (typeof BaseObject) | null): void;
    /**
     * - Get an instance of the specify class from object pool.
     * @param objectConstructor - The specify class.
     * @version DragonBones 4.5
     * @language en_US
     */
    /**
     * - 从对象池中获取特定类的实例。
     * @param objectConstructor - 特定的类。
     * @version DragonBones 4.5
     * @language zh_CN
     */
    static borrowObject<T extends BaseObject>(objectConstructor: {
        new (): T;
    }): T;
    /**
     * - A unique identification number assigned to the object.
     * @version DragonBones 4.5
     * @language en_US
     */
    /**
     * - 分配给此实例的唯一标识号。
     * @version DragonBones 4.5
     * @language zh_CN
     */
    readonly hashCode: number;
    private _isInPool;
    protected abstract _onClear(): void;
    /**
     * - Clear the object and return it back to object pool。
     * @version DragonBones 4.5
     * @language en_US
     */
    /**
     * - 清除该实例的所有数据并将其返还对象池。
     * @version DragonBones 4.5
     * @language zh_CN
     */
    returnToPool(): void;
}
