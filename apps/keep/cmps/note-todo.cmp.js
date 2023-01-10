export default {
    props: ['note'],
    emits: ['save'],
    template: `
        <h2>{{note.info.label}}:</h2>
            <ul class="todos-preview">
               <li v-for="(todo,index) in note.info.todos">
                    <h5 :class="{'todo-done': todo.isDone}">{{todo.txt}}</h5>
                    <input @click.stop="todoDone(todo)" type="checkbox" v-model="todo.isDone" title="Mark done!">
                </li>
            </ul>
    `,
    methods: {
        todoDone(todo) {
            todo.isDone = !todo.isDone
            todo.isDone ? todo.doneAt = new Date() : todo.dontAt = null
            this.$emit('save', this.note)
        }
    }
    ,
    computed: {
    }
}