
/**
 * 
 * @typedef {object} modeInformation モード情報
 * @property {boolean} isViewMode シート表示モードの真偽値
 * @property {boolean} isInputMode シート表示モードの真偽値
 * 
 * @param {modeInformation} modeInfo モード情報
 * @returns {modeInformation} modeInfo モード情報
 */
export function toggleMode(visibleInfo) {
    if (visibleInfo.isViewMode == true) {
        setFalseToAll(visibleInfo)
        visibleInfo.isTableMode = true
        return visibleInfo
    }
    if (visibleInfo.isTableMode == true) {
        setFalseToAll(visibleInfo)
        visibleInfo.isInputMode = true
        return visibleInfo
    }
    if (visibleInfo.isInputMode == true) {
        setFalseToAll(visibleInfo)
        visibleInfo.isViewMode = true
        return visibleInfo
    }
}

function setFalseToAll(visibleInfo){
    visibleInfo.isViewMode = false
    visibleInfo.isTableMode = false
    visibleInfo.isInputMode = false
}

export const sheetTypes = [
    {
        label:'キャラクターシート',
        value:'characterSheet',
    },
    {
        label:'表シート',
        value:'inputSheet',
    },
    {
        label:'データ入力シート',
        value:'inputSheet',
    },
    {
        label:'セーブロードシート',
        value:'saveAndLoadSheet',
    },
]
export const inputTypes = [
    {
        label:'個人情報と能力値',
        value:'abilities',
    },
    {
        label:'武器',
        value:'weapons',
    },
    {
        label:'装備',
        value:'equipments',
    },
    {
        label:'タレント',
        value:'talents',
    },
    {
        label:'呪文',
        value:'spells',
    },
    {
        label:'入出金',
        value:'moneys',
    },
    {
        label:'冒険点の獲得と消費',
        value:'adventurePoints',
    },
    {
        label:'データの読み込み/保存',
        value:'dataLoadAndSave',
    },
]