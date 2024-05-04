<script setup>
import { createAdventurePointInformation, adventurePointInformationProperties } from '../scripts/adventurePoints.js'

/** 受け取るデータの型を定義 */
const props = defineProps({
    increaseAdventurePointsInputFormHandle: {
        type: Function,
        required: true,
    },
    initHandle: {
        type: Function,
        required: true,
    },
    adventurePointHistory: {
        type: Object,
        required: true,
    },
    visibleInfo: {
        type: Object,
        required: true,
    }
})

function increaseMoneyInputForm() {
    props.increaseAdventurePointsInputFormHandle(createAdventurePointInformation())
}

function onChange() {
    props.initHandle()
}

</script>

<template>
    <div v-if="visibleInfo.inputType == 'adventurePoints'">
        冒険点の獲得と消費の直接入力
        <div v-on:click="increaseMoneyInputForm">冒険点の獲得と消費の直接入力欄を増やす</div>
        <div v-for="item in adventurePointHistory.getItems">
            <span v-for="property in adventurePointInformationProperties" :key="property.name">
                {{ property.label }}:<input v-model="item[property.name]" :size="property.size"
                    v-on:input="onChange"></input>
            </span>
        </div>
    </div>
</template>

<style scoped>
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