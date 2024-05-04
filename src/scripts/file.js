export function importAll(importString, pcData,
    weaponData, itemData, talentData, spellData, moneyData, adventurePointData,
    fileData) {

    const importJson = JSON.parse(importString)
    setItems(pcData, importJson.pcData)
    setItems(weaponData.getItems, importJson.weaponData.getItems)
    setItems(itemData.getItems, importJson.itemData.getItems)
    setItems(talentData.getItems, importJson.talentData.getItems)
    setItems(spellData.getItems, importJson.spellData.getItems)
    setItems(moneyData.getItems, importJson.moneyData.getItems)
    setItems(adventurePointData.getItems, importJson.adventurePointData.getItems)

    fileData.import = importJson
}

function setItems(items, importItems) {
    items.length = 0
    for (let index = 0; index < importItems.length; index++) {
        items.push(importItems[index])
    }
}
