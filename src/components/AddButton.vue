<template>
    <div class="add">
        <button class="addButton" v-on:click="add()">
            <Icon class="addIcon" icon="ion:add-outline" />
        </button>
        <p class="addName">add...</p>
    </div>
</template>

<script lang="ts">
import { Shortcut } from '@/logic/data';
import Swal from 'sweetalert2';
import { Component, Vue } from 'vue-facing-decorator';
import { Icon } from '@iconify/vue';

@Component({ components: { Icon } })
export default class AddButton extends Vue {
    add() {
        if (!localStorage.getItem('buttons')) {
            localStorage.setItem('buttons', '[]');
        }

        Swal.fire({
            title: 'Shortcut Name',
            input: 'text',
            customClass: 'popup-blur'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Shortcut URL',
                    input: 'text',
                    customClass: 'popup-blur'
                }).then((it) => {
                    if (it.isConfirmed) {
                        Swal.fire({
                            title: 'Icon URL',
                            text: 'Could be http:// or https:// or file://',
                            input: 'text',
                            customClass: 'popup-blur'
                        }).then((e) => {
                            const buttons = JSON.parse(localStorage.getItem('buttons')) as Shortcut[];
                            buttons.push({
                                name: result.value as string,
                                url: it.value as string,
                                icon: e.value as string
                            });
                            localStorage.setItem('buttons', JSON.stringify(buttons));
                            location.reload();
                        });
                    }
                });
            }
        });
    }
}
</script>

<style lang="sass">
@import '@/css/colors/latte'

div:has(.popup-blur)
    backdrop-filter: blur(10px)

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

.addIcon
    color: $text
    width: 30px
    height: 30px
    margin: auto
    margin-top: 5px

.addName
    color: $base
    font-size: small

@media (prefers-color-scheme: dark)
    .addButton
        background: rgba(21, 21, 12, 0.75)

    .addButton:hover
        transform: none
        filter: drop-shadow(0px 0px 20px #f2cdcd)
    
    .addIcon
        color: $surface2
</style>
