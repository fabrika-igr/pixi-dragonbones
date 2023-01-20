"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseObject = void 0;
class BaseObject {
    constructor() {
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
        this.hashCode = BaseObject._hashCode++;
        this._isInPool = false;
    }
    static _returnObject(object) {
        const classType = String(object.constructor);
        const maxCount = classType in BaseObject._maxCountMap ? BaseObject._maxCountMap[classType] : BaseObject._defaultMaxCount;
        const pool = BaseObject._poolsMap[classType] = BaseObject._poolsMap[classType] || [];
        if (pool.length < maxCount) {
            if (!object._isInPool) {
                object._isInPool = true;
                pool.push(object);
            }
            else {
                console.warn("The object is already in the pool.");
            }
        }
        else {
        }
    }
    static toString() {
        throw new Error();
    }
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
    static setMaxCount(objectConstructor, maxCount) {
        if (maxCount < 0 || maxCount !== maxCount) { // isNaN
            maxCount = 0;
        }
        if (objectConstructor !== null) {
            const classType = String(objectConstructor);
            const pool = classType in BaseObject._poolsMap ? BaseObject._poolsMap[classType] : null;
            if (pool !== null && pool.length > maxCount) {
                pool.length = maxCount;
            }
            BaseObject._maxCountMap[classType] = maxCount;
        }
        else {
            BaseObject._defaultMaxCount = maxCount;
            for (let classType in BaseObject._poolsMap) {
                const pool = BaseObject._poolsMap[classType];
                if (pool.length > maxCount) {
                    pool.length = maxCount;
                }
                if (classType in BaseObject._maxCountMap) {
                    BaseObject._maxCountMap[classType] = maxCount;
                }
            }
        }
    }
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
    static clearPool(objectConstructor = null) {
        if (objectConstructor !== null) {
            const classType = String(objectConstructor);
            const pool = classType in BaseObject._poolsMap ? BaseObject._poolsMap[classType] : null;
            if (pool !== null && pool.length > 0) {
                pool.length = 0;
            }
        }
        else {
            for (let k in BaseObject._poolsMap) {
                const pool = BaseObject._poolsMap[k];
                pool.length = 0;
            }
        }
    }
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
    static borrowObject(objectConstructor) {
        const classType = String(objectConstructor);
        const pool = classType in BaseObject._poolsMap ? BaseObject._poolsMap[classType] : null;
        if (pool !== null && pool.length > 0) {
            const object = pool.pop();
            object._isInPool = false;
            return object;
        }
        const object = new objectConstructor();
        object._onClear();
        return object;
    }
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
    returnToPool() {
        this._onClear();
        BaseObject._returnObject(this);
    }
}
exports.BaseObject = BaseObject;
BaseObject._hashCode = 0;
BaseObject._defaultMaxCount = 3000;
BaseObject._maxCountMap = {};
BaseObject._poolsMap = {};
