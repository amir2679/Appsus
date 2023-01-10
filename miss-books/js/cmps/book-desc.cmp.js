import { eventBus } from "../services/event-bus.service.js"

export default {
    props: ['book'],
    template:`
        <section>
            <h3>{{getDescString}}</h3>
            <div className="actions-container">
                <button @click.stop="toggleIsDescExpanded">{{ getBtnStr }}</button>
            </div>
        </section>

    `,
    data(){
        return {
           isDescExpanded: false,
           description: this.book.description
        }
    },
    computed:{
        getDescString() {
            if (!this.isDescExpanded) return this.description.substring(0, 100)
            return this.description
        },
        getBtnStr() {
            if (!this.isDescExpanded) return 'Read More'
            return 'Read Less'
        }
    },
    methods: {
        toggleIsDescExpanded() {
            this.isDescExpanded = !this.isDescExpanded

            const msg = {
                txt: `Description ${(this.isDescExpanded) ? `expanded` : `got smaller`}`,
                type: 'success',
            }
            
            eventBus.emit('user-msg', msg)
        }
    },
}