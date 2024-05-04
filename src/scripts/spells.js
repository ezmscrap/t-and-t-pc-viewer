import { getIndexByName } from '../scripts/util.js'

/**
 * @typedef {object} talentInformation 呪文情報
 * @property {string} name 呪文名
 * @property {string} level レベル
 * @property {string} duration 持続時間
 * @property {string} consumption 魔力度消費量
 * @property {string} distance 距離
 * @property {string} range 効果範囲
 * @property {string} memo メモ欄
 */

/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name 装備名
 */

export const spellProperties = [
    { name: 'name', label: '呪文名', size: 16 },
    { name: 'level', label: 'レベル', size: 2 },
    { name: 'duration', label: '持続時間', size: 8 },
    { name: 'consumption', label: '魔力度消費量', size: 2 },
    { name: 'distance', label: '距離', size: 8 },
    { name: 'range', label: '効果範囲', size: 8 },
    { name: 'memo', label: 'メモ欄', size: 16 },
]

export function createSpell(name = '', rank = '', savingRoleBonus = '', memo = '') {
    const item = {
        name: name,
        rank: rank,
        savingRoleBonus: savingRoleBonus,
        memo: memo
    }
    return item
}

/**
 * name が spells である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns 
 */
export function getSpellsIndex(pcData) {
    return getIndexByName(pcData, 'spells')
}

export function getSpellsValue(SpellData) {
    const nameArray = getNames(SpellData.getItems)
    return nameArray.join('、')
}

function getNames(items) {
    /** @type  {Array<string>} names 名前文字列の配列 */
    const names = []
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (isSpell(item)) {
            if (item.name) {
                names.push(getStringToDisplay(item))
            }
        }
    }
    return names
}


function isSpell(item) {
    const isName = item.hasOwnProperty('name')
    const isLevel = item.hasOwnProperty('level')
    if (isName && isLevel) {
        return true
    }
    return false
}

function getStringToDisplay(item) {
    const name = item.name
    const level = item.level
    return [name, '(レベル', level, ')'].join('')

}