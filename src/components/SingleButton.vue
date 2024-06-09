<template>
    <div class="single">
        <button class="singleButton" v-on:click="jump()" v-bind:id="bindId">
            <img v-bind:src="src" class="singleIcon" />
        </button>
        <p class="singleName" v-text="name" />
    </div>
</template>

<script lang="ts">
import { Shortcut } from '@/logic/data';
import { randId } from '@/logic/helper';
import Swal from 'sweetalert2';
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component({})
export default class SingleButton extends Vue {
    @Prop({ required: true }) name: string;
    @Prop({ required: true }) target: string;
    @Prop({ required: true }) src: string;

    bindId = 'single-button-';

    created() {
        this.bindId = randId('single-button-');
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
@import '@/css/colors/latte'

div:has(.popup-blur)
    backdrop-filter: blur(10px)

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
    object-fit: contain
    margin-top: 7.5px

.singleName
    color: $base
    font-size: small

@media (prefers-color-scheme: dark)
    .singleButton
        background: rgba(21, 21, 12, 0.75)

    .singleButton:hover
        transform: none
        filter: drop-shadow(0px 0px 20px #f2cdcd)
</style>
