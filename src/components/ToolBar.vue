<script setup>
import { sheetTypes, inputTypes } from '../scripts/toolbar.js'

//受け取るデータの型を定義
const props = defineProps({
    visibleInfo: {
        type: Object,
        required: true,
    },
    toggleViewsHandle: {
        type: Function,
        required: true,
    }
})

function toggleViews() {
    props.toggleViewsHandle()
}
</script>

<template>
    <div class="pc-toolbar" v-if="visibleInfo.isToolbar">
        <div v-on:click="toggleViews">モード切替(シート -> 表 -> 入力)</div>
<!-- 今は暫定封印
        <div>
            <span v-for="sheetType in sheetTypes" :key="sheetType.value">
                <input type="radio" :id="sheetType.value" :value="sheetType.value" v-model="visibleInfo.sheetType" />
                <label :for="sheetType.value">{{ sheetType.label }}</label>
            </span>
        </div>
-->
        <div v-if="visibleInfo.isInputMode">
            <span v-for="inputType in inputTypes" :key="inputType.value">
                <input type="radio" :id="inputType.value" :value="inputType.value" v-model="visibleInfo.inputType" />
                <label :for="inputType.value">{{ inputType.label }}</label>
            </span>
        </div>

    </div>
</template>

<style scoped>
@import '../styles/toolbar.css';
</style>