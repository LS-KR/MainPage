<template>
    <div class="single">
        <button class="singleButton" v-on:click="jump()" v-bind:id="bindId">
            <img v-bind:src="src" class="singleIcon" />
        </button>
        <p class="singleName" v-text="name" />
    </div>
</template>

<script lang="ts">
import { Shortcut } from '@/logic/data'
import { randint } from '@/logic/helper'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class SingleButton extends Vue {
    @Prop({ required: true }) name: string
    @Prop({ required: true }) target: string
    @Prop({ required: true }) src: string

    bindId = 'single-button-'

    created() {
        this.bindId += randint(0, 2146483647).toString()
    }

    mounted() {
        document.getElementById(this.bindId).addEventListener(
            'mousedown',
            (event) => {
                console.log(event.which)
                if (event.which == 3) {
                    const buttons = JSON.parse(localStorage.getItem('buttons')) as Shortcut[]
                    const r = [] as Shortcut[]
                    for (const v of buttons) {
                        if (v.icon == this.src && v.name == this.name && v.url == this.target)
                            continue
                        else r.push(v)
                    }
                    localStorage.setItem('buttons', JSON.stringify(r))
                    window.location.reload()
                }
            },
            false
        )
    }

    jump() {
        window.open(this.target)
    }
}
</script>

<style lang="sass">
@import '@/css/colors/latte'

.single
    display: flex
    flex-direction: column
    align-items: center
    justify-self: center
    justify-content: center
    justify-items: center
    margin: 10px

.singleButton
    transition: all 0.5s ease
    background: rgba(234, 234, 243, 0.75)
    margin-left: 20px
    margin-right: 20px
    width: 50px
    height: 50px
    border-style: none
    border-radius: 5px

.singleButton:hover
    transform: translateY(-5px)
    filter: drop-shadow(0px 10px 5px rgba(17, 17, 27, 0.125))

.singleIcon
    margin: 5px
    width: 30px
    height: 30px

.singleName
    color: $base
    font-size: small
</style>
