<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="title">
        <img src="../assets/google.webp" class="googleIcon" />
        <h2 class="googleTitle" v-text="text" v-on:mouseover="showTime()" v-on:mouseleave="showMeow()"></h2>
    </div>
    <div class="search">
        <input
            class="searchInput"
            placeholder="Search with Google or enter address..."
            v-bind:id="searchId"
        />
        <button class="searchButton" v-on:click="search()">
            <Icon class="searchIcon" icon="ph:arrows-clockwise" />
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { randint, isURL, parseSearch } from '@/logic/helper'
import { Icon } from '@iconify/vue'

@Component({ components: { Icon } })
export default class Searching extends Vue {
    searchId = ''
    text = 'Meow~'

    created() {
        this.searchId = 'search-input-' + randint(0, 2147483647).toString()
    }

    mounted() {
        (document.getElementById(this.searchId) as HTMLInputElement).addEventListener(
            'keydown',
            (event) => {
                if (event.key == 'Enter') this.search()
            },
            false
        )
        
    }

    search() {
        const value = (document.getElementById(this.searchId) as HTMLInputElement).value
        if (isURL(value)) {
            if ((!value.startsWith('http://')) && (!value.startsWith('https://'))) open('http://' + value, '_blank')
            else open(value, '_blank')
        }
        else open(parseSearch(value), '_blank')
    }

    showTime() {
        const now = new Date()
        this.text = now.getHours() + ':' + now.getMinutes()
    }

    showMeow() {
        this.text = 'Meow~'
    }
}
</script>

<style lang="sass">
@import '@/css/colors/mocha'
@import '@/css/font-custom'

.title
    margin: auto
    align-self: center
    font-family: 'Hua'
    display: flex
    align-items: center
    flex-direction: row
    justify-content: center

.googleIcon
    display: inline-flex
    height: 100px
    width: 100px
    align-self: center

.googleTitle
    font-family: 'Hua'
    color: $mauve
    font-size: 80px
    padding: 20px
    margin: 20px
    display: inline-flex
    align-self: center

.search
    margin: auto
    align-self: center
    align-items: center
    display: flex
    flex-direction: row
    justify-self: center
    justify-content: center
    justify-items: center

.searchInput
    transition: all 1s ease
    margin: 5px
    background: rgba(234, 234, 243, 0.75)
    max-width: 600px
    width: calc(100vw - 90px)
    height: 50px
    border-style: solid
    border-width: 2px
    border-color: rgba(234, 234, 243, 0.5)
    border-radius: 5px
    box-sizing: border-box
    outline: none
    font-size: 15px

.searchInput:hover
    border-style: solid
    border-color: $blue
    border-width: 2px
    outline: none
    transform: translateY(-5px)
    filter: drop-shadow(0px 10px 5px rgba(17, 17, 27, 0.5))

.searchInput:focus
    border-style: solid
    border-color: $pink
    border-width: 2px
    user-select: none
    pointer-events: none
    outline: none
    transform: translateY(-5px)
    filter: drop-shadow(0px 10px 5px rgba(17, 17, 27, 0.5))

.searchButton
    transition: all 0.5s ease
    outline: none
    background: rgba(234, 234, 243, 0.75)
    width: 50px
    height: 50px
    border-style: none
    border-radius: 5px

.searchButton:hover
    transform: translateY(-5px)
    filter: drop-shadow(0px 10px 5px rgb(166 134 89 / 84%))
.searchIcon
    color: #dc8a78
    width: 25px
    height: 25px
</style>
