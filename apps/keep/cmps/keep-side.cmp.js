export default {
    template: `
        <nav class="keep-side">
            <div class="notes" @click="doActive(1)" :class="{'active': 1 === activeIdx}" >
                <span><i class="fa-solid fa-lightbulb"></i></span>
                <h3>Notes</h3>
            </div>
            <div class="reminders" @click="doActive(2)" :class="{'active': 2 === activeIdx}">
                <span><i class="fa-solid fa-bell"></i></span>
                <h3>Reminders</h3>
            </div>
            <div class="trash" @click="doActive(3)" :class="{'active': 3 === activeIdx}">
                <span><i class="fa-solid fa-trash"></i></span>
                <h3>Trash</h3>
            </div>
        </nav>
    `,
    data() {
        return {
            activeIdx: 1
        }
    },
    computed: {
        selected() {
            return activeIdx
        }
    },
    methods: {
        doActive(idx) {
            this.activeIdx = idx
            switch (idx) {
                case 1:
                    // this.$emit('goTo', '/keep')
                    break;
                case 3:
                    // this.$emit('goTo', '/keep/trash')
                    break;

                default:
                    break;
            }
        }
    },
}