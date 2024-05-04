<script setup>

import { ref } from 'vue'

/** 受け取るデータの型を定義 */
const props = defineProps({
    fileData: {
        type: Object,
        required: true,
    },
    setImportHandle:{
        type: Function,
        required: true,
    }
})

//const fileContext=ref({})
function onDrop(event){
    if(!event){
        return
    }
    if (!event.dataTransfer) {
      return
    }

    if (event.dataTransfer.files.length === 0) {
      return
    }
    
    const file = event.dataTransfer.files[0]
    readFile(file)
}

function readFile(file){
    const fileReader = new FileReader()

    fileReader.onload = function() {
        //fileContext.value = fileReader.result
        props.setImportHandle(fileReader.result)
    }

    fileReader.readAsText(file)
}

function downloadFile(){
    const filename = 't-and-t-pc.json'
    const context = JSON.stringify(props.fileData.export)
    const blob = new Blob([context], { type: "application/json"})
    let link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
}
</script>

<template>
    <div class="download-zone" v-on:click="downloadFile">ここをクリックするとデータファイルをダウンロードします。</div>
  <div class="drop-zone" 
    @dragover.prevent="drag = true"
    @dragleave.prevent="drag = false"
    @drop.prevent="onDrop">
    <p>ここにファイルをドラッグ&ドロップすると内容を読み込みます。</p>
  </div>
</template>

<style scoped>
.drop-zone {
    color: #213547;
    background-color: #ffffff;
    width: 320px;
    height: 80px;
}
.download-zone {
    color: #213547;
    background-color: #ffffff;
    width: 320px;
    height: 40px;
}

.download-item {
    visibility: hidden;
}
</style>