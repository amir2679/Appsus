import noteTxtDetails from "./note-txt-details.cmp.js"
import noteImgDetails from "./note-img-details.cmp.js"
import noteTodoDetails from "./note-todo-details.cmp.js"
import noteEditToolbar from "./note-edit-toolbar.cmp.js"
import noteCanvasDetails from "./note-canvas-details.cmp.js"
import noteVideoDetails from "./note-video-details.cmp.js"
import noteAudioDetails from "./note-audio-details.cmp.js"


import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

export default {
    props: ['note'],
    template: `
    <section v-if="note" class="note-details" :class="setColor">
        <component :is="note.type + '-details'" :note="note" :save="save">
        </component>
        <note-edit-toolbar :note="note" :isDetails="true" @changeColor="changeColor" 
        @remove="remove" @close="close" @togglePin="togglePin" 
        @makeCopy="makeCopy" class="details-toolbar"/>
    </section>
    `,
    data() {
        return {
            todos: []
        }
    },
    created() {
        // console.log(this.note)
    },
    components: {
        noteTxtDetails,
        noteImgDetails,
        noteEditToolbar,
        noteTodoDetails,
        noteCanvasDetails,
        noteVideoDetails,
        noteAudioDetails

    },
    methods: {
        close(note) {
            noteService.save(note).then(() => {
                this.note.isPicked = false
                this.$router.push(`/keep`)
            })
        },
        changeColor(color) {
            this.note.color = color
            noteService.save(this.note).then(() => console.log('saved color'))
        },
        remove(id) {
            noteService.remove(id).then(() => {
                this.$router.push(`/keep`)
                showSuccessMsg(`Note ${id} Deleted...`)
                this.$emit('remove', id)
            })
        },
        loadNote() {
            // console.log('hi');
            const id = this.$route.params.id
            noteService.get(id).then(note => this.note = note)
        },
        togglePin(note) {
            noteService.save(note).then((note) => {
                note.isPinned ? showSuccessMsg(`Note ${note.id} Pined...`) : showSuccessMsg(`Note ${note.id} Unpinned...`)
                this.$emit('togglePin', note)
            })
        },
        save(note) {
            console.log('hi');
            noteService.save(note)
        },
    },
    computed: {
        // noteId() {
        //     return this.$route.params.id
        // },
        setColor() {
            return this.note.color
        }
    },
}