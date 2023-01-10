import keepSide from "./keep-side.cmp.js"
import keepHeader from "./keep-header.cmp.js"
import notePreview from "./note-preview.cmp.js"

import { noteService } from '../services/note.service.js'

export default {
    template: `
    <keep-header/>
        <ul v-if="trashNotes" class="clean-list note-list">
            {{trashNotes}}
            <li v-for="note in trashNotes" :key="note.id">
                <note-preview :note="note" @click="pickNote(note)" @remove="remove" @togglePin="togglePin" />
            </li>
        </ul>
    <keep-side @goTo="goTo(to)"/>
    `,
    data() {
        return {
            notes: null,
            trashNotes: null
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
                this.trashNotes = this.notes.map(note => note.isTrash)
                console.log(this.trashNotes);
                console.log(this.notes);
                
            })

    },
    methods: {
        goTo(to) {
            // console.log('hi');
            this.$router.push(`/keep/${to}`)
        },
    },
    components: {
        keepSide,
        keepHeader,
        notePreview
    }
}