<template>
    <div class="field">
        <SingleButton v-for="b of buttons" :key="b" :name="b[0]" :target="b[1]" :src="b[2]" />
        <AddButton />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import SingleButton from '../components/SingleButton.vue';
import AddButton from '../components/AddButton.vue';
import { Shortcut } from '@/logic/data';

@Component({ components: { SingleButton, AddButton } })
export default class ButtonField extends Vue {
    shortcuts = [] as Shortcut[];
    buttons = [] as [string, string, string][];

    created() {
        if (!localStorage.getItem('buttons')) return;
        this.shortcuts = JSON.parse(localStorage.getItem('buttons')) as Shortcut[];
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
