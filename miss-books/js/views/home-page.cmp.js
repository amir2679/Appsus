export default {
    template:`
        <section class="home-page">
            <img :src="getImg" alt="home-background"/>
            <button @click="goToGallery">Get started</button>
        </section>
    `,
    data() {
        return {
            imgIdx: 1,
            intervalKey: null
        }
    },
    computed: {
        getImg() {
            return `./img/background/home-page/${this.imgIdx}.jpg`
        },
    },
    methods: {
        goToGallery() {
            this.$router.push(`/bookApp`)
        }
    },
    created() {
        this.intervalKey = setInterval(() => {
            if (this.imgIdx >= 5) this.imgIdx = 0
            this.imgIdx++
        }, 5000)
    },
    unmounted() {
        clearInterval(this.intervalKey)
    },
}