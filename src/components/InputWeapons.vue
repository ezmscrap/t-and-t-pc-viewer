<script setup>
import { createWeapon, weaponProperties } from '../scripts/weapons.js'

/** 受け取るデータの型を定義 */
const props = defineProps({
    increaseWeaponInputFormHandle: {
        type: Function,
        required: true,
    },
    initHandle: {
        type: Function,
        required: true,
    },
    weaponHistory: {
        type: Object,
        required: true,
    },
    visibleInfo: {
        type: Object,
        required: true,
    }
})

function increaseWeaponInputForm() {
    props.increaseWeaponInputFormHandle(createWeapon())
}

function onChange() {
    props.initHandle()
}

</script>

<template>
    <div v-if="visibleInfo.inputType == 'weapons'">
        武器の直接入力欄
        <div v-for="item in weaponHistory.getItems">
            <span v-for="property in weaponProperties" :key="property.name">
                {{ property.label }}:<input v-model="item[property.name]" :size="property.size"
                    v-on:input="onChange"></input>
            </span>
        </div>
        <div v-on:click="increaseWeaponInputForm">武器の直接入力欄を増やす</div>
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