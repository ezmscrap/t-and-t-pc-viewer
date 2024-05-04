import { getIndexByName, sumStringedNumberArray } from './util.js'

/**
 * @typedef {object} adventurePointInformation 冒険点情報
 * @property {string} deposit 入手した冒険点
 * @property {string} withdraw 消費した冒険点
 * @property {string} memo メモ欄
 */

/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name 装備名
 */

export const adventurePointInformationProperties = [
    { name: 'deposit', label: '入手冒険点', size: 4 },
    { name: 'withdraw', label: '消費冒険点', size: 4 },
    { name: 'memo', label: 'メモ欄', size: 16 },
]

/**
 * 新しい冒険点情報欄を作成 
 * 
 * @property {string} deposit 入手した冒険点
 * @property {string} withdraw 消費した冒険点
 * @param {string} memo メモ欄
 * @returns {moneyInformation} item 冒険点情報
 */
export function createAdventurePointInformation(deposit = '', withdraw = '', memo = '') {
    const item = {
        deposit: deposit,
        withdraw: withdraw,
        memo: memo
    }
    return item
}

/**
 * 冒険点の表示値を取得する
 * 
 * @param {*} adventurePointInformationData 冒険点情報の配列を含むオブジェクト
 * @returns {string} 決算収支を計算した冒険点
 */
export function getAdventurePointsValue(adventurePointInformationData) {
    const items = adventurePointInformationData.getItems
    
    const deposits = getSumByKey(items, 'deposit')
    const withdraws = getSumByKey(items, 'withdraw')
    
    const adventurePointInformation = deposits - withdraws

    return adventurePointInformation.toString(10)
}

/**
 * 3種の値段を持つオブジェクトの配列の指定したキーについて、数値化して合計する
 * 
 * @param {Array<adventurePointInformation>} items 経験値情報オブジェクト
 * @param {string} key 集計するキー
 * @returns {number} 合計値
 */
function getSumByKey(items, key) {
    let totalValue = 0
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        const isKey = item.hasOwnProperty(key)
        if (isKey) {
            const valueString = item[key]
            const valueNumber = Math.trunc(valueString)
            if (!valueNumber.isNaN) {
                totalValue += valueNumber
            }
        }
    }
    return totalValue
}

/**
 * name が adventurePoints である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns {number}
 */
export function getAdventurePointsIndex(pcData) {
    return getIndexByName(pcData, 'adventurePoints')
}