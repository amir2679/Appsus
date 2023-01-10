import { bookService } from "../services/book.service.js"
import { eventBus } from "../services/event-bus.service.js"


export default {
    props: ['review', 'bookId'],
    template:`
        <section>
            <h3>Name: {{ review.name }}</h3>
            <p>Rate: {{ review.rate }}</p>
            <p>Date: {{ review.date }}</p>
            <p>Review: {{ review.txt }}</p>
            <button @click="deleteReview">X</button>
        </section>
    `,
    methods: {
        deleteReview() {
            bookService.deleteReview(this.bookId, this.review.id)
                .then(book => {
                    this.$emit('update-book', book)
                    const msg = {
                        txt: `Review Has Deleted`,
                        type: 'success',
                    }
                    
                    eventBus.emit('user-msg', msg)
                })


            
        }
    },
}