<template>
    <div class="orderItem">
        <p v-text="name" class="orderName" />
        <div class="buttons">
            <button class="orderButton" v-on:click="up()">
                <Icon class="orderIcon" icon="mynaui:chevron-up" />
            </button>
            <button class="orderButton" v-on:click="down()">
                <Icon class="orderIcon" icon="mynaui:chevron-down" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import { Icon } from '@iconify/vue';
import { Shortcut } from '@/logic/data';

@Component({ components: { Icon } })
export default class OrderItem extends Vue {
    @Prop({ required: true }) name: string;
    @Prop({ required: true }) src: string;
    @Prop({ required: true }) target: string;

    up() {
        const shortcuts = JSON.parse(localStorage.getItem('buttons')) as Shortcut[];
        let s = shortcuts[0];
        if (s.name == this.name && s.url == this.target && s.icon == this.src) return;
        const r = [] as Shortcut[];
        for (let i = 0; i < shortcuts.length; ++i) {
            s = shortcuts[i];
            if (s.name == this.name && s.url == this.target && s.icon == this.src) {
                r.push(shortcuts[i - 1]);
                continue;
            }
            if (i != shortcuts.length - 1) {
                s = shortcuts[i + 1];
                if (s.name == this.name && s.url == this.target && s.icon == this.src) {
                    r.push(s);
                    continue;
                }
            }
            r.push(shortcuts[i]);
        }
        localStorage.setItem('buttons', JSON.stringify(r));

        document.dispatchEvent(new CustomEvent('update-order-item', { detail: JSON.stringify(this) }));
    }

    down() {
        const shortcuts = JSON.parse(localStorage.getItem('buttons')) as Shortcut[];
        let s = shortcuts[shortcuts.length - 1];
        if (s.name == this.name && s.url == this.target && s.icon == this.src) return;
        const r = [] as Shortcut[];
        for (let i = 0; i < shortcuts.length; ++i) {
            s = shortcuts[i];
            if (s.name == this.name && s.url == this.target && s.icon == this.src) {
                r.push(shortcuts[i + 1]);
                continue;
            }
            if (i != 0) {
                s = shortcuts[i - 1];
                if (s.name == this.name && s.url == this.target && s.icon == this.src) {
                    r.push(s);
                    continue;
                }
            }
            r.push(shortcuts[i]);
        }
        localStorage.setItem('buttons', JSON.stringify(r));

        document.dispatchEvent(new CustomEvent('update-order-item', { detail: JSON.stringify(this) }));
    }
}
</script>

<style lang="sass">
.orderItem
    transition: all 0.5s ease
    width: 360px
    height: 24px
    margin: 5px
    display: flex
    flex-direction: row
    justify-content: space-between
    justify-items: stretch
    background: #eff1f5
    padding: 0px 5px
    border-style: solid
    border-width: 2px
    border-radius: 7.5px
    border-color: #e6e9ef

.orderItem:hover
    border-color: #7287fd

.orderName
    display: inline-flex
    overflow: hidden
    text-align: left
    font-size: 16px
    color: #4c4f69
    margin: 2px 5px

.buttons
    display: inline-flex
    flex-direction: row
    flex-wrap: nowrap
    width: 54px
    gap: 6px
    margin: 0px 6px

.orderButton
    margin: 0px
    transition: all 0.5s ease
    display: inline-flex
    width: 24px
    height: 24px
    border-style: solid
    border-color: transparent
    background: transparent
    border-radius: 5px
    overflow: visible

.orderButton:hover
    filter: drop-shadow(0px 0px 5px #7287fd)

.orderIcon
    transition: all 0.5s ease
    color: #1e66f5
    min-width: 24px
    height: 24px
    margin-top: -2px
    margin-left: -6px

.orderIcon:hover
    filter: drop-shadow(0px 0px 5px #7287fd)

@media (prefers-color-scheme: dark)
    .orderItem
        background: #313244
        border-color: #171727

    .orderItem:hover
        border-color: #fab387

    .orderName
        color: #cdd6f4

    .orderIcon
        color: #eba0ac

    .orderIcon:hover
        filter: drop-shadow(0px 0px 5px #f9e2af)
</style>
