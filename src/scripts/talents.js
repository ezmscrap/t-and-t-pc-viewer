import { getIndexByName } from '../scripts/util.js'

/**
 * @typedef {object} talentInformation タレント情報
 * @property {string} name タレント名
 * @property {string} rank タレントのランク["新米"|"弟子"|"一人前"|"師範"]
 * @property {string} savingRoleBonus セービングスロー修正
 * @property {string} memo メモ欄
 */

/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name 装備名
 */

export const talentProperties = [
    { name: 'name', label: 'タレント名', size: 16 },
    { name: 'rank', label: 'ランク', size: 4 },
    { name: 'savingRoleBonus', label: 'セービングスロー修正', size: 4 },
    { name: 'memo', label: 'メモ欄', size: 16 },
]

/**
 * name が talents である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns 
 */
export function getTalentsIndex(pcData) {
    return getIndexByName(pcData, 'talents')
}

export function getTalentsValue(talentData) {
    const nameArray = getNames(talentData.getItems)
    return nameArray.join('、')
}

export function createTalent(name = '', rank = '', savingRoleBonus = '', memo = '') {
    const item = {
        name: name,
        rank: rank,
        savingRoleBonus: savingRoleBonus,
        memo: memo
    }
    return item
}

/**
 * タレント情報配列から名前とセービングスロー修正を取り出すして文字列の配列にして返す
 * 
 * @param {Array<talentInformation>} items タレント情報配列
 * @returns {Array<string>} 名前文字列の配列
 */
function getNames(items) {
    /** @type  {Array<string>} names 名前文字列の配列 */
    const names = []
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (isTalent(item)) {
            if (item.name) {
                names.push(getStringToDisplay(item))
            }
        }
    }
    return names
}

function isTalent(item) {
    const isName = item.hasOwnProperty('name')
    const isSavingRoleBonus = item.hasOwnProperty('savingRoleBonus')
    if (isName && isSavingRoleBonus) {
        return true
    }
    return false
}

function getStringToDisplay(item) {
    const name = item.name
    const savingRoleBonus = item.savingRoleBonus
    return [name, '(', savingRoleBonus, ')'].join('')
}