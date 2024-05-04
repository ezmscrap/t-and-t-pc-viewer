import { getIndexByName, isNotLost } from '../scripts/util.js'

/**
 * @typedef {object} weaponInformation 装備情報
 * @property {string} name 装備名
 * @property {string} type 装備種別["weapon"|"armor"]
 * @property {string} dice ダイス修正
 * @property {string} armorValue 防御点
 * @property {string} needStr 必要体力度
 * @property {string} needDex 必要器用度
 * @property {string} decreaseDex 器用度減少
 * @property {string} price 価格(gp)
 * @property {string} weight 重さ
 * @property {string} equipments 装備状況
 * @property {string} lost 喪失状況
 * @property {string} memo メモ欄
 */

/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name 装備名
 */


export const weaponProperties = [
    { name: 'name', label: '装備名', size: 16 },
    { name: 'type', label: '装備種別', size: 8 },
    { name: 'dice', label: 'ダイス修正', size: 4 },
    { name: 'armorValue', label: '防御点', size: 2 },
    { name: 'needStr', label: '必要体力度', size: 2 },
    { name: 'needDex', label: '必要器用度', size: 2 },
    { name: 'decreaseDex', label: '器用度減少', size: 2 },
    { name: 'price', label: '価格(gp)', size: 2 },
    { name: 'weight', label: '重さ', size: 4 },
    { name: 'equipments', label: '装備状況', size: 8 },
    { name: 'lost', label: '喪失状況', size: 8 },
    { name: 'memo', label: 'メモ欄', size: 16 },
]

/**
 * 新しい装備情報欄を作成 * 
 * 
 * @param {string} name 装備名
 * @param {string} type 装備種別["weapon"|"armor"]
 * @property {string} dice ダイス修正
 * @property {string} armorValue 防御点
 * @param {string} needStr 必要体力度
 * @param {string} needDex 必要器用度
 * @param {string} decreaseDex 器用度減少
 * @param {string} price 価格(gp)
 * @param {string} weight 重さ
 * @param {string} equipments 装備状況
 * @property {string} lost 喪失状況
 * @param {string} memo メモ欄
 * @returns {weaponInformation} item 装備情報情報
 */
export function createWeapon(name = '', type = '', dice = '', armorValue = '', needStr = '', needDex = '', decreaseDex = '', price = '', weight = '', equipments = '', lost = '', memo = '') {
    const item = {
        name: name,
        type: type,
        dice: dice,
        armorValue: armorValue,
        needStr: needStr,
        needDex: needDex,
        decreaseDex: decreaseDex,
        price: price,
        weight: weight,
        equipments: equipments,
        lost: lost,
        memo: memo
    }
    return item
}

export function getWeaponsValue(weaponHistory) {
    const getItems = weaponHistory.getItems
    const nameArray = getNamesFromObjectArray(getItems)
    return nameArray.join('、')
}

/**
 * name が weapons である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns 
 */
export function getWeaponsIndex(pcData) {
    return getIndexByName(pcData, 'weapons')
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
                const nameWithProps = getNameWithProps(item)
                if (nameWithProps) {
                    names.push(nameWithProps)
                }
            }
        }
    }
    return names
}

/**
 * 
 * @param {weaponInformation} item 装備情報
 * @returns {string} 説明付き装備名の文字列
 */
function getNameWithProps(item) {
    const isDice = getIsDice(item)
    const isArmorValue = getIsArmorValue(item)

    /** dice あり armorValue あり なら、 (ダイス修正:xxx/防御点:xxx) */
    if (isDice && isArmorValue) {
        return [
            item.name, '(ダイス修正:', item.dice, '/防御点:', item.armorValue, ')'
        ].join('')
    }

    /** dice あり armorValue なし なら、 (ダイス修正:xxx) */
    if (isDice) {
        return [
            item.name, '(ダイス修正:', item.dice, ')'
        ].join('')
    }

    /** dice なし armorValue あり なら、 (ダイス修正:xxx) */
    if (isArmorValue) {
        return [
            item.name, '(防御点:', item.armorValue, ')'
        ].join('')
    }
    return item.name

}

function getIsDice(item) {
    if (item.hasOwnProperty('dice')) {
        if (item.dice.length > 0) {
            return true
        }
    }
    return false
}

function getIsArmorValue(item) {
    if (item.hasOwnProperty('armorValue')) {
        if (item.armorValue.length > 0) {
            return true
        }
    }
    return false
}
