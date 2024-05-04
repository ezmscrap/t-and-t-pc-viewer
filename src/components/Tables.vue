<script setup>
import { weaponProperties } from '../scripts/weapons.js'
import { itemProperties } from '../scripts/items.js'
import { talentProperties } from '../scripts/talents.js'
import { spellProperties } from '../scripts/spells.js'

//受け取るデータの型を定義
const props = defineProps({
    characterSheet: {
        type: Object,
        required: true,
    },
    weaponHistory: {
        type: Object,
        required: true,
    },
    itemHistory: {
        type: Object,
        required: true,
    },
    talentArray: {
        type: Object,
        required: true,
    },
    spellArray: {
        type: Object,
        required: true,
    }
})

const tables = [
    {
        label: '武器一覧',
        data: props.weaponHistory.getItems,
        columns: weaponProperties
    },
    {
        label: '装備一覧',
        data: props.itemHistory.getItems,
        columns: itemProperties
    },
    {
        label: 'スペル一覧',
        data: props.spellArray.getItems,
        columns: spellProperties
    },
    {
        label: 'タレント一覧',
        data: props.talentArray.getItems,
        columns: talentProperties
    },
]
</script>

<template>
    <div v-for="tableItem in tables" :key="tableItem.label">
        <div>{{ tableItem.label }}</div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th v-for="columnItem in tableItem.columns" :key="columnItem.name">
                            {{ columnItem.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(dataItem, index) in tableItem.data" :key="index">
                        <td v-for="columnItem in tableItem.columns" :key="index + '-' + columnItem.name">
                            {{ dataItem[columnItem.name] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
table {
    border-collapse: collapse;
    font-size: small;
}

table,
th,
td {
    border: 1px solid;
}
</style>