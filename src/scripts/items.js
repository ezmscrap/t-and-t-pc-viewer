import { getIndexByName, isNotLost } from '../scripts/util.js'

/**
 * @typedef {object} itemInformation 装備情報
 * @property {string} name 道具名
 * @property {string} price 価格(gp)
 * @property {string} priceSp 価格(sp)
 * @property {string} priceCp 価格(cp)
 * @property {string} weight 重さ
 * @property {string} lost 喪失状況
 * @property {string} memo メモ欄
 */

/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name 道具名
 * @property {string} weight 重さ
 */

export const itemProperties = [
    { name: 'name', label: '道具名', size: 16 },
    { name: 'price', label: '価格(gp)', size: 2 },
    { name: 'priceSp', label: '価格(sp)', size: 2 },
    { name: 'priceCp', label: '価格(cp)', size: 2 },
    { name: 'weight', label: '重さ', size: 4 },
    { name: 'lost', label: '喪失状況', size: 8 },
    { name: 'memo', label: 'メモ欄', size: 16 },
]


export function createItem(name = '', price = '', priceSp = '', priceCp = '', weight = '', lost = '', memo = '') {
    const item = {
        name: name,
        price: price,
        priceSp: priceSp,
        priceCp: priceCp,
        weight: weight,
        lost: lost,
        memo: memo
    }
    return item
}

/**
 * 
 * @param {*} itemHistory 
 * @returns {string}
 */
export function getItemsValue(itemHistory) {
    const nameArray = getNamesFromObjectArray(itemHistory.getItems)
    return nameArray.join('、')
}


/**
 * 名前を持つオブジェクト配列から名前を取り出すして文字列の配列にして返す
 * 
 * @param {Array<objectWithName>} items 名前を持つオブジェクト配列
 * @returns {Array<string>} 名前文字列の配列
 */
function getNamesFromObjectArray(items) {
    /** @type  {Array<string>} names 名前文字列の配列 */
    const names = []
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (isNotLost(item)) {
            if (item.hasOwnProperty('name')) {
                names.push(item.name)
            }
        }
    }
    return names
}

/**
 * name が equipments である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns 
 */
export function getItemsIndex(pcData) {
    return getIndexByName(pcData, 'equipments')
}