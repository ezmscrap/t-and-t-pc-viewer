<script setup>
import { createItem, itemProperties } from '../scripts/items.js'

/** 受け取るデータの型を定義 */
const props = defineProps({
    increaseItemInputFormHandle: {
        type: Function,
        required: true,
    },
    initHandle: {
        type: Function,
        required: true,
    },
    itemHistory: {
        type: Object,
        required: true,
    },
    visibleInfo: {
        type: Object,
        required: true,
    }
})

function increaseItemInputForm() {
    props.increaseItemInputFormHandle(createItem())
}

function onChange() {
    props.initHandle()
}

</script>

<template>
    <div v-if="visibleInfo.inputType == 'equipments'">
        装備の直接入力欄
        <div v-for="item in itemHistory.getItems">
            <span v-for="property in itemProperties" :key="property.name">
                {{ property.label }}:<input v-model="item[property.name]" :size="property.size"
                    v-on:input="onChange"></input>
            </span>
        </div>
        <div v-on:click="increaseItemInputForm">装備の直接入力欄を増やす</div>
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