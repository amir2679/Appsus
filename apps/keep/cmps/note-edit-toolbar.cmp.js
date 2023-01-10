// import colorPalate from "./color-palate.cmp.js"

export default {
    props: ['note', 'isDetails'],
    template: `
        <section class="toolbar">
            <span class="options-btn" @click.stop="toggleMore" title="More"><i class="fa-solid fa-ellipsis-vertical"></i>
                <div v-if="isMore" class="options-bar">
                    <span @click="remove" title="Delete">Delete</span>
                    <span v-if="!isDetails" @click="makeCopy" title="Make copy">Copy</span>
                </div>
            </span>
            <span title="Change color" @click.stop="palateClicked" class="changeColor"><i class="fa-solid fa-palette"></i></span>
            <span title="Pin" @click.stop="togglePin"><i class="fa-solid fa-thumbtack"></i></span>
            <span title="Move To Archive" @click.stop><i class="fa-solid fa-box-archive"></i></span>
            <span v-if="isDetails" title="Close and save" @click="close"><i class="fa-solid fa-x"></i></span>
            <!-- <span v-if="isDetails" @click="save">Save</span> -->

            <!-- note.isMouseOver &&  -->
            <div v-if="note.ispalateClicked" class="color-palate" @click.stop="" >
                <div @click.stop="changeColor(color.split('#')[1])" v-for="color in colors" class="color" :class="color.split('#')[1]">
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            ispalateClicked: false,
            colors: ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e8eaed'],
            colorPicked: null,
            isMore: false
        }
    },
    methods: {
        palateClicked() {
            // this.ispalateClicked =
            this.note.ispalateClicked = true
        },
        changeColor(color) {
            // this.ispalateClicked = false
            this.note.ispalateClicked = false
            this.$emit('changeColor', color)
            console.log(color);
        },
        togglePin() {
            // console.log(this.note.isPinned);
            this.note.isPinned = !this.note.isPinned
            // console.log(this.note.isPinned);
            this.$emit('togglePin', this.note)
        },
        toggleMore() {
            this.isMore = !this.isMore
        },
        remove() {
            this.$emit('remove', this.note.id)
        },
        close() {
            this.$emit('close', this.note)
        },
        save() {
            this.$emit('save')
        },
        makeCopy() {
            if (this.isDetails) this.$emit('makeCopy', this.note)
            else {
                const copy = JSON.parse(JSON.stringify(this.note))
                this.$emit('makeCopy', copy)
            }
        }

    },
    computed: {
    },
    components: {
        // colorPalate
    }

}