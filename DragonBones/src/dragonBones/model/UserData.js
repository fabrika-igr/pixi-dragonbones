"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionData = exports.UserData = void 0;
const BaseObject_1 = require("../core/BaseObject");
class UserData extends BaseObject_1.BaseObject {
    constructor() {
        super(...arguments);
        /**
         * - The custom int numbers.
         * @version DragonBones 5.0
         * @language en_US
         */
        /**
         * - 自定义整数。
         * @version DragonBones 5.0
         * @language zh_CN
         */
        this.ints = [];
        /**
         * - The custom float numbers.
         * @version DragonBones 5.0
         * @language en_US
         */
        /**
         * - 自定义浮点数。
         * @version DragonBones 5.0
         * @language zh_CN
         */
        this.floats = [];
        /**
         * - The custom strings.
         * @version DragonBones 5.0
         * @language en_US
         */
        /**
         * - 自定义字符串。
         * @version DragonBones 5.0
         * @language zh_CN
         */
        this.strings = [];
    }
    static toString() {
        return "[class dragonBones.UserData]";
    }
    _onClear() {
        this.ints.length = 0;
        this.floats.length = 0;
        this.strings.length = 0;
    }
    /**
     * @internal
     */
    addInt(value) {
        this.ints.push(value);
    }
    /**
     * @internal
     */
    addFloat(value) {
        this.floats.push(value);
    }
    /**
     * @internal
     */
    addString(value) {
        this.strings.push(value);
    }
    /**
     * - Get the custom int number.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 获取自定义整数。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    getInt(index = 0) {
        return index >= 0 && index < this.ints.length ? this.ints[index] : 0;
    }
    /**
     * - Get the custom float number.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 获取自定义浮点数。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    getFloat(index = 0) {
        return index >= 0 && index < this.floats.length ? this.floats[index] : 0.0;
    }
    /**
     * - Get the custom string.
     * @version DragonBones 5.0
     * @language en_US
     */
    /**
     * - 获取自定义字符串。
     * @version DragonBones 5.0
     * @language zh_CN
     */
    getString(index = 0) {
        return index >= 0 && index < this.strings.length ? this.strings[index] : "";
    }
}
exports.UserData = UserData;
/**
 * @private
 */
class ActionData extends BaseObject_1.BaseObject {
    constructor() {
        super(...arguments);
        this.data = null; //
    }
    static toString() {
        return "[class dragonBones.ActionData]";
    }
    _onClear() {
        if (this.data !== null) {
            this.data.returnToPool();
        }
        this.type = 0 /* Play */;
        this.name = "";
        this.bone = null;
        this.slot = null;
        this.data = null;
    }
}
exports.ActionData = ActionData;
