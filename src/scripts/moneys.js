import { getIndexByName, sumStringedNumberArray } from './util.js'

/**
 * @typedef {object} moneyInformation 入出金情報
 * @property {string} deposit 入金(gp)
 * @property {string} depositSp 入金(sp)
 * @property {string} depositCp 入金(cp)
 * @property {string} withdraw 出金(gp)
 * @property {string} withdrawSp 出金(sp)
 * @property {string} withdrawCp 出金(cp)
 * @property {string} memo メモ欄
 */

/** 
 * @typedef {object} objectWithPrice 価格プロパティを持つ何らかのオブジェクト
 * @property {string} price 価格(gp)
 */

/** 
 * @typedef {object} objectWithPriceAll フルセットの価格プロパティを持つ何らかのオブジェクト
 * @property {string} price 価格(gp)
 * @property {string} priceSp 価格(sp)
 * @property {string} priceCp 価格(cp)
 */

/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name 装備名
 */

export const moneyProperties = [
    { name: 'deposit', label: '入金(gp)', size: 4 },
    { name: 'depositSp', label: '入金(sp)', size: 4 },
    { name: 'depositCp', label: '入金(cp)', size: 4 },
    { name: 'withdraw', label: '出金(gp)', size: 4 },
    { name: 'withdrawSp', label: '出金(sp)', size: 4 },
    { name: 'withdrawCp', label: '出金(cp)', size: 4 },
    { name: 'memo', label: 'メモ欄', size: 16 },
]

/**
 * 新しい入出金情報欄を作成 
 * 
 * @property {string} deposit 入金(gp)
 * @property {string} depositSp 入金(sp)
 * @property {string} depositCp 入金(cp)
 * @property {string} withdraw 出金(gp)
 * @property {string} withdrawSp 出金(sp)
 * @property {string} withdrawCp 出金(cp)
 * @param {string} memo メモ欄
 * @returns {moneyInformation} item 入出金情報
 */
export function createMoney(deposit = '', depositSp = '', depositCp = '', withdraw = '', withdrawSp = '', withdrawCp = '', memo = '') {
    const item = {
        deposit: deposit,
        depositSp: depositSp,
        depositCp: depositCp,
        withdraw: withdraw,
        withdrawSp: withdrawSp,
        withdrawCp: withdrawCp,
        memo: memo
    }
    return item
}

/**
 * 所持金の表示値を取得する
 * 
 * @param {*} weaponData 
 * @param {*} itemData 
 * @param {string} initMoneyValue 
 * @returns {string}
 */
export function getMoneyValue(weaponData, itemData, moneyData, initMoneyValue) {
    const weaponsMoney = getWeaponMoney(weaponData)
    const itemsMoney = getItemMoney(itemData)
    const depositAndWithdrawMoney = getDepositAndWithdraw(moneyData.getItems)

    const initMoney = Math.trunc(initMoneyValue)
    const priceObjs = [weaponsMoney, itemsMoney]

    /** 武器と装備で使用した金額の合計 */
    const priceGp = sumKeyWithTrunc(priceObjs, 'price')
    const priceSp = sumKeyWithTrunc(priceObjs, 'priceSp')
    const priceCp = sumKeyWithTrunc(priceObjs, 'priceCp')
    
    /** 入出金の合計 */
    const depositGp = Math.trunc(depositAndWithdrawMoney.price)
    const depositSp = Math.trunc(depositAndWithdrawMoney.priceSp)
    const depositCp = Math.trunc(depositAndWithdrawMoney.priceCp)
    
    /** 初期所持金 + 武器と装備で使用した金額 + 入出金の合計 */
    const totalGp = initMoney + depositGp - priceGp
    const totalSp = priceSp - depositSp
    const totalCp = priceCp - depositCp

    /** 金貨、銀貨、銅貨を金貨基準に換算 */
    const totalMoney = (totalGp * 100 + totalSp * 10 + totalCp) / 100

    return totalMoney.toString(10)
}

/**
 * 3種の値段を持つオブジェクトの配列の指定したキーについて、数値化して合計する
 * 
 * @param {Array<objectWithPriceAll>} priceObjs 3種の値段を持つオブジェクト
 * @param {string} priceKey 集計するキー
 * @returns {number} 合計値
 */
function sumKeyWithTrunc(priceObjs, priceKey) {
    let totalPrice = 0
    for (let index = 0; index < priceObjs.length; index++) {
        const priceObj = priceObjs[index]
        const isKey = priceObj.hasOwnProperty(priceKey)
        if (isKey) {
            const priceString = priceObj[priceKey]
            const priceNumber = Math.trunc(priceString)
            if (!priceNumber.isNaN) {
                totalPrice += priceNumber
            }
        }
    }
    return totalPrice
}

/**
 * name が money である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns {number}
 */
export function getMoneyIndex(pcData) {
    return getIndexByName(pcData, 'money')
}

export function getInitMoneyIndex(pcData) {
    return getIndexByName(pcData, 'initMoney')
}

function getDepositAndWithdraw(items) {
    /** @type  {Array<string>} priceGps 価格文字列(gp)の配列 */
    const priceGps = []

    /** @type  {Array<string>} priceSps 価格文字列(sp)の配列 */
    const priceSps = []

    /** @type  {Array<string>} priceCps 価格文字列(cp)の配列 */
    const priceCps = []

    /** 入出金リストを作る。出金(withdraw)は頭にマイナスをつける */
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (isDepositAndWithdraw(item)) {
            priceGps.push(item.deposit)
            priceSps.push(item.depositSp)
            priceCps.push(item.depositCp)
            priceGps.push(getWithdraw(item.withdraw))
            priceSps.push(getWithdraw(item.withdrawSp))
            priceCps.push(getWithdraw(item.withdrawCp))
        }
    }
    /** 価格文字列の配列の各要素を数値化して加算 */
    const totalPriceGp = sumStringedNumberArray(priceGps)
    const totalPriceSp = sumStringedNumberArray(priceSps)
    const totalPriceCp = sumStringedNumberArray(priceCps)

    return {
        price: totalPriceGp.toString(10),
        priceSp: totalPriceSp.toString(10),
        priceCp: totalPriceCp.toString(10),
    }
}

/**
 * 
 * @param {string} withdraw 
 * @returns {string} マイナス符号をつけた数値文字列
 */
function getWithdraw(withdraw) {
    if (withdraw != '') {
        return '-' + withdraw
    }
    return '0'
}
/**
 * 
 * @param {*} itemHistory 
 * @returns {objectWithPriceAll}
 */
function getItemMoney(itemHistory) {
    const totalPrice = sumMoneyFromFullObjectArray(itemHistory.getItems)
    return totalPrice
}

/**
 * 
 * @param {*} weaponHistory 
 * @returns {objectWithPriceAll}
 */
function getWeaponMoney(weaponHistory) {
    const totalPrice = sumMoneyFromObjectArray(weaponHistory.getItems)
    return totalPrice
}

/**
 * 
 * @param {Array<objectWithPriceAll>} items 
 * @returns {objectWithPriceAll}
 */
function sumMoneyFromFullObjectArray(items) {
    /** @type  {Array<string>} priceGps 価格文字列(gp)の配列 */
    const priceGps = []

    /** @type  {Array<string>} priceSps 価格文字列(sp)の配列 */
    const priceSps = []

    /** @type  {Array<string>} priceCps 価格文字列(cp)の配列 */
    const priceCps = []

    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (isPriceFull(item)) {
            priceGps.push(item.price)
            priceSps.push(item.priceSp)
            priceCps.push(item.priceCp)
        }
    }
    /** 価格文字列の配列の各要素を数値化して加算 */
    const totalPriceGp = sumStringedNumberArray(priceGps)
    const totalPriceSp = sumStringedNumberArray(priceSps)
    const totalPriceCp = sumStringedNumberArray(priceCps)
    return {
        price: totalPriceGp.toString(10),
        priceSp: totalPriceSp.toString(10),
        priceCp: totalPriceCp.toString(10),
    }
}

/**
 * 
 * @param {Array<objectWithPrice>} items 
 * @returns {objectWithPriceAll}
 */
function sumMoneyFromObjectArray(items) {
    /** @type  {Array<string>} priceGp 価格文字列の配列 */
    const priceGps = []

    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (item.hasOwnProperty('price')) {
            priceGps.push(item.price)
        }
    }
    /** 価格文字列の配列の各要素を数値化して加算 */
    const totalPriceGp = sumStringedNumberArray(priceGps)
    return {
        price: totalPriceGp.toString(10),
        priceSp: '0',
        priceCp: '0',
    }
}

function isPriceFull(item) {
    const isPriceGp = item.hasOwnProperty('price')
    const isPriceSp = item.hasOwnProperty('priceSp')
    const isPriceCp = item.hasOwnProperty('priceCp')
    if (isPriceGp && isPriceSp && isPriceCp) {
        return true
    }
    return false
}

function isDepositAndWithdraw(item) {
    const isDeposit = item.hasOwnProperty('deposit')
    const isDepositSp = item.hasOwnProperty('depositSp')
    const isDepositCp = item.hasOwnProperty('depositCp')
    const isWithdraw = item.hasOwnProperty('withdraw')
    const isWithdrawSp = item.hasOwnProperty('withdrawSp')
    const isWithdrawCp = item.hasOwnProperty('withdrawCp')
    if (isDeposit && isDepositSp && isDepositCp && isWithdraw && isWithdrawSp && isWithdrawCp) {
        return true
    }
    return false

}
