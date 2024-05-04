import { getIndexByName } from './util.js'

/** 
 * @typedef {object} objectWithName 名前プロパティを持つ何らかのオブジェクト
 * @property {string} name チャットパレットに張り込む文字列
 */

/** 
 * @typedef {object} pcDataItem PCデータのアイテムのオブジェクト
 * @property {string} name 識別名
 * @property {string} label 表示用文字列
 * @property {string} class クラス情報
 */

const MAX_SAVING_ROLL_LEVEL = 20

export function getChatPalletValue(pcData) {
    const importJson = {
        kind: 'character',
        data: {
            name: getName(pcData),
            externalUrl: getExternalUrl(),
            iconUrl: getIconUrl(pcData),
            color: '#FF0066',
            secret: false,
            commands: getCommand(pcData),
            memo: getMemo(pcData),
            status: getStatus(pcData),
            params: getParams()
        }
    }
    return JSON.stringify(importJson)
}

/**
 * name が chatPallet である配列中の要素の index を返す。なければ -1
 * 
 * @param {Array<objectWithName>} pcData 名前プロパティを持つ何らかのオブジェクトの配列
 * @returns {number}
 */
export function getChatPalletIndex(pcData) {
    return getIndexByName(pcData, 'chatPallet')
}

function getName(pcData) {
    const index = getIndexByName(pcData, 'nickname')
    const name = pcData[index].value
    return name
}

function getIconUrl(pcData){
    const index = getIndexByName(pcData, 'portrait')
    const iconUrl = pcData[index].value
    return iconUrl
}

function getMemo(pcData) {
    const lines = []
    lines.push('■基本情報:')
    lines.push(createSubMemos(pcData, ['name','race', 'type']))
    lines.push(createSubMemos(pcData, ['sex', 'age', 'height', 'weight', 'hairColor']))
    lines.push('■補記')
    lines.push(createSubMemos(pcData, ['memo']))
    return lines.join('\n')
}

function createSubMemos(pcData, targetKey) {
    const lines = []
    for (let index = 0; index < targetKey.length; index++) {
        const key = targetKey[index]
        const targetIndex = getIndexByName(pcData, key)
        const targetItem = pcData[targetIndex]
        const terms = [targetItem.label, ':', targetItem.value]
        lines.push(terms.join(''))
    }
    return lines.join('/')
}

function getExternalUrl() {
    return ''
}

function getStatus(pcData) {
    const statusArray = []
    for (let index = 0; index < pcData.length; index++) {
        const item = pcData[index]
        const classArray = item.class.split(' ')
        if (classArray.includes('pc-ability')) {
            const label = item.chatPalletLabel
            const value = item.value
            statusArray.push(createStatusItem(label, value))
        }
    }
    return statusArray
}

function getParams() {
    const paramArray = []
    return paramArray
}

/**
 * インポートデータのチャットパレット命令部分の文字列を作成
 * 
 * @param {Array<pcDataItem>} pcData PCのデータ配列
 * @returns {string}
 */
export function getCommand(pcData) {
    const lines = []
    lines.push(createCombatRollString(pcData))
    lines.push(createSavingRollString(pcData))
    return lines.join('\n')
}

function createStatusItem(label, value) {
    const item = {
        label: label,
        value: value,
        max: value,
    }
    return item
}

/**
 * チャットパレットのセービングスロー用文字列を作成
 * 
 * @param {Array<pcDataItem>} pcData PCのデータ配列
 * @returns {string}
 */
function createSavingRollString(pcData) {
    const lines = []
    for (let index = 0; index < pcData.length; index++) {
        const item = pcData[index]
        const classArray = item.class.split(' ')
        if (classArray.includes('pc-ability')) {
            const name = item.chatPalletLabel
            const label = item.label
            lines.push(createSavingRollStringPerLevel(name, label))
        }
    }
    return lines.join('\n')
}

/**
 * 指定された能力値に対するチャットパレットのセービングスロー用文字列を作成
 * 
 * @param {string} name PCの能力値の識別名
 * @param {string} label PCの能力値のチャットパレット用ラベル値
 * @returns {string}
 */
function createSavingRollStringPerLevel(name, label) {
    const lines = []
    const maxSavingRollLevel = MAX_SAVING_ROLL_LEVEL
    for (let levelNumber = 0; levelNumber < maxSavingRollLevel; levelNumber++) {
        const terms = [
            '2d6+{', name, '}>=',
            levelNumber.toString(10),
            'Lv ',
            label,
            'SR(Lv',
            levelNumber.toString(10),
            ')'
        ]
        lines.push(terms.join(''))
    }
    return lines.join('\n')
}

function createCombatRollString(pcData) {
    const combatDiceIndex = getIndexByName(pcData, 'combatDice')
    const combatCorrectionValueIndex = getIndexByName(pcData, 'combatCorrectionValue')
    const combatDice = pcData[combatDiceIndex].value
    const combatCorrectionValue = pcData[combatCorrectionValueIndex].value
    const terms = [
        combatDice,
        'd6+',
        combatCorrectionValue,
        ' 個人/戦闘修正(combat)'
    ]
    return terms.join('')
}