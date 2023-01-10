import notePreview from "./note-preview.cmp.js"
import noteDetalis from "./note-detalis.cmp.js"

// import { noteService } from '../services/note.service.js'

export default {
    props: ['notes'],
    template: `
    <section class="note-list-container">
        <ul v-if="pinnedNotes" class="clean-list note-list pinned">
                <li v-for="pinnedNote in pinnedNotes" :key="pinnedNote.id">
                        <note-preview :note="pinnedNote" @click="pickNote(pinnedNote)" @remove="remove" @togglePin="togglePin" />
                        <!-- <note-detalis v-if="pinnedNote.isPicked" class="note-details" :note="pinnedNote" @save="save(pinnedNote)"/> -->
                </li>
        </ul>
            <ul class="clean-list note-list" @drop="onDrop" dropabble="true">
                <li v-for="note in notes" :key="note.id" :id="note.id" 
                draggable="true" @dragstart="startDrag($event, note)" @dragenter.prevent @dragover.prevent>
                        <note-preview v-if="!note.isTrash" :note="note" @click="pickNote(note)" @remove="remove" @togglePin="togglePin" @makeCopy="makeCopy" />
                        <!-- <note-detalis v-if="note.isPicked" class="note-details" :note="note" @save="save(note)"/> -->
                </li>
            </ul>
        </section>
        <router-view :note="pickedNote" @remove="remove" @togglePin="togglePin"></router-view>
    `,
    data() {
        return {
            pinnedNotes: null,
            isDetails: false,
            pickedNote: null
        }
    },
    created() {
        console.log(this.notes.length);
        this.pinnedNotes = []
        this.notes.forEach((note, index) => {
            note.isPicked = false
            if (note.isPinned) {
                const pinnedNote = this.notes.splice(index, 1)[0]
                this.pinnedNotes.push(pinnedNote)
                console.log(this.pinnedNotes);
            }
        })
    },
    mounted() {
        // const target = document.querySelector('.note-preview');
    },
    methods: {
        test() {
            console.log('hi')
        },
        pickNote(note) {
            note.isPicked = true
            // console.log(note);
            this.$router.push(`/keep/${note.id}`)
            this.pickedNote = note
        },
        save(note) {
            this.$emit('save', note)
        },
        remove(id) {
            const idx = this.notes.findIndex(note => note.id === id)
            // this.notes[idx].isTrash = true
            const removedNote = this.notes.splice(idx, 1)[0]
            // this.$emit('addToTrash', removedNote)
        },
        togglePin(pinnedNote) {
            if (pinnedNote.isPinned) {
                console.log('pin');
                const idx = this.notes.findIndex(note => pinnedNote.id === note.id)
                this.notes.splice(idx, 1)
                this.pinnedNotes.unshift(pinnedNote)
            }
            else {
                console.log('unpin');
                const idx = this.pinnedNotes.findIndex(note => pinnedNote.id === note.id)
                this.pinnedNotes.splice(idx, 1)
                this.notes.unshift(pinnedNote)
            }
        },
        makeCopy(copy) {
            this.notes.unshift(copy)
        },
        startDrag(ev, note) {
            console.log(ev);
            // console.log(ev.DataTransfer.setData('itemID', note.id));
            ev.dataTransfer.dropEffect = 'move'
            ev.dataTransfer.effectAllowed = 'move'
            ev.dataTransfer.setData('itemID', note.id)
            console.log(ev.dataTransfer.items);
        },


    },
    components: {
        notePreview,
        noteDetalis,
    }

}