export default {
    props:['book'],
    template:`

        <article class="book-prev">
            <h3>{{book.title}}</h3>
            <img :src="book.thumbnail"/>
            <p>
                <span>Price </span>
                <span>{{book.listPrice.amount}}</span>
                <span>{{getCurrency}}</span>
            </p>
        </article>

    `,
    computed:{
        getCurrency() {
            const {currencyCode} = this.book.listPrice
            return this.getCurrencyIcon(currencyCode)
        }
    },
    methods: {
        getCurrencyIcon(currency) {
            switch (currency) {
                case 'EUR':
                    return '€'
                case 'ILS':
                    return '₪'
                case 'USD': 
                    return '$'
                default: 
                    return '$'
            }
        }
    }
}