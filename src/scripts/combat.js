import { getIndexByName } from '../scripts/util.js'
import { getLoadLimitValue, getLoadCurrentValue } from '../scripts/weights.js'

/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name 装備名
 */

/**
 * 
 * @param {*} pcData 
 * @returns {string}
 */
export function getCombatCorrectionValue(pcData) {
    /** @type {number} 個人修正(数値)*/
    let combatCorrectionValue = 0

    /** 体力度、器用度、速度、幸運度 について 個人修正への寄与値を取得し、合計する */
    const abilityNames = ['strCurrent', 'dexCurrent', 'spdCurrent', 'lkCurrent']
    for (let index = 0; index < abilityNames.length; index++) {
        const abilityName = abilityNames[index]
        const correctionValue = getCombatCorrectionValuePerAbility(pcData, abilityName)
        combatCorrectionValue += correctionValue
    }

    const combatCorrectionValueString = combatCorrectionValue.toString(10)
    return combatCorrectionValueString
}

export function getCombatDiceValue(pcData, weaponData) {
    const weapons = weaponData.getItems
    const totalDice = getTotalDiceNumber(pcData, weapons)
    return totalDice.toString(10)
}

/**
 * 指定した名前の能力値の、個人修正への寄与値を取得する
 * 
 * @param {*} pcData 
 * @param {string} abilityName 
 * @returns {number}
 */
function getCombatCorrectionValuePerAbility(pcData, abilityName) {
    const abilityValue = getCurrentAbilityValue(pcData, abilityName)
    if (abilityValue > 12) {
        const correctionValue = abilityValue - 12
        return correctionValue
    }
    return 0
}

/**
 * 名前を指定し、その能力値の値を数値化して取得する
 * 
 * @param {*} pcData 
 * @param {string} abilityName 
 * @returns {number}
 */
function getCurrentAbilityValue(pcData, abilityName) {
    const abilityIndex = getIndexByName(pcData, abilityName)
    if (abilityIndex > 0) {
        const abilityValue = pcData[abilityIndex].value
        const abilityNumber = Math.trunc(abilityValue)
        if (!abilityNumber.isNaN) {
            return abilityNumber
        }
    }
    return 0
}

/**
 * name が combatCorrectionValue である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns {number}
 */
export function getCombatCorrectionIndex(pcData) {
    return getIndexByName(pcData, 'combatCorrectionValue')
}

/**
 * name が combatDice である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns {number}
 */
export function getCombatDiceIndex(pcData) {
    return getIndexByName(pcData, 'combatDice')
}

/**
 * name が combatInformation である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns {number}
 */
export function getCombatInformationIndex(pcData) {
    return getIndexByName(pcData, 'combatInformation')
}

/**
 * 表示用の冒険情報の文字列を作成
 * 
 * @param {*} pcData 
 * @param {*} weaponData 
 * @returns {Array<string>}
 */
export function createCombatInformationValue(pcData, weaponData, itemData) {
    /** @type {Array<string>} informationLines 戦闘情報の各行*/
    const lines = []
    const weapons = weaponData.getItems

    lines.push('■武器とキャラクタータイプによる戦闘修正')
    lines.push(getWeaponCombatValue(pcData, weapons))
    lines.push('■防具の状況')
    lines.push(getArmorValue(pcData, weapons))
    lines.push('■必要能力値の状況')
    lines.push(getNeedAbilities(pcData, weaponData, itemData))

    return lines
}

function getNeedAbilities(pcData, weaponData, itemData) {
    const weapons = weaponData.getItems
    const lines = []
    const strCurrent = getCurrentAbilityValue(pcData, 'strCurrent')
    const dexCurrent = getCurrentAbilityValue(pcData, 'dexCurrent')
    const needStrOnWeapons = getNeedValues(weapons, 'weapon', 'needStr')
    const needDexOnWeapons = getNeedValues(weapons, 'weapon', 'needDex')
    const needStrOnArmors = getNeedValues(weapons, 'armor', 'needStr')
    const loadCurrentValue = getLoadCurrentValue(weaponData, itemData)
    const loadLimitValue = getLoadLimitValue(pcData)

    lines.push(createMemoByNeedStrOnWeapons(needStrOnWeapons, strCurrent))
    lines.push(createMemoByNeedDexOnWeapons(needDexOnWeapons, dexCurrent))
    lines.push(createMemoByNeedStrOnArmors(needStrOnArmors, strCurrent))
    lines.push(createMemoByLoadCurrent(loadCurrentValue, loadLimitValue))
    return lines.join('')
}

function createMemoByNeedStrOnWeapons(needStrOnWeapons, strCurrent) {
    if (needStrOnWeapons <= strCurrent) {
        return [
            '武器の必要体力度は(',
            needStrOnWeapons.toString(10),
            '/',
            strCurrent.toString(10),
            ')で足りています'
        ].join('')
    }
    return [
        '武器の必要体力度は(',
        needStrOnWeapons.toString(10),
        '/',
        strCurrent.toString(10),
        ')で不足しています。'
    ].join('')
}

function createMemoByNeedDexOnWeapons(needDexOnWeapons, dexCurrent) {
    if (needDexOnWeapons <= dexCurrent) {
        return [
            '武器の必要器用度は(',
            needDexOnWeapons.toString(10),
            '/',
            dexCurrent.toString(10),
            ')で足りています'
        ].join('')
    }
    return [
        '武器の必要器用度は(',
        needDexOnWeapons.toString(10),
        '/',
        dexCurrent.toString(10),
        ')で不足しています。'
    ].join('')
}

function createMemoByLoadCurrent(loadCurrentValue, loadLimitValue) {
    const loadCurrentNumber = Math.trunc(loadCurrentValue)
    const loadLimitNumber = Math.trunc(loadLimitValue)
    if (loadCurrentNumber <= loadLimitNumber) {
        return [
            '限界重量は(',
            loadCurrentValue.toString(10),
            '/',
            loadLimitValue.toString(10),
            ')で足りています。'
        ].join('')
    }
    return [
        '限界重量は(',
        loadCurrentValue.toString(10),
        '/',
        loadLimitValue.toString(10),
        ')で不足しています。'
    ].join('')
}

function createMemoByNeedStrOnArmors(needStrOnArmors, strCurrent) {
    if (needStrOnArmors <= strCurrent) {
        return [
            '防具の必要体力度は(',
            needStrOnArmors.toString(10),
            '/',
            strCurrent.toString(10),
            ')で足りています。'
        ].join('')
    }
    return [
        '防具の必要体力度は(',
        needStrOnArmors.toString(10),
        '/',
        strCurrent.toString(10),
        ')で不足しています。'
    ].join('')
}

/**
 * type で指定した種別["weapon"|"armor"] について、 key を数値化して合計した値を返す
 * 
 * @param {*} weapons 
 * @param {string} type 
 * @param {string} key 
 * @returns {number}
 */
function getNeedValues(weapons, type, key) {
    let total = 0
    for (let index = 0; index < weapons.length; index++) {
        const weapon = weapons[index]
        if (weapon.type == type) {
            if(weapon.equipments == 'true'){
                const valueString = weapon[key]
                if (valueString) {
                    const valueNumber = Math.trunc(valueString)
                    if (!valueNumber.isNaN) {
                        total += valueNumber
                    }
                }
            }
        }
    }
    return total
}

function getArmorValue(pcData, weaponHistory) {
    const isFighter = getIsFighter(pcData)
    const equipmentArmors = getEquipmentArmors(weaponHistory)
    const armorNames = getPropertyArray(equipmentArmors, 'name')
    const armorValues = getPropertyArray(equipmentArmors, 'armorValue')
    const totalArmorValue = getTotalArmorValue(armorValues, isFighter)
    if (armorNames.length == 0) {
        return '防具は装備しておらず、総合防御点は0です。'
    }

    return [
        '装備中の防具は、',
        armorNames.join('、'),
        'で、総合防御点は',
        totalArmorValue.toString(10),
        'です。'
    ].join('')

}

/**
 * 装備中の武器、防具、戦士のレベルなどを考慮した戦闘ダイス数を取得
 * 
 * @param {*} pcData 
 * @param {*} weapons 
 * @returns {number}
 */
function getTotalDiceNumber(pcData, weapons) {
    const isFighter = getIsFighter(pcData)
    const levelNumber = getLevelNumber(pcData)

    const equipmentWeapons = getEquipmentWeapons(weapons)
    const weaponCombatDices = getPropertyArray(equipmentWeapons, 'dice')
    const totalDice = getTotalDice(weaponCombatDices, isFighter, levelNumber)

    return totalDice
}

/**
 * 装備中の武器名の配列を取得
 * 
 * @param {*} weaponData 
 * @returns {Array<string>}
 */
function getWeaponCombatNames(weaponData) {
    const equipmentWeapons = getEquipmentWeapons(weaponData)
    const weaponCombatNames = getPropertyArray(equipmentWeapons, 'name')
    return weaponCombatNames
}

/**
 * 武器あるいは素手のダイス数と個人修正の情報を含む文字列を作成する
 * 
 * @param {*} pcData 
 * @param {*} weaponData 
 * @returns 
 */
function getWeaponCombatValue(pcData, weaponData) {
    const isFighter = getIsFighter(pcData)
    const levelNumber = getLevelNumber(pcData)

    const equipmentWeapons = getEquipmentWeapons(weaponData)
    const weaponCombatNames = getPropertyArray(equipmentWeapons, 'name')
    const weaponCombatDices = getPropertyArray(equipmentWeapons, 'dice')
    const totalDice = getTotalDice(weaponCombatDices, isFighter, levelNumber)

    const personalCorrectionString = getCombatCorrectionValue(pcData)
    const personalCorrection = Math.trunc(personalCorrectionString)
    const totalCorrection = getTotalCorrection(weaponCombatDices) + personalCorrection

    if (weaponCombatNames.length == 0) {
        return [
            '武器は装備しておらず、素手の個人修正は',
            totalDice.toString(10),
            'd6+',
            totalCorrection.toString(10),
            'です。'
        ].join('')
    }
    if (totalCorrection == 0) {
        return [
            '装備中の武器は、',
            weaponCombatNames.join('、'),
            'で、武器による修正を加算した個人修正は',
            totalDice.toString(10),
            'd6です。'
        ].join('')

    }
    return [
        '装備中の武器は、',
        weaponCombatNames.join('、'),
        'で、武器による修正を加算した個人修正は',
        totalDice.toString(10),
        'd6+',
        totalCorrection.toString(10),
        'です。'
    ].join('')
}

function getTotalDice(dices, isFighter, levelNumber) {
    let totalDiceNumber = 0
    for (let index = 0; index < dices.length; index++) {
        const dice = dices[index]
        const diceNumber = getDiceNumber(dice, isFighter, levelNumber)
        totalDiceNumber += diceNumber
    }
    if (totalDiceNumber < 1) {
        /** 武器を装備していない場合、素手として扱う 人間の場合1体力度倍率で種族によって異なる。 */
        if (isFighter) {
            return 1 + levelNumber
        }
        return 1
    }
    return totalDiceNumber
}

function getTotalCorrection(dices) {
    let totalCorrectionNumber = 0
    for (let index = 0; index < dices.length; index++) {
        const dice = dices[index]
        const correctionNumber = getCorrectionNumber(dice)
        totalCorrectionNumber += correctionNumber
    }
    return totalCorrectionNumber
}

function getCorrectionNumber(dice) {
    const diceIndex = dice.indexOf('d6')
    if (diceIndex < 0) {
        return 0
    }

    const correctionNumberString = dice.substring(diceIndex + 2)
    const correctionNumber = Math.trunc(correctionNumberString)
    if (correctionNumber.isNaN) {
        return 0
    }
    return correctionNumber

}

function getDiceNumber(dice, isFighter, levelNumber) {
    const diceIndex = dice.indexOf('d6')
    if (diceIndex < 0) {
        return 0
    }
    const diceNumberString = dice.substring(0, diceIndex)
    if (isFighter) {
        return Math.trunc(diceNumberString) + levelNumber
    }
    return Math.trunc(diceNumberString)
}

function getLevelNumber(pcData) {
    const levelIndex = getIndexByName(pcData, 'level')
    const levelValue = pcData[levelIndex].value
    return Math.trunc(levelValue)
}

/**
 * 戦士ならtrue
 * 
 * @param {*} pcData 
 * @returns {boolean}
 */
function getIsFighter(pcData) {
    const typeIndex = getIndexByName(pcData, 'type')
    const typeValue = pcData[typeIndex].value
    if (typeValue == '戦士') {
        return true
    }
    return false
}

function getPropertyArray(items, key) {
    const propertyArray = []
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        propertyArray.push(item[key])
    }
    return propertyArray
}

function getEquipmentWeapons(weaponHistory) {
    const equipmentWeapons = []
    for (let index = 0; index < weaponHistory.length; index++) {
        const weaponItem = weaponHistory[index]
        if (isEquipmentWeapons(weaponItem)) {
            equipmentWeapons.push(weaponItem)
        }
    }
    return equipmentWeapons
}

function isEquipmentWeapons(item) {
    const isType = item.hasOwnProperty('type')
    const isEquipments = item.hasOwnProperty('equipments')
    if (!isType || !isEquipments) {
        return false
    }
    if (item.type != 'weapon' && item.type != 'armor') {
        return false
    }
    if (item.equipments != 'true') {
        return false
    }
    if (item.dice == '') {
        return false
    }
    return true
}

function getEquipmentArmors(weaponHistory) {
    const equipmentArmors = []
    for (let index = 0; index < weaponHistory.length; index++) {
        const armorItem = weaponHistory[index]
        if (isEquipmentWArmors(armorItem)) {
            equipmentArmors.push(armorItem)
        }
    }
    return equipmentArmors
}

function isEquipmentWArmors(item) {
    const isType = item.hasOwnProperty('type')
    const isEquipments = item.hasOwnProperty('equipments')
    if (!isType || !isEquipments) {
        return false
    }
    if (item.type != 'weapon' && item.type != 'armor') {
        return false
    }
    if (item.equipments != 'true') {
        return false
    }
    if (item.armorValue == '') {
        return false
    }
    return true
}

function getTotalArmorValue(armorValues, isFighter) {
    let totalArmorValue = 0
    for (let index = 0; index < armorValues.length; index++) {
        const armorValueString = armorValues[index]
        const armorValueNumber = Math.trunc(armorValueString)
        if (!armorValueNumber.isNaN) {
            totalArmorValue += armorValueNumber
        }
    }
    if (isFighter) {
        return totalArmorValue * 2
    }
    return totalArmorValue
}