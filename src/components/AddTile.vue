<template>
    <button class="singleTile" v-on:click="add()" v-bind:id="bindId">
        <Icon class="addTileIcon" icon="ion:add-outline" />
        <p class="singleTileName">add...</p>
    </button>
    <Ordering v-if="ordering" :key="bindKey" />
</template>

<script lang="ts">
import { Shortcut } from '@/logic/data';
import Swal from 'sweetalert2';
import { Component, Vue } from 'vue-facing-decorator';
import { Icon } from '@iconify/vue';
import { randId } from '@/logic/helper';
import Ordering from '@/views/Ordering.vue';

@Component({ components: { Icon, Ordering } })
export default class AddTile extends Vue {
    ordering = false;
    bindId = '';
    bindKey = 0;

    created() {
        this.bindId = randId('add-tile');
    }

    mounted() {
        document.getElementById(this.bindId).addEventListener(
            'mousedown',
            (e) => {
                if (e.which == 3) this.ordering = true;
            },
            false
        );
        window.addEventListener(
            'storage',
            (e) => {
                this.bindKey += 1;
            },
            false
        );
    }

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
div:has(.popup-blur)
    backdrop-filter: blur(10px)

.addTile
    transition: all 0.5s ease
    display: inline
    width: 95px
    height: 95px
    margin: 2.5px
    background: rgba(17, 17, 27, 0.5)
    border-style: none
    border-width: 2px
    border-radius: 0px

.addTile:hover
    filter: drop-shadow(0px 0px 20px #f5e0dc)

.addTileIcon
    display: block
    margin-top: 30px
    margin-left: 30px
    margin-right: 30px
    margin-bottom: 0px
    width: 30px
    height: 30px
    object-fit: contain
    color: #cdd6f4

.addTileName
    display: block
    position: relative
    bottom: 0
    right: 0
    max-width: 100%
    overflow: hidden
    color: #cdd6f4
    font-size: small
    text-align: right
    white-space: nowrap
</style>
