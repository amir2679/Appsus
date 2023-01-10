export default {
    props:['note'],
    template:`
        <input type="text" v-model="note.info.title" placeholder="Title"/>
        <div class="img-container">
            <img :src="imgUrl" />
        </div>
        <input type="search" v-model="note.info.url" :placeholder="note.info.url" title="Enter New Image Url"/>
    `,
    computed: {
        imgUrl() {
            return this.note.info.url
        }
    }
}