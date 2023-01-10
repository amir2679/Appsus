export default {
    template: `
        <section class="about-page">     
            <div>
                <img :src="getImg" alt="about-background"/>
                <button>Contact Our Team</button>
            </div>
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
            return `./img/background/about-page/${this.imgIdx}.jpg`
        },
    },
    created() {
        this.intervalKey = setInterval(() => {
            if (this.imgIdx >= 3) this.imgIdx = 0
            this.imgIdx++
        }, 5000)
    },
    unmounted() {
        clearInterval(this.intervalKey)
    },
}