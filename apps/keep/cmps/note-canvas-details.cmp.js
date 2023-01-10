export default {
    props:['note'],
    template:`
        <input type="text" v-model="note.info.title" placeholder="Title"/>
        <img @click="editCanvas" :src="dataUrl" />
    `,
    computed: {
        dataUrl() {
            return this.note.info.dataUrl
        }
    },
    created() {
      console.log(this.note)
    },
    methods: {
      editCanvas() {
        this.$router.push(`/keep/canvas/${this.note.id}`)
      }  
    },
}