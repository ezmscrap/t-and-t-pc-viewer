<script setup>
/** 受け取るデータの型を定義 */
const props = defineProps({
    characterSheet: {
        type: Object,
        required: true,
    },
    initHandle: {
        type: Function,
        required: true,
    },
    visibleInfo: {
        type: Object,
        required: true,
    }
})

function onChange() {
    props.initHandle()
}
</script>

<template>
    <div v-if="visibleInfo.inputType == 'abilities'">
        個人情報と能力値の直接入力欄
        <div v-for="item in characterSheet" :key="item.name">
            <div v-if="item.type == 'input'">
                <span class="pc-input-label">{{ item.label }}</span>
                <input v-model="item.value" class="pc-input-form" v-on:input="onChange"></input>
            </div>
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