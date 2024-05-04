
import { getLoadLimitValue, getLoadLimitIndex } from '../scripts/weights.js'
import { getLoadCurrentValue, getLoadCurrentIndex } from '../scripts/weights.js'
import { getWeaponsValue, getWeaponsIndex } from '../scripts/weapons.js'
import { getItemsValue, getItemsIndex } from '../scripts/items.js'
import { getLevelValue, getLevelIndex } from '../scripts/level.js'
import { getTalentsValue, getTalentsIndex } from '../scripts/talents.js'
import { getSpellsValue, getSpellsIndex } from '../scripts/spells.js'
import { getMoneyValue, getMoneyIndex } from './moneys.js'
import { getInitMoneyIndex } from './moneys.js'
import { getAdventurePointsValue, getAdventurePointsIndex } from './adventurePoints.js'
import { getCombatDiceValue, getCombatDiceIndex } from '../scripts/combat.js'
import { getCombatCorrectionValue, getCombatCorrectionIndex } from '../scripts/combat.js'
import { createCombatInformationValue, getCombatInformationIndex } from '../scripts/combat.js'
import { getChatPalletValue, getChatPalletIndex } from './chatPallet.js'
import { setCurrent } from './currentValue.js'

export function setAll(pcData,
    weaponData, itemData, talentData, spellData, moneyData, adventurePointData,
    combatInformation, fileData) {
    setCurrent(pcData)
    setLevel(pcData)
    setWeapons(pcData, weaponData)
    setEquipments(pcData, itemData)
    setLoadLimit(pcData)
    setLoadCurrent(pcData, weaponData, itemData)
    setMoney(pcData, weaponData, itemData, moneyData)
    setAdventurePoints(pcData, adventurePointData)
    setTalents(pcData, talentData)
    setSpells(pcData, spellData)
    setCombatCorrections(pcData)
    setCombatDice(pcData, weaponData)
    setCombatInformation(pcData, weaponData, itemData, combatInformation)
    setChatPallet(pcData)
    fileData.export = {
        pcData: pcData,
        weaponData: weaponData,
        itemData: itemData,
        talentData: talentData,
        spellData: spellData,
        moneyData: moneyData,
        adventurePointData: adventurePointData,
    }
}


/**
 * 現在重量を武器欄、装備欄に応じて書き換え 
 * 
 * @param {*} pcData 
 * @param {*} weaponData 
 * @param {*} itemData 
 * @returns 
 */
function setLoadCurrent(pcData, weaponData, itemData) {
    const loadCurrentIndex = getLoadCurrentIndex(pcData)
    if (loadCurrentIndex > 0) {
        const loadCurrentValue = getLoadCurrentValue(weaponData, itemData)
        pcData[loadCurrentIndex].value = loadCurrentValue
    }
    return pcData
}

/**
 * 限界重量を現在体力度に応じて書き換え
 * 
 * @param {*} pcData 
 * @returns 
 */
function setLoadLimit(pcData) {
    const loadLimitIndex = getLoadLimitIndex(pcData)
    if (loadLimitIndex > 0) {
        const loadLimitValue = getLoadLimitValue(pcData)
        pcData[loadLimitIndex].value = loadLimitValue
    }
    return pcData
}

/**
 * 装備欄を入力に応じて書き換え 
 * 
 * @param {*} pcData 
 * @param {*} itemData 
 * @returns 
 */
function setEquipments(pcData, itemData) {
    const itemsIndex = getItemsIndex(pcData)
    if (itemsIndex > 0) {
        const itemsValue = getItemsValue(itemData)
        pcData[itemsIndex].value = itemsValue
    }
    return pcData
}

/**
 * 武器欄を入力に応じて書き換え
 * 
 * @param {*} pcData 
 * @param {*} weaponData 
 * @returns 
 */
function setWeapons(pcData, weaponData) {
    const weaponsIndex = getWeaponsIndex(pcData)
    if (weaponsIndex > 0) {
        const weaponsValue = getWeaponsValue(weaponData)
        pcData[weaponsIndex].value = weaponsValue
    }
    return pcData
}

/**
 * 
 * @param {*} pcData 
 * @returns 
 */
function setLevel(pcData) {
    const levelIndex = getLevelIndex(pcData)
    if (levelIndex > 0) {
        const levelValue = getLevelValue(pcData)
        pcData[levelIndex].value = levelValue
    }
    return pcData
}

function setMoney(pcData, weaponData, itemData, moneyData) {
    const initMoneyIndex = getInitMoneyIndex(pcData)
    if (initMoneyIndex > 0) {
        const initMoneyValue = pcData[initMoneyIndex].value
        const moneyIndex = getMoneyIndex(pcData)
        if (moneyIndex > 0) {
            const moneyValue = getMoneyValue(weaponData, itemData, moneyData, initMoneyValue)
            pcData[moneyIndex].value = moneyValue
        }
    }
    return pcData
}

function setAdventurePoints(pcData, adventurePointData) {
    const adventurePointIndex = getAdventurePointsIndex(pcData)
    if (adventurePointIndex > 0) {
        const adventurePointValue = getAdventurePointsValue(adventurePointData)
        pcData[adventurePointIndex].value = adventurePointValue
    }
    return pcData
}

function setTalents(pcData, talentData) {
    const talentIndex = getTalentsIndex(pcData)
    if (talentIndex > 0) {
        const talentValue = getTalentsValue(talentData)
        pcData[talentIndex].value = talentValue
    }
    return pcData
}

function setSpells(pcData, spellData) {
    const spellIndex = getSpellsIndex(pcData)
    if (spellIndex > 0) {
        const spellValue = getSpellsValue(spellData)
        pcData[spellIndex].value = spellValue
    }
    return pcData
}

function setCombatCorrections(pcData) {
    const combatCorrectionIndex = getCombatCorrectionIndex(pcData)
    if (combatCorrectionIndex > 0) {
        const combatCorrectionValue = getCombatCorrectionValue(pcData)
        pcData[combatCorrectionIndex].value = combatCorrectionValue
    }
    return pcData
}

function setCombatDice(pcData, weaponData) {
    const combatDiceIndex = getCombatDiceIndex(pcData)
    if (combatDiceIndex > 0) {
        const combatDiceValue = getCombatDiceValue(pcData, weaponData)
        pcData[combatDiceIndex].value = combatDiceValue
    }
    return pcData
}

function setCombatInformation(pcData, weaponData, itemData, combatInformation) {
    const combatInformationIndex = getCombatInformationIndex(pcData)
    if (combatInformationIndex > 0) {
        const combatInformationValue = createCombatInformationValue(pcData, weaponData, itemData)
        pcData[combatInformationIndex].value = combatInformationValue
        combatInformation.lines = combatInformationValue
    }
    return pcData
}

function setChatPallet(pcData) {
    const chatPalletIndex = getChatPalletIndex(pcData)
    if (chatPalletIndex > 0) {
        const chatPalletValue = getChatPalletValue(pcData)
        pcData[chatPalletIndex].value = chatPalletValue
    }
    return pcData
}