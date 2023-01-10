import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteEditToolbar from "./note-edit-toolbar.cmp.js"
import noteTodo from "./note-todo.cmp.js"
import noteCanvas from "./note-canvas.cmp.js"
import noteAudio from "./note-audio.cmp.js"

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export default {
    props: ['note'],
    template: `
        <article class="note-preview" :class="setColor" @mouseleave="isMouseOver(false)" @mouseover="isMouseOver(true)">
            <component :is="note.type" :note="note" @save="save">
            </component>
            <note-edit-toolbar :note="note" @changeColor="changeColor" @remove="remove" @togglePin="togglePin" @makeCopy="makeCopy"/>
        </article>
    `,
    data() {
        return {
            color: null,
            hover: false
        }
    },
    methods: {
        updateTodo(note) {
            noteService.save(note).then(() => console.log('saved todo'))
        },
        changeColor(color) {
            this.note.color = color
            noteService.save(this.note).then(() => console.log('saved color'))
        },
        remove(id) {
            noteService.remove(id).then(() => {
                showSuccessMsg(`Note ${id} Deleted...`)
                this.$emit('remove', id)
            })
        },
        isMouseOver(isOver) {
            // console.log(isOver);
            this.note.isMouseOver = isOver
            if (!isOver) this.note.ispalateClicked = false
        },
        togglePin(note) {
            noteService.save(note).then((note) => {
                console.log('saved');
                note.isPinned ? showSuccessMsg(`Note ${note.id} Pined...`) : showSuccessMsg(`Note ${note.id} Unpinned...`)
                this.$emit('togglePin', note)
            })
        },
        save(note) {
            console.log(note);
            // noteService.save(note)
        },
        makeCopy(copy) {
            copy.id = ''
            noteService.save(copy).then(() => {
                console.log('saved');
                showSuccessMsg(`Note Copied`)
                this.$emit('makeCopy', copy)
            })
        }

    },
    computed: {
        setColor() {
            return this.note.color
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteEditToolbar,
        noteVideo,
        noteTodo,
        noteCanvas,
        noteAudio
    }
}