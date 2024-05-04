import { getIndexByName } from '../scripts/util.js'

export function setCurrent(pcData) {
    for (let index = 0; index < pcData.length; index++) {
        const item = pcData[index]
        const classArray = item.class.split(' ')
        if (classArray.includes('pc-ability')) {
            const name = item.name
            copyAbilityToAbilityCurrent(pcData, name)
        }
    }
    return pcData
}

function copyAbilityToAbilityCurrent(pcData, name) {
    const value = getAbilityValue(pcData, name)
    const nameCurrent = name + "Current"
    setCurrentAbilityValue(pcData, nameCurrent, value)
    return pcData
}

function getAbilityValue(pcData, name) {
    const index = getIndexByName(pcData, name)
    if (index > 0) {
        const value = pcData[index].value
        return value
    }
}

function setCurrentAbilityValue(pcData, name, value) {
    const index = getIndexByName(pcData, name)
    if (index > 0) {
        pcData[index].value = value
    }
    return pcData
}