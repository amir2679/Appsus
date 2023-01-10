import { bookService } from '../services/book.service.js'
import { eventBus } from '../services/event-bus.service.js'

import bookAdd from '../cmps/book-add.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import booksFilter from '../cmps/books-filter.cmp.js'

export default {
    template:`
            <section class="book-app main-layout">
                <book-add/>
                <books-filter/>
                <book-list :books="booksToShow"/>
            </section>

    `,
    data(){
        return {
            books: null,
            selectedBook: null,
            filterBy: {}
        }
    },
    created() {
        bookService.query().then(books => {
            this.books = books

        }),
        eventBus.on('set-filter', filter => {
            this.filterBy = filter  
        })
    },
    computed: {
        booksToShow(){
            if (!this.filterBy.price) return this.books
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(({title, listPrice: {amount}}) => regex.test(title) && (amount <= this.filterBy.price))
        }
    },
    components: {
        bookList,
        booksFilter,
        bookAdd
    },

}