<template>
    <button class="singleTile" v-on:click="jump()" v-bind:id="bindId">
        <img v-bind:src="src" class="singleTileIcon" />
        <p v-text="name" class="singleTileName" />
    </button>
</template>

<script lang="ts">
import { Shortcut } from '@/logic/data';
import { randId } from '@/logic/helper';
import Swal from 'sweetalert2';
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component({})
export default class SingleTile extends Vue {
    @Prop({ required: true }) name: string;
    @Prop({ required: true }) target: string;
    @Prop({ required: true }) src: string;

    bindId = 'single-tile-';

    created() {
        this.bindId = randId('single-tile');
    }

    mounted() {
        document.getElementById(this.bindId).addEventListener(
            'mousedown',
            (event) => {
                console.log(event.which);
                if (event.which == 3) {
                    Swal.fire({
                        title: 'Enter new shortcut name',
                        icon: 'question',
                        input: 'text',
                        showCloseButton: false,
                        showCancelButton: false,
                        showDenyButton: true,
                        showConfirmButton: true,
                        confirmButtonText: 'Confirm',
                        denyButtonText: 'Delete',
                        customClass: 'popup-blur',
                        inputValue: this.name
                    }).then((result) => {
                        if (result.isDenied) {
                            Swal.fire({
                                title: 'Are you sure to delete shortcut: ' + this.name + '?',
                                text: 'This action could not be restored.',
                                icon: 'warning',
                                confirmButtonText: 'Yes',
                                cancelButtonText: 'No',
                                showCancelButton: true,
                                showConfirmButton: true,
                                showDenyButton: false,
                                showCloseButton: false,
                                customClass: 'popup-blur'
                            }).then((it) => {
                                if (it.isConfirmed) {
                                    const buttons = JSON.parse(localStorage.getItem('buttons')) as Shortcut[];
                                    const r = [] as Shortcut[];
                                    for (const v of buttons) {
                                        if (v.icon == this.src && v.name == this.name && v.url == this.target) continue;
                                        else r.push(v);
                                    }
                                    localStorage.setItem('buttons', JSON.stringify(r));
                                    window.location.reload();
                                }
                            });
                        } else if (result.isConfirmed) {
                            Swal.fire({
                                title: 'Enter new shortcut url',
                                input: 'text',
                                showCloseButton: false,
                                showCancelButton: true,
                                showDenyButton: false,
                                showConfirmButton: true,
                                confirmButtonText: 'Confirm',
                                customClass: 'popup-blur',
                                inputValue: this.target
                            }).then((it) => {
                                if (it.isConfirmed) {
                                    Swal.fire({
                                        title: 'Enter new icon url',
                                        input: 'text',
                                        showCloseButton: false,
                                        showCancelButton: true,
                                        showDenyButton: false,
                                        showConfirmButton: true,
                                        confirmButtonText: 'Confirm',
                                        customClass: 'popup-blur',
                                        inputValue: this.src
                                    }).then((e) => {
                                        if (e.isConfirmed) {
                                            const buttons = JSON.parse(localStorage.getItem('buttons')) as Shortcut[];
                                            const r = [] as Shortcut[];
                                            for (const v of buttons) {
                                                if (v.icon == this.src && v.name == this.name && v.url == this.target)
                                                    r.push({
                                                        icon: e.value as string,
                                                        name: result.value as string,
                                                        url: it.value as string
                                                    });
                                                else r.push(v);
                                            }
                                            localStorage.setItem('buttons', JSON.stringify(r));
                                            document.dispatchEvent(new CustomEvent('add-order-item', { detail: JSON.stringify(this) }));
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            },
            false
        );
        document.oncontextmenu = (e) => {
            e.preventDefault();
        };
    }

    jump() {
        window.open(this.target);
    }
}
</script>

<style lang="sass">
div:has(.popup-blur)
    backdrop-filter: blur(10px)

.singleTile
    transition: all 0.5s ease
    display: inline
    width: 95px
    height: 95px
    margin: 2.5px
    background: rgba(17, 17, 27, 0.5)
    border-style: none
    border-width: 2px
    border-radius: 0px

.singleTile:hover
    filter: drop-shadow(0px 0px 20px #f5e0dc)

.singleTileIcon
    display: block
    margin-top: 30px
    margin-left: 30px
    margin-right: 30px
    margin-bottom: 0px
    width: 30px
    height: 30px
    object-fit: contain

.singleTileName
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
