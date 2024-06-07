<template>
    <div class="balloon fly-to-top" v-bind:id="db">
        <img v-bind:src="sourceImg" class="balloonImg" v-bind:style="styles" />
    </div>
</template>

<script lang="ts">
import { randint, scheduledTask } from '@/logic/helper'
import { Component, Vue } from 'vue-facing-decorator'

@Component({ components: {} })
export default class Balloon extends Vue {
    db = 'ballon-qwq'
    sourceImg = 'https://one-among.us/favicon-large.png'
    styles = ''

    created() {
        this.db = 'balloon-' + randint(0, 2147483648).toString()
        this.sourceImg = `/img/balloons/balloon-${randint(0, 6)}.png`
    }

    mounted() {
        let left = Math.random() * (window.innerWidth - 100)
        document.getElementById(this.db).style.left = left.toString() + 'px'
        document.getElementById(this.db).style.bottom = randint(-1800, -100).toString() + 'px'

        document.getElementById(this.db).addEventListener('mouseover', (e) => {
            document.getElementById(this.db).remove()
        })

        scheduledTask(10000, () => {
            document.getElementById(this.db)?.remove()
        })
    }
}
</script>

<style lang="sass">
.balloon
    position: fixed
    left: 0
    bottom: -100px
    width: 100px
    height: 100px
    overflow: hidden

.balloonImg
    width: 100px
    height: 100px

.fly-to-top
    animation: fly-to-top 3.5s cubic-bezier(.39, .575, .565, 1.000)
    z-index: 2

@keyframes fly-to-top
    0%
      transform: translateY(0)
    100%
      transform: translateY(calc(-100vh - 2000px))
</style>
