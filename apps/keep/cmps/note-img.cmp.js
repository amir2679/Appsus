export default {
    props: ['note'],
    template: `
        <section class="note-img-preview">
            <h2>{{note.info.title}}</h2>
            <img :src="imgUrl" />
        </section>
    `
    ,
    computed: {
        imgUrl() {
            return this.note.info.url
        }
    }
}
