import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template:`
        <section class="email-search">
            <input @input.prevent="setFilter($event.target.value)" title="Search Email" type="search" placeholder="Search"/>
        </section>
    `,
    data(){
        return {
           
        }
    },
    computed:{
    },
    methods: {
        setFilter(filterBy) {
            eventBus.emit('set-filter', {txt: filterBy})
        }
    }
}