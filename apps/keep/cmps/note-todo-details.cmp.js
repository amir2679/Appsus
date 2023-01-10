export default {
    props: ['note'],
    emits: ['save'],
    template: `
        <input type="text" v-model="note.info.label" placeholder="Title"/>
        <ul class="todos-details">
            <li v-for="todo in note.info.todos">
                <input type="text" v-model="todo.txt" :class="{'todo-done': todo.isDone}"/>
                <h5 v-if="todo.isDone">{{todo.doneAt.toLocaleTimeString('en-GB')}}</h5>
                <input @click.stop="todoDone(todo)" type="checkbox" v-model="todo.isDone" title="Mark done!">
            </li>
        </ul>
        <span class="btn" @click="addTodo">+</span>
    `,
    methods: {
        todoDone(todo) {
            todo.isDone = !todo.isDone
            todo.isDone ? todo.doneAt = new Date() : todo.dontAt = null
            // this.$emit('save', this.note)
        },
        addTodo() {
            this.note.info.todos.push({ txt: "", doneAt: null })
            // this.$emit('save', this.note)
        }
    }
}