
import bookPreview from './book-preview.cmp.js'
import { eventBus } from '../services/event-bus.service.js'

export default {
    props: ['books'],
    template:`
        <ul class="book-list">
            <li v-for="book in books" :key="book.id">
                <book-preview :book="book" @click="selectBook(book.id, book.title)"/>
            </li>
        </ul>
    `,
    methods: {
        selectBook(bookId, bookTitle) {
            this.$router.push(`/book/${bookId}`)

            const msg = {
                txt: `The book "${bookTitle}" has selected`,
                type: 'success',
            }
            
            eventBus.emit('user-msg', msg)
        }
    },
    components: {
        bookPreview,
    }

}