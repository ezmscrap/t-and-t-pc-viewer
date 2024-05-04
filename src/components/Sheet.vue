<script setup>
import ToolBar from './ToolBar.vue'
import AdventureInformation from './AdventureInformation.vue'
import Tables from './Tables.vue'
import InputAbilities from './InputAbilities.vue'
import InputWeapons from './InputWeapons.vue'
import InputEquipments from './InputEquipments.vue'
import InputMoneys from './InputMoneys.vue'
import InputAdventurePoints from './InputAdventurePoints.vue'
import ChatPallet from './ChatPallet.vue'
import File from './File.vue'

import { ref } from 'vue'
import { pcData, weapons, items, talents, spells, moneys, adventurePoints } from '../scripts/defaultData.js'
import { toggleMode } from '../scripts/toolbar.js'
import { createTalent, talentProperties } from '../scripts/talents.js'
import { createSpell, spellProperties } from '../scripts/spells.js'
import { setAll } from '../scripts/sheet.js'
import { importAll } from '../scripts/file.js'

const characterSheetUrl = import.meta.env.VITE_SHEET_URL

const characterSheet = ref(pcData)
const weaponHistory = ref(weapons)
const itemHistory = ref(items)
const moneyHistory = ref(moneys)
const adventurePointHistory = ref(adventurePoints)
const talentArray = ref(talents)
const spellArray = ref(spells)
const combatInformation = ref({ lines: [] })
const fileData = ref({ export: {}, import: {} })
const visibleInfo = ref({
    isToolbar: false,
    isInputMode: false,
    isTableMode: false,
    isViewMode: true,
    sheetType: 'characterSheet',
    inputType: 'abilities'
})

function increaseWeaponInputForm(item) {
    weaponHistory.value.getItems.push(item)
}

function increaseItemInputForm(item) {
    itemHistory.value.getItems.push(item)
}

function increaseMoneyInputForm(item) {
    moneyHistory.value.getItems.unshift(item)
}

function increaseAdventurePointsInputForm(item) {
    adventurePointHistory.value.getItems.unshift(item)
}

function increaseTalentInputForm() {
    talentArray.value.getItems.push(createTalent())
}

function increaseSpellInputForm() {
    spellArray.value.getItems.push(createSpell())
}

function toggleViews() {
    init()
    toggleMode(visibleInfo.value)
}

function pcToolbarMouseOverAction() {
    visibleInfo.value.isToolbar = true
}

/**
 * ツールバーからマウスを外した時の動き
 * (キャラクターシート表示モードの場合は、ツールバーを隠す)
 */
function pcToolbarMouseLeaveAction() {
    if (visibleInfo.value.isViewMode) {
        visibleInfo.value.isToolbar = false
    }
}

function setImport(importString) {
    importAll(importString, characterSheet.value,
        weaponHistory.value, itemHistory.value, talentArray.value, spellArray.value,
        moneyHistory.value, adventurePointHistory.value, fileData.value)
    init()
}

function init() {
    setAll(characterSheet.value,
        weaponHistory.value, itemHistory.value, talentArray.value, spellArray.value,
        moneyHistory.value, adventurePointHistory.value,
        combatInformation.value, fileData.value)
}

init()

</script>
<template>

    <div class="pc-toolbar-area" v-on:mouseover="pcToolbarMouseOverAction" v-on:mouseleave="pcToolbarMouseLeaveAction">
        <ToolBar :visibleInfo="visibleInfo" :toggleViewsHandle="toggleViews" />
    </div>

    <div v-if="visibleInfo.isViewMode">
        <div v-for="item in characterSheet" :class="item.class">
            <span v-if="item.name != 'portrait'">
                {{ item.value }}
            </span>
            <img v-else :class="item.class" :src="item.value" />
        </div>

        <div class="base-sheet">
            <img class="sheet-img" :src="characterSheetUrl" />
        </div>
    </div>

    <div v-if="visibleInfo.isTableMode">
        <div class="table-sheet">

            <AdventureInformation :combatInformation="combatInformation" />

            <ChatPallet :characterSheet="characterSheet" />

            <Tables :weaponHistory="weaponHistory" :itemHistory="itemHistory" :talentArray="talentArray"
                :spellArray="spellArray" :characterSheet="characterSheet" />
        </div>
    </div>

    <div v-if="visibleInfo.isInputMode">
        <div class="input-sheet">

            <AdventureInformation :combatInformation="combatInformation" />

            <InputAbilities :visibleInfo="visibleInfo" :characterSheet="characterSheet" :initHandle="init" />

            <InputWeapons :visibleInfo="visibleInfo" :weaponHistory="weaponHistory"
                :increaseWeaponInputFormHandle="increaseWeaponInputForm" :initHandle="init" />

            <InputEquipments :visibleInfo="visibleInfo" :itemHistory="itemHistory"
                :increaseItemInputFormHandle="increaseItemInputForm" :initHandle="init" />

            <div v-if="visibleInfo.inputType == 'talents'">
                タレントの直接入力
                <div v-for="item in talentArray.getItems">
                    <span v-for="property in talentProperties" :key="property.name">
                        {{ property.label }}:<input v-model="item[property.name]" :size="property.size"></input>
                    </span>
                </div>
                <div v-on:click="increaseTalentInputForm">タレントの直接入力欄を増やす</div>
            </div>

            <div v-if="visibleInfo.inputType == 'spells'">
                呪文の直接入力
                <div v-for="item in spellArray.getItems">
                    <span v-for="property in spellProperties" :key="property.name">
                        {{ property.label }}:<input v-model="item[property.name]" :size="property.size"></input>
                    </span>
                </div>
                <div v-on:click="increaseSpellInputForm">呪文の直接入力欄を増やす</div>
            </div>

            <InputMoneys :visibleInfo="visibleInfo" :moneyHistory="moneyHistory"
                :increaseMoneyInputFormHandle="increaseMoneyInputForm" :initHandle="init" />

            <InputAdventurePoints :visibleInfo="visibleInfo" :adventurePointHistory="adventurePointHistory"
                :increaseAdventurePointsInputFormHandle="increaseAdventurePointsInputForm" :initHandle="init" />

            
            <div v-if="visibleInfo.inputType == 'dataLoadAndSave'">
                データの読み込み/保存
                <File :fileData="fileData" :setImportHandle="setImport" />
            </div>

        </div>
    </div>
</template>

<style scoped>
@import '../styles/sheet.css';
@import '../styles/toolbar.css';

.table-sheet {
    position: absolute;
    top: 90px;
    left: 0px;
    z-index: 1;
    max-width: 900px;
}

.input-sheet {
    position: absolute;
    top: 90px;
    left: 0px;
    z-index: 1;
}

.pc-input-label {
    display: inline-block;
    min-width: 120px;
    height: 40px;
}

.pc-input-form {
    width: 360px;
    height: 40px;
}
</style>