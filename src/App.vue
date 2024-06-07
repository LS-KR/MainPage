<template>
    <div class="back" />
    <div class="filter">
        <div class="placeholder0" />
        <Searching class="searching" />
        <div class="placeholder1" />
        <ButtonField />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import Searching from './components/Searching.vue'
import ButtonField from './components/ButtonField.vue';

@Component({ components: { Searching, ButtonField } })
export default class App extends Vue {}
</script>

<style lang="sass" scoped>
@import './css/font-custom'

#app
    font-family: 'LXGW Wenkai', "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
    min-width: 100vw
    min-height: 100vh
</style>

<style lang="sass">

.back
    background-image: url(/background.jpg)
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
</style>
