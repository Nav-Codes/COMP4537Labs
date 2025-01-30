const format = require('util');
const userMsg = require("../messages/lang/en/user")
exports.NameAndDatetime = class {
    static #getDate() {
        return new Date().toString()
    }

    static getNameAndDate(name) {
        return format.format(userMsg.nameAndDate, name, this.#getDate())
    }
}