<template>
    <div class="drop" />
    <div class="back" />
    <div class="filter">
        <div class="placeholder0" />
        <Searching class="searching" />
        <div class="placeholder1" />
        <ButtonField v-if="!isTile" :key="keyI" />
        <TileField v-else :key="keyJ" />
    </div>
    <Balloon v-for="i in isBirthday" :key="i" />
    <Settings />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import Searching from './components/Searching.vue';
import ButtonField from './views/ButtonField.vue';
import Balloon from './components/Balloon.vue';
import Settings from './views/Settings.vue';
import { randint } from './logic/helper';
import TileField from './views/TileField.vue';

@Component({ components: { Searching, ButtonField, Balloon, Settings, TileField } })
export default class App extends Vue {
    isBirthday = [] as number[];
    isTile = localStorage.getItem('tiles');
    keyI = 0;
    keyJ = 0;

    created() {
        const now = new Date();
        if (now.getDate() == 14 && now.getMonth() == 5) {
            for (let i = 0; i < 50; ++i) {
                this.isBirthday.push(randint(0, 2147483647));
            }
        }
    }

    mounted() {
        document.addEventListener(
            'add-order-item',
            (e) => {
                console.log(e);
                this.keyI += 1;
                this.keyJ += 1;
            },
            false
        );
    }
}
</script>

<style lang="sass" scoped>
@import './css/font-custom'

#app
    font-family: 'LXGW Wenkai', "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
    min-width: 100vw
    min-height: 100vh
</style>

<style lang="sass">
.drop
    z-index: -2
    position: fixed
    left: 0
    top: 0
    min-height: 100vh
    min-width: 100vw
    background: white

.back
    background-image: url(/img/background.jpg)
    filter: blur(10px)
    background-size: cover
    background-position: center
    min-height: 100vh
    min-width: 100vw
    position: fixed
    z-index: -1
    left: 0
    top: 0

.filter
    background-color: rgba(220, 224, 232, 0.25)
    min-width: 100vw
    min-height: 100vh
    position: absolute
    left: 0
    top: 0
    z-index: 1

.placeholder0
    min-height: 10vh
    width: 100%

.placeholder1
    min-height: 5vh
    width: 100%

.searching
    margin: auto

@media (prefers-color-scheme: dark)
    .drop
        background: rgb(30, 30, 34)
    .back
        filter: blur(10px)
        background-color: rgb(30, 30, 34)
        background-image: url(/img/background-dark.jpg)

    .filter
        background-color: rgba(30, 30, 34, 0.5)
</style>
