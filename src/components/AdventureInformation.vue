<script setup>
/** 受け取るデータの型を定義 */
const props = defineProps({
    combatInformation: {
        type: Object,
        required: true,
    }
})

</script>

<template>
    <div class="pc-adventure-information">
        <div>冒険時に必要な情報まとめ</div>
        <div v-for="line in combatInformation.lines">
            <span>{{ line }}</span>
        </div>
    </div>
</template>

<style scoped>
.pc-adventure-information {
    text-align: left;
    line-height: 24px;
    z-index: 1;
}
</style>