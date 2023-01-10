import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteList from './note-list.cmp.js'
import noteAdd from './note-add.cmp.js'
import keepHeader from './keep-header.cmp.js'
import keepSide from './keep-side.cmp.js'

export default {
    template: `
        <section class="note-app">
        <keep-header @filter="setFilter" @toggleSide="toggleSide"/>
        <keep-side :class="sideActive" @goTo="goTo"/>
        <section class="main-keep-layout" :class="doBlur">
            <note-add @add="addNew"/>
            <note-list v-if="notes.length"
                :notes="notesToShow" @save="save"/>
        </section>
        <router-view></router-view>
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: {
                txt: ''
            },
            isBlur: false,
            isSideActive: false
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
            })
    },
    methods: {
        save(note) {
            noteService.save(note).then((note) => {
                showSuccessMsg(`Note ${note.id} saved...`)
            }
            )
        },
        addNew(note) {
            this.notes.unshift(note)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        toggleSide(isSideActive) {
            this.isSideActive = isSideActive
        },
        goTo(to) {
            console.log(to);
            this.$router.push(`${to}`)
        },
        // addToTrash(removedNote) {
        //     this.removedNotes.push(removedNote)
        //     console.log(this.removedNotes);
        // },
    },
    computed: {
        notesToShow() {
            if (!this.filterBy.txt.trim()) return this.notes
            const regex = new RegExp(this.filterBy.txt, 'i')
            let notes = this.notes.filter(note => {
                if (note.type === 'note-txt') return regex.test(note.info.txt)
                else if (note.type === 'note-todo') {
                    if (regex.test(note.info.label))
                        return true
                    for (var i = 0; i < note.info.todos.length; i++)
                        if (regex.test(note.info.todos[i].txt)) return true
                }
                else return regex.test(note.info.title)
                return false
            })
            return notes
        },
        doBlur() {
            // return { blur: this.isBlur }
            if(this.$route.params?.id) return 'blur'
            else return 'unblur'
        },
        noteId() {
            return this.$route.params.id
        },
        sideActive() {
            return { 'side-active': this.isSideActive }
        }
    },
    // watch: {
    //     noteId() {
    //         // console.log('hi');
    //         this.isBlur = !this.isBlur
    //     }
    // },
    components: {
        noteList,
        noteAdd,
        keepHeader,
        keepSide,
    }
}