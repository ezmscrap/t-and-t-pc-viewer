<script setup>

import { getChatPalletValue, getCommand } from '../scripts/chatPallet.js'

/** 受け取るデータの型を定義 */
const props = defineProps({
    characterSheet: {
        type: Object,
        required: true,
    }
})

function copyToClipboard(text){
    if(navigator){
        if(navigator.clipboard){
            navigator.clipboard.writeText(text)
        }
    }
}



function importDataToClipboard() {
    const text = getChatPalletValue(props.characterSheet)
    copyToClipboard(text)
}

function commandStringToClipboard(){
    const text = getCommand(props.characterSheet)
    copyToClipboard(text)
}

</script>

<template>
    <div class="chat-pallet-form">
        <span v-on:click="importDataToClipboard">ココフォリアにコピペする文字列をクリップボードにコピーする</span>
        <div v-for="item in characterSheet" :key="item.name">
            <textarea v-if="item.name == 'chatPallet'" v-model="item.value"></textarea>
        </div>
        <span v-on:click="commandStringToClipboard">チャットパレット欄だけクリップボードにコピーする</span>
    </div>
</template>
