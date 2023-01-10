import { bookService } from "../services/book.service.js"

import bookDesc from "../cmps/book-desc.cmp.js"

export default {
    props:['id'],

    created() {
        this.loadBook()
    },

    template: `
        <section v-if="book" :class="getStyleByPrice" class="main-layout book-layout">
            <div class="flex justify-between">
                <router-link v-if="prevBook" :to="'/book/' + prevBook">Prev Book</router-link>
                <router-link v-if="nextBook" :to="'/book/' + nextBook">Next Book</router-link>
            </div>


            <div class="book-details">
                <div>
                    <h3><strong>Title</strong> {{ book.title }}</h3>
                    <div>
                        <img class="on-sale-icon" v-if="book.listPrice.isOnSale" :src="getDiscountIcon"/>
                        <img :src="book.thumbnail"/>
                    </div>
                </div>

                <div class="details">
                    <p><strong>Abstract</strong> {{ book.subtitle }}</p>
                    <p><strong>Authors</strong> {{ getAuthors }}</p>
                    <p><strong>Price</strong> {{ getPrice }}</p>
                    <p><strong>Pages</strong> {{ getBookLength }}</p>
                    <p><strong>Category</strong> {{ getBookCategories }}</p>
                    <p><strong>Published Date</strong> {{ getBookPublishedDate }}</p>
                    <p><strong>Language</strong> {{ book.language }}</p>   
                    <book-desc :book="book"/>

                    <div className="actions-container">
                        <button @click.stop="goToApp">Return</button>
                        <button @click="goToReviews">Add review</button>
                        <button @click.stop="deleteBook">Delete</button>
                    </div>
                </div>
            
            </div>
        </section>
    `,
    data() {
        return {
            book: null,
            prevBook: null,
            nextBook: null,
        }
    },
    watch: {
        bookId() {
            this.loadBook()
        }
    },

    computed: {
        getAuthors() {
            return this.book.authors.map(author => `${author} `).join('')
        },

        getBookLength() {
            const pageCount = this.book.pageCount
            if (pageCount >= 500) return 'Long Reading'
            else if (pageCount >= 200) return 'Decent Reading'
            else if (pageCount < 200) return 'Light Reading'
        },

        getBookCategories() {
            return this.book.categories.map(category => `${category} `).join('')
        },

        getBookPublishedDate() {
            const publishedDate = 2022 - +this.book.publishedDate
            let publishedDateStr = publishedDate + ' years ago'

            if (publishedDate >= 10) publishedDateStr += ' - Veteran Book'
            if (publishedDate < 1) publishedDateStr += ' - New Book'

            return publishedDateStr
        },

        getDiscountIcon() {
            return `./img/icons/discount.png`
        },

        getStyleByPrice() {
            const { amount } = this.book.listPrice
            return {
                red: (amount > 150),
                green: (amount < 20)
            }
        },

        getPrice() {
            return Math.round(this.getPriceInDollars()) + '$'
        },

        bookId() {
            return this.$route.params.id
        },
    },

    methods: {
        loadBook() {
            const id = this.$route.params.id
            bookService.get(id).then(book => {
                this.book = book
                bookService.getNearBooksIds(this.book.id)
                    .then(nearBooks => {
                        this.prevBook = nearBooks.prev
                        this.nextBook = nearBooks.next
                    })
            })  
        },

        getPriceInDollars() {
            const { amount, currencyCode } = this.book.listPrice
            switch (currencyCode) {
                case 'EUR':
                    return amount * (5 / 3.4)
                case 'ILS':
                    return amount * (1 / 3.4)
                case 'USD':
                    return amount
                default:
                    return amount
            }
        },
        goToApp() {
            this.$router.push(`/bookApp`)
        },
        goToReviews() {
            this.$router.push(`/bookReviews/` + this.book.id)
        },
        deleteBook() {
            bookService.remove(this.book.id).then(
                this.goToApp()

            )
        },
    },
    
    components: {
        bookDesc,
    }


}