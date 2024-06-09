<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="od">
        <div class="ordering">
            <OrderItem v-for="i of items" :key="i" :name="i[0]" :target="i[1]" :src="i[2]" />
        </div>
        <button class="confirmOrder" v-on:click="reload()">Confirm</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import OrderItem from '@/components/OrderItem.vue';
import { Shortcut } from '@/logic/data';

@Component({ components: { OrderItem } })
export default class Ordering extends Vue {
    shortcuts = [] as Shortcut[];
    items = [] as [string, string, string][];

    created() {
        this.shortcuts = JSON.parse(localStorage.getItem('buttons')) as Shortcut[];
        for (const v of this.shortcuts) {
            this.items.push([v.name, v.url, v.icon]);
        }
    }

    mounted() {
        window.addEventListener(
            'storage',
            (e) => {
                this.shortcuts = JSON.parse(localStorage.getItem('buttons')) as Shortcut[];
                this.items = [];
                for (const v of this.shortcuts) {
                    this.items.push([v.name, v.url, v.icon]);
                }
                this.$forceUpdate()
            },
            false
        );
    }

    reload() {
        location.reload();
    }
}
</script>

<style lang="sass">
.od
    width: 400px
    height: 600px
    padding: 50px 10px
    background-color: rgba(220, 224, 232, 0.85)
    border-radius: 10px
    border-style: none
    display: flex
    flex-direction: column
    justify-content: start
    justify-items: start
    position: fixed
    z-index: 4
    left: calc(50% - 200px)
    top: calc(50% - 300px)

.ordering
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    overflow: scroll
    margin: 5px
    height: 560px

.confirmOrder
    transition: all 0.5s ease
    background: transparent
    border-style: solid
    border-width: 2px
    border-color: #1e66f5
    font-size: 20px
    border-radius: 56562px
    color: #4c4f69

.confirmOrder:hover
    background: rgba(140, 143, 161, 0.5)
    filter: drop-shadow(0px 0px 10px #7287fd)
    
</style>
