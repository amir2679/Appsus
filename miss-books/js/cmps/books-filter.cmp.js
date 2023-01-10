import { eventBus } from '../services/event-bus.service.js'



export default {
    template:`
        <section  class="actions-container actions-container-layout">
            
                <label> 
                    <input v-model="filterBy.title" type="search" placeholder="Search"/>
                </label>
                <label>
                    <span>Max Price </span>
                    <input v-model="filterBy.price" type="range" :max="300" :min="1" />
                </label>
                <div>
                    <button @click.stop="setFilter" >Search</button>
                </div> 

        </section>
    `,
    data(){
        return {
           filterBy: {title: '', price: ''},
        }
    },
    methods: {
        setFilter() {
            const filter = JSON.parse(JSON.stringify(this.filterBy));
            eventBus.emit('set-filter', filter)

            const msg = {
                txt: `Filter On`,
                type: 'success',
            }
            
            eventBus.emit('user-msg', msg)
        }
    },
    components: {
    }

}