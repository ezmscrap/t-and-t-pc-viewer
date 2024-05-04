/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name 装備名
 */

/**
 * 
 * @param {Array<objectWithName>} arrayOfObjectWithName 名前プロパティを持つ何らかのオブジェクトの配列
 * @param {string} targetName 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns {number}
 */
export function getIndexByName(arrayOfObjectWithName, targetName) {
    for (let index = 0; index < arrayOfObjectWithName.length; index++) {
        const item = arrayOfObjectWithName[index]
        if (typeof item == 'object') {
            if (item.hasOwnProperty('name')) {
                if (item.name == targetName) {
                    return index
                }
            }
        }
    }
    return -1
}

/**
 * 武器あるいは装備をまだ持っているか判定
 * 武器あるいは装備に 喪失情報 が true になっていれば喪失したと扱い、 false(なくした)、さもなければtrue(なくしてない)
 * 
 * @param {*} item 
 * @returns 
 */
export function isNotLost(item) {
    if (item.hasOwnProperty('lost')) {
        if (item.lost == "true") {
            return false
        }
    }
    return true
}

/**
 * 文字列の配列の各要素を数値化して加算
 * 
 * @param {Array<string>} items 文字列配列
 * @returns {number}
 */
export function sumStringedNumberArray(items) {
    let totalWeight = 0
    for (let index = 0; index < items.length; index++) {
        const weightString = items[index]
        const weight = Math.trunc(weightString)
        if (!weight.isNaN) {
            totalWeight += weight
        }
    }
    return totalWeight
}
