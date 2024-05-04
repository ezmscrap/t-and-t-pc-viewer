import { getIndexByName } from '../scripts/util.js'

/**
 * class に pc-ability" を含む項目の value を調べ、その 10分の1の最大値を得る(切り捨て)
 * 
 * @param {*} pcData 
 * @returns {string} レベル
 */
export function getLevelValue(pcData) {
    const values = []
    for (let index = 0; index < pcData.length; index++) {
        const item = pcData[index]
        if (isAbility(item)) {
            values.push(item.value)
        }
    }
    const maxValue = getMaxValueInStringArray(values)
    const levelValue = getLevelByMaxValue(maxValue)
    return levelValue
}

export function getLevelIndex(pcData) {
    return getIndexByName(pcData, 'level')
}

/**
 * 最大値を10分の1にし、切り捨て、文字列化することでレベルを得る
 * 
 * @param {number} maxValue 
 * @returns {string}
 */
function getLevelByMaxValue(maxValue) {
    const levelNumber = Math.trunc(maxValue / 10)
    const levelString = levelNumber.toString(10)
    return levelString
}

/**
 * 
 * @param {Array<string>} values 
 * @returns {number}
 */
function getMaxValueInStringArray(values) {
    let maxValue = 0
    for (let index = 0; index < values.length; index++) {
        const stringValue = values[index]
        const numberValue = Math.trunc(stringValue)
        if (maxValue < numberValue) {
            maxValue = numberValue
        }
    }
    return maxValue
}

function isAbility(item) {
    if (typeof item != 'object') {
        return false
    }

    const isClass = item.hasOwnProperty('class')
    if (!isClass) {
        return false
    }

    const isValue = item.hasOwnProperty('value')
    if (!isValue) {
        return false
    }

    const numberValue = Math.trunc(item.value)
    if (numberValue.isNaN) {
        return false
    }

    const classArray = item.class.split(' ')
    for (let index = 0; index < classArray.length; index++) {
        if (classArray[index] == 'pc-ability') {
            return true
        }
    }

    return false
}