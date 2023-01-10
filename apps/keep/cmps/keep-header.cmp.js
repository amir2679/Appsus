export default {
    template: `
        <section class="keep-header">
        <div class="side-container">
            <span @click="toggleSide"><i class="fa-solid fa-bars"></i></span>
            <img src="../../apps/keep/imgs/logo.png" alt="" />
                <h1>Keep</h1>
            </div>
            <input type="search" placeholder="Search..." v-model="filterBy.txt" @input="filter"/>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: ''
            },
            isSideActive: false
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        toggleSide() {
            this.isSideActive = !this.isSideActive
            this.$emit('toggleSide', this.isSideActive)
        }
    }
}