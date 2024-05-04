import { getIndexByName, isNotLost, sumStringedNumberArray } from '../scripts/util.js'

/** 
 * @typedef {object} objectWithWeight 重さプロパティを持つ何らかのオブジェクト
 * @property {string} weight 重さ
 */

/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name 装備名
 */

/**
 * 
 * @param {*} weaponHistory 
 * @param {*} itemHistory 
 * @returns {string}
 */
export function getLoadCurrentValue(weaponHistory, itemHistory) {
    const weaponsWeight = getWeaponWeight(weaponHistory)
    const itemsWeight = getItemWeight(itemHistory)
    return (weaponsWeight + itemsWeight).toString(10)
}

/**
 * name が loadCurrent である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns {number}
 */
export function getLoadCurrentIndex(pcData) {
    return getIndexByName(pcData, 'loadCurrent')
}

export function getLoadLimitValue(pcData) {
    const strCurrentIndex = getIndexByName(pcData, 'strCurrent')
    if (strCurrentIndex > 0) {
        const item = pcData[strCurrentIndex]
        if (item.hasOwnProperty('value')) {
            const strCurrentString = item.value
            const strCurrentNumber = Math.trunc(strCurrentString)
            if (!strCurrentNumber.isNaN) {
                const loadLimitNumber = strCurrentNumber * 100
                return loadLimitNumber.toString(10)
            }
        }
    }
    return "0"

}

/**
 * name が loadLimit である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns {number}
 */
export function getLoadLimitIndex(pcData) {
    return getIndexByName(pcData, 'loadLimit')
}



/**
 * 
 * @param {*} itemHistory 
 * @returns {number}
 */
function getItemWeight(itemHistory) {
    const totalWeight = sumWeightFromObjectArray(itemHistory.getItems)
    return totalWeight
}

/**
 * 
 * @param {*} itemHistory 
 * @returns {number}
 */
function getWeaponWeight(weaponHistory) {
    const totalWeight = sumWeightFromObjectArray(weaponHistory.getItems)
    return totalWeight
}

/**
 * 
 * @param {Array<objectWithWeight>} items 名前を持つオブジェクト配列
 * @returns {number}
 */
function sumWeightFromObjectArray(items) {
    /** @type  {Array<string>} weights 重さ文字列の配列 */
    const weights = []
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (isNotLost(item)) {
            if (item.hasOwnProperty('weight')) {
                weights.push(item.weight)
            }
        }
    }
    /** 重さ文字列の配列の各要素を数値化して加算 */
    const totalWeight = sumStringedNumberArray(weights)
    return totalWeight
}

