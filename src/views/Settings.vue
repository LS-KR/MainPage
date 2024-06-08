<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="settingField" v-bind:id="fieldId">
        <div class="settingPlaceholder" />
        <button class="settingButton" v-on:click="toButtons()">
            <Icon class="settingIcon" icon="cil:3d" />
            <span class="settingCaption">Buttons</span>
        </button>
        <button class="settingButton" v-on:click="toTiles()">
            <Icon class="settingIcon" icon="cil:casino" />
            <span class="settingCaption">Tiles</span>
        </button>
    </div>
    <button class="scrollButton" v-on:click="show()">
        <Icon class="scrollButtonIcon" icon="ion:cog" />
        <span v-if="shown" class="scrollButtonCaption">Settings</span>
    </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { Icon } from '@iconify/vue';
import { randId } from '@/logic/helper';

@Component({ components: { Icon } })
export default class Settings extends Vue {
    fieldId: string;
    shown = false;

    created() {
        this.fieldId = randId('setting-field');
    }

    toButtons() {
        if (localStorage.getItem('tiles')) {
            localStorage.removeItem('tiles');
            location.reload();
        }
    }

    toTiles() {
        localStorage.setItem('tiles', '1');
        location.reload();
    }

    show() {
        if (this.shown) document.getElementById(this.fieldId).style.left = '-200px';
        else document.getElementById(this.fieldId).style.left = '0px';
        this.shown = !this.shown;
    }
}
</script>

<style lang="sass">
.settingField
    transition: all 0.5s ease
    position: fixed
    max-width: 200px
    height: 100vh
    width: calc(100% - 50px)
    left: -200px
    top: 0
    z-index: 3
    background-color: rgba(234, 234, 243, 0.65)
    display: flex
    flex-direction: column
    justify-content: start
    justify-items: start
    overflow: scroll

.settingPlaceholder
    display: flexbox
    width: 100%
    height: 7.5vh

.settingButton
    transition: all 0.5s ease
    width: 100%
    height: 30px
    display: flex
    flex-direction: row
    justify-content: space-between
    justify-items: stretch
    overflow: hidden
    background: transparent
    border-style: solid
    border-radius: 10px
    border-width: 1px
    border-color: #fab387
    margin: 5px 0

.settingButton:hover
    background: rgba(49, 50, 68, 0.25)

.settingIcon
    color: #fe640b
    width: 25px
    height: 25px

.settingCaption
    color: #4c4f69
    font-size: 20px

.scrollButton
    transition: all 0.5s ease
    border-style: none
    border-radius: 56562px
    background: transparent
    position: fixed
    left: 0px
    top: 0px
    display: flex
    z-index: 6
    flex-direction: row
    justify-items: center
    justify-items: center

.scrollButton:hover
    background: rgba(49, 50, 68, 0.25)

.scrollButtonIcon
    color: #fe640b
    width: 35px
    height: 35px
    display: block
    margin: 12.5px 10px

.scrollButtonCaption
    color: #4c4f69
    font-size: 24px
    display: inline-block
    margin-top: 15px
    margin-right: 15px

@media (prefers-color-scheme: dark)
    .settingField
        background-color: rgba(17, 17, 27, 0.65)
    .settingButton:hover
        filter: drop-shadow(0px 0px 20px #fab387)
    .settingCaption
        color: #cdd6f4
    .scrollButton:hover
        filter: drop-shadow(0px 0px 20px #fab387)
    .scrollButtonCaption
        color: #cdd6f4
</style>
