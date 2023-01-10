import { storageService } from "../services/async-storage.service.js"
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

export default {
    template: `
        <section>

            <input @input="delayInput" v-model="searchInput" type="search"/>
            <ul>
                <li v-if="books" v-for="book in books" @click="addBook(book)" >{{book.title}}</li>
            </ul>

        </section>
    `,
    data() {
        return {
            searchInput: '',
            books: []
        }
    },
    created() {
        this.delayInput = utilService.debounce(this.getBooks, 2000)

    },
    methods: {
        addBook(book) {
            bookService.post(book, false)
                .then(book => this.$router.push(`/book/${book.id}`))
        },

        searchBook() {
            this.getBooks()
        },

        getBooks() {
            bookService.getBooks(this.searchInput)
                .then(books => {
                    this.books = books
                })
        }
    },
}