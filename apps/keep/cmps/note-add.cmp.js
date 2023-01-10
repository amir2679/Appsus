import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteDetails from "./note-detalis.cmp.js"

export default {
    template: `
    <section class="add-note-container">
        <section class="add-note">
            <!-- <div class="add-input-container"> -->
                <input v-if="!isTodo" type="text" :placeholder="placeholder" v-model="txt"/>
                <div v-else class="todo-input-container">
                    <input type="text" placeholder="Enter label" v-model="label"/>
                    <input v-for="todo in todos" type="text" :placeholder="placeholder" v-model="todo.txt"/>
                    <span @click="addTodo">+</span>
                </div>
            <!-- </div> -->
            <div class="add-dropdown">
                <div class="add-actions hide-actions">
                    <span @click="addNote('note-txt')" title="Add Text"><i class="fa-solid fa-font"></i></span>
                    <span @click="addNote('note-img')" title="Add Img"><i class="fa-solid fa-image"></i></span>
                    <span @click="addNote('note-todo')" title="Add Todos"><i class="fa-sharp fa-solid fa-book-open"></i></span>
                    <span @click="addNote('note-video')" title="Add Video"><i class="fa-solid fa-video"></i></span>
                    <span @click="addNote('note-canvas')" title="Paint"><i class="fa-solid fa-paintbrush"></i></span>
                    <span @click="save" title="Save note">Save</span>
                </div>
                <span class="add-dropdown-btn"><i class="fa-sharp fa-solid fa-caret-down"></i></span>
            </div>
        </section>
    </section>
    `,
    data() {
        return {
            newNote: noteService.getEmptyNote('note-txt', false, { txt: this.txt }, null),
            txt: '',
            placeholder: 'Write Note...',
            isTodo: false,
            todos: [],
            label: ''
        }
    },
    created() {

    },
    methods: {
        addNote(type) {
            switch (type) {
                case 'note-txt':
                    this.isTodo = false
                    this.placeholder = 'Write Note...'
                    this.newNote = noteService.getEmptyNote('note-txt', false, { txt: '' }, null)
                    break
                case 'note-img':
                    this.isTodo = false
                    this.placeholder = 'Enter Image Url'
                    this.newNote = noteService.getEmptyNote('note-img', false, { url: '', title: '' }, null)
                    break
                case 'note-todo':
                    this.isTodo = true
                    this.placeholder = 'Write todo...'
                    this.newNote = noteService.getEmptyNote("note-todo", false, {
                        label: '',
                        todos: [{ txt: '', doneAt: null }]
                    })
                    break
                case 'note-video':
                    this.isTodo = false
                    this.placeholder = 'Enter Video Url'
                    this.newNote = noteService.getEmptyNote('note-video', false, { url: '', title: '' }, null)
                    break
                case 'note-canvas':
                    this.isTodo = false
                    this.$router.push(`/keep/canvas`)
                    break
            }
        },
        save() {
            if (this.newNote.type === 'note-img' || this.newNote.type === 'note-video') {
                this.newNote.info.url = this.txt
            }
            else if (this.newNote.type === 'note-todo') {
                console.log(this.todos);
                this.newNote.info.todos = this.todos
                this.newNote.info.label = this.label
            }
            else this.newNote.info.txt = this.txt

            noteService.save(this.newNote).then((note) => {
                console.log(note);
                showSuccessMsg(`Note ${note.id} Added...`)
                this.$emit('add', note)
                this.addNote(this.newNote.type)
                this.txt = ''
                this.todos = []
                this.label = ''
            })
        },
        addTodo() {
            this.newNote.info.todos.push({ txt: "", doneAt: null })
            this.todos.push({ txt: "", doneAt: null })
        }
    },
    computed: {

    },
    components: {
        noteDetails
    }

}