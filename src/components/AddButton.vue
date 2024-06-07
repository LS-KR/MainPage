<template>
    <div class="add">
        <button class="addButton" v-on:click="add()">
            +
        </button>
        <p class="addName">add...</p>
    </div>
</template>

<script lang="ts">
import { Shortcut } from '@/logic/data';
import Swal from 'sweetalert2';
import { Component, Vue } from 'vue-facing-decorator';

@Component({})
export default class AddButton extends Vue {
    add() {
        if (!localStorage.getItem('buttons')) {
            localStorage.setItem('buttons', '[]')
        }

        Swal.fire({
            title: "Shortcut Name",
            input: 'text'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Shortcut URL",
                    input: 'text'
                }).then((it) => {
                    if (it.isConfirmed) {
                        Swal.fire({
                            title: "Icon URL",
                            text: "Could be http:// or https:// or file://",
                            input: 'text'
                        }).then((e) => {
                            const buttons = JSON.parse(localStorage.getItem('buttons')) as Shortcut[]
                            buttons.push({
                                name: (result.value as string),
                                url: (it.value as string),
                                icon: (e.value as string)
                            })
                            localStorage.setItem('buttons', JSON.stringify(buttons))
                            location.reload()
                        })
                    }
                })
            }
        })
    }
}
</script>

<style lang="sass">
@import '@/css/colors/latte'

.add
    display: flex
    flex-direction: column
    align-items: center
    justify-self: center
    justify-content: center
    justify-items: center
    margin: 10px

.addButton
    transition: all 0.5s ease
    background: rgba(234, 234, 243, 0.75)
    width: 50px
    height: 50px
    margin-left: 20px
    margin-right: 20px
    border-style: none
    border-radius: 5px
    color: $text
    font-size: 20px

.addButton:hover
    transform: translateY(-5px)
    filter: drop-shadow(0px 10px 5px rgba(17, 17, 27, 0.125))

.addName
    color: $base
    font-size: small
</style>