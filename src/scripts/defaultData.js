
export const pcData = [
    {
        name: "name",
        label: "名前",
        type: "input",
        value: "サンプル・ボーイ",
        class: "pc-name pc-status"
    },
    {
        name: "nickname",
        label: "愛称",
        type: "input",
        value: "Sボーイ",
        class: "pc-nickname pc-status"
    },
    {
        name: "portrait",
        label: "肖像画",
        type: "input",
        value: import.meta.env.VITE_SAMPLE_PORTRAIT_URL,
        class: "pc-portrait"
    },
    {
        name: "race",
        value: "人間",
        label: "種族",
        type: "input",
        class: "pc-race pc-status"
    },
    {
        name: "level",
        value: "4",
        label: "レベル",
        type: "calculated",
        class: "pc-level pc-status"
    },
    {
        name: "type",
        label: "タイプ",
        type: "input",
        value: "戦士",
        class: "pc-type pc-status"
    },
    {
        name: "sex",
        label: "性別",
        type: "input",
        value: "男性",
        class: "pc-sex pc-status"
    },
    {
        name: "height",
        label: "身長",
        type: "input",
        value: "172cm",
        class: "pc-height pc-status"
    },
    {
        name: "weight",
        label: "体重",
        type: "input",
        value: "76kg",
        class: "pc-weight pc-status"
    },
    {
        name: "age",
        label: "年齢",
        type: "input",
        value: "17歳",
        class: "pc-age pc-status"
    },
    {
        name: "hairColor",
        label: "髪の色",
        type: "input",
        value: "黒",
        class: "pc-hairColor pc-status"
    },
    {
        name: "money",
        type: "calculated",
        value: 120,
        class: "pc-money pc-status"
    },
    {
        name: "initMoney",
        label: "初期所持金",
        type: "input",
        value: "120",
        class: "pc-money-init pc-status"
    },
    {
        name: "str",
        label: "体力度",
        chatPalletLabel: "STR",
        type: "input",
        value: "28",
        class: "pc-str pc-ability"
    },
    {
        name: "strCurrent",
        type: "calculated",
        value: "28",
        class: "pc-str-current pc-ability-current"
    },
    {
        name: "con",
        label: "耐久度",
        chatPalletLabel: "CON",
        type: "input",
        value: "13",
        class: "pc-con pc-ability"
    },
    {
        name: "conCurrent",
        type: "calculated",
        value: "13",
        class: "pc-con-current pc-ability-current"
    },
    {
        name: "dex",
        label: "器用度",
        chatPalletLabel: "DEX",
        type: "input",
        value: "12",
        class: "pc-dex pc-ability"
    },
    {
        name: "dexCurrent",
        type: "calculated",
        value: "12",
        class: "pc-dex-current pc-ability-current"
    },
    {
        name: "spd",
        label: "速度",
        chatPalletLabel: "SPD",
        type: "input",
        value: "9",
        class: "pc-spd pc-ability"
    },
    {
        name: "spdCurrent",
        type: "calculated",
        value: "9",
        class: "pc-spd-current pc-ability-current"
    },
    {
        name: "lk",
        label: "幸運度",
        chatPalletLabel: "LK",
        type: "input",
        value: "10",
        class: "pc-lk pc-ability"
    },
    {
        name: "lkCurrent",
        type: "calculated",
        value: "10",
        class: "pc-lk-current pc-ability-current"
    },
    {
        name: "iq",
        label: "知性度",
        chatPalletLabel: "IQ",
        type: "input",
        value: "7",
        class: "pc-iq pc-ability"
    },
    {
        name: "iqCurrent",
        type: "calculated",
        value: "7",
        class: "pc-iq-current pc-ability-current"
    },
    {
        name: "wiz",
        label: "魔力度",
        chatPalletLabel: "WIZ",
        type: "input",
        value: "8",
        class: "pc-wiz pc-ability"
    },
    {
        name: "wizCurrent",
        type: "calculated",
        value: "8",
        class: "pc-wiz-current pc-ability-current"
    },
    {
        name: "cha",
        label: "魅力度",
        chatPalletLabel: "CHA",
        type: "input",
        value: "9",
        class: "pc-cha pc-ability"
    },
    {
        name: "chaCurrent",
        type: "calculated",
        value: "9",
        class: "pc-cha-current pc-ability-current"
    },
    {
        name: "combatCorrectionValue",
        type: "calculated",
        value: '0',
        class: "pc-combat-value pc-value"
    },
    {
        name: "combatDice",
        type: "calculated",
        value: '0',
        class: "pc-combat-dice pc-value"
    },
    {
        name: "combatInformation",
        type: "calculated",
        value: [],
        class: "pc-combat-information pc-detail"
    },
    {
        name: "adventurePoints",
        type: "calculated",
        value: "0",
        class: "pc-adventure-points pc-status"
    },
    {
        name: "loadLimit",
        type: "calculated",
        value: "2000",
        class: "pc-load-limit pc-status"
    },
    {
        name: "loadCurrent",
        type: "calculated",
        value: "1365",
        class: "pc-load-current pc-status"
    },
    {
        name: "talents",
        type: "calculated",
        value: '飲み比べ',
        class: "pc-talents pc-status"
    },
    {
        name: "weapons",
        type: "calculated",
        value: 'スタンダードソード(ダイス修正:+4d6)、ターゲットシールド(防御点:+4)、ブレスト・プレート(防御点:+4)',
        class: "pc-weapons pc-status"
    },
    {
        name: "equipments",
        type: "calculated",
        value: '冒険者の基本セット(背負い袋、食料袋(1日)、水袋(満タン)、マッチx5、たいまつx5、より糸x9m、チョークx2)',
        class: "pc-equipments pc-status"
    },
    {
        name: "spells",
        type: "calculated",
        value: '',
        class: "pc-spells pc-status"
    },
    {
        label: "メモ",
        name: "memo",
        type: "input",
        value: '',
        class: "pc-memo pc-status"
    },
    {
        name: "chatPallet",
        type: "calculated",
        value: '',
        class: "pc-chat-pallet"
    }
]

export const weapons = {
    getItems: [
        {
            name: "スタンダードソード",
            type: "weapon",
            dice: "+4d6",
            armorValue: "",
            needStr: "12",
            needDex: "12",
            decreaseDex: "0",
            price: "60",
            weight: "70",
            equipments: "true",
            lost: "false",
            memo: "",
        },
        {
            name: "親から貰った機能的な短剣",
            type: "weapon",
            dice: "+2d6",
            armorValue: "",
            needStr: "1",
            needDex: "1",
            decreaseDex: "0",
            price: "10",
            weight: "10",
            equipments: "false",
            lost: "false",
            memo: "",
        },
        {
            name: "ターゲットシールド",
            type: "armor",
            dice: "",
            armorValue: "+4",
            needStr: "10",
            needDex: "8",
            decreaseDex: "0",
            price: "40",
            weight: "350",
            equipments: "true",
            lost: "false",
            memo: "",
        },
        {
            name: "親から貰ったブレスト・プレート",
            type: "armor",
            dice: "",
            armorValue: "+4",
            needStr: "2",
            needDex: "0",
            decreaseDex: "0",
            price: "0",
            weight: "45",
            equipments: "true",
            lost: "false",
            memo: "",
        },
    ]
}

export const items = {
    getItems: [
        {
            name: "背負い袋",
            price: "1",
            priceSp: "5",
            priceCp: "0",
            weight: "20",
            lost: "false",
            memo: "",
        },
        {
            name: "食料袋(1日分)",
            price: "2",
            priceSp: "0",
            priceCp: "0",
            weight: "15",
            lost: "false",
            memo: "",
        },
        {
            name: "水袋(満タン)",
            price: "0",
            priceSp: "6",
            priceCp: "0",
            weight: "40",
            lost: "false",
            memo: "",
        },
        {
            name: "火打石と打ち金",
            price: "0",
            priceSp: "4",
            priceCp: "0",
            weight: "2",
            lost: "false",
            memo: "",
        },
        {
            name: "松明(トーチ)",
            price: "0",
            priceSp: "1",
            priceCp: "0",
            weight: "2",
            lost: "false",
            memo: "1本で10ターン",
        },
        {
            name: "より糸(9m)",
            price: "1",
            priceSp: "0",
            priceCp: "0",
            weight: "1",
            lost: "false",
            memo: "",
        },
        {
            name: "チョーク(10本)",
            price: "0",
            priceSp: "2",
            priceCp: "0",
            weight: "1",
            lost: "false",
            memo: "",
        },
        {
            name: "チョーク(10本)",
            price: "0",
            priceSp: "2",
            priceCp: "0",
            weight: "1",
            lost: "true",
            memo: "",
        },
    ],
}

export const spells = {
    getItems: [
        {
            name: "《これでもくらえ!》",
            level: "1",
            duration: "一瞬",
            consumption: "6",
            distance: "60mまでの視線上",
            range: "なし",
            memo: "目標1体に<知性度>点のダメージ。レベルアップ効果でダメージ2倍",
        },
        {
            name: "《敵を知れ》",
            level: "1",
            duration: "一瞬",
            consumption: "5",
            distance: "術者のレベルごとに6m",
            range: "なし",
            memo: "目標1体のモンスターレートが分かる。レベルアップ効果なし",
        },
        {
            name: "《開け》",
            level: "1",
            duration: "一瞬",
            consumption: "3",
            distance: "接触",
            range: "なし",
            memo: "扉を開く。レベルアップ効果はレベルに応じた錠前を開く",
        }
    ],
}

export const talents = {
    getItems: [
        {
            name: "飲み比べ",
            rank: "新米",
            savingRoleBonus: "+3",
            memo: "",
        },
        {
            name: "野営",
            rank: "新米",
            savingRoleBonus: "+3",
            memo: "",
        },
        {
            name: "釣り",
            rank: "新米",
            savingRoleBonus: "+3",
            memo: "",
        }
    ],
}

export const moneys = {
    getItems: [
        {
            deposit : "30",
            depositSp : "20",
            depositCp : "10",
            withdraw: "",
            withdrawSp: "",
            withdrawCp: "",
            memo: "テスト入金",
        },
        {
            deposit : "",
            depositSp : "",
            depositCp : "",
            withdraw: "30",
            withdrawSp: "20",
            withdrawCp: "10",
            memo: "テスト出金",
        }
    ],
}

export const adventurePoints = {
    getItems: [
        {
            deposit : "1000",
            withdraw: "",
            memo: "テスト冒険点-入手",
        },
        {
            deposit : "",
            withdraw: "1000",
            memo: "テスト冒険点-消費",
        }
    ],
}
