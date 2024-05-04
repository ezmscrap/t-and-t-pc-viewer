<script setup>
import { createMoney, moneyProperties } from '../scripts/moneys.js'

/** 受け取るデータの型を定義 */
const props = defineProps({
    increaseMoneyInputFormHandle: {
        type: Function,
        required: true,
    },
    initHandle: {
        type: Function,
        required: true,
    },
    moneyHistory: {
        type: Object,
        required: true,
    },
    visibleInfo: {
        type: Object,
        required: true,
    }
})

function increaseMoneyInputForm() {
    props.increaseMoneyInputFormHandle(createMoney())
}

function onChange() {
    props.initHandle()
}

</script>

<template>
    <div v-if="visibleInfo.inputType == 'moneys'">
        入出金の直接入力
        <div v-on:click="increaseMoneyInputForm">入出金の直接入力欄を増やす</div>
        <div v-for="item in moneyHistory.getItems">
            <span v-for="property in moneyProperties" :key="property.name">
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