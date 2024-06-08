<template>
    <div class="field" v-bind:style="fieldStyle">
        <SingleTile v-for="b of buttons" :key="b" :name="b[0]" :target="b[1]" :src="b[2]" />
        <AddTile />
    </div>
</template>

<script lang="ts">
import SingleTile from '@/components/SingleTile.vue';
import AddTile from '@/components/AddTile.vue';
import { Shortcut } from '@/logic/data';
import { Component, Vue } from 'vue-facing-decorator';

@Component({ components: { SingleTile, AddTile } })
export default class TileField extends Vue {
    shortcuts = [] as Shortcut[];
    buttons = [] as [string, string, string][];
    fieldStyle = '';

    created() {
        if (!localStorage.getItem('buttons')) return;
        this.shortcuts = JSON.parse(localStorage.getItem('buttons')) as Shortcut[];
        if (this.shortcuts.length > 9) this.fieldStyle = 'justify-items: start; justify-content: start; align-items: flex-start';
        for (const v of this.shortcuts) {
            this.buttons.push([v.name, v.url, v.icon]);
        }
    }
}
</script>

<style lang="sass">
.field
    margin: auto
    max-width: 900px
    align-self: center
    align-items: center
    display: flex
    flex-direction: row
    justify-self: center
    justify-content: center
    justify-items: center
    flex-direction: row
    flex-wrap: wrap
</style>
