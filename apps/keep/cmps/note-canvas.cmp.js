export default {
    props: ['note'],
    template: `
        <section class="note-canvas-preview">
            <h2>{{note.info.title}}</h2>
            <img :src="dataUrl" />
        </section>
    `,
    computed: {
        dataUrl() {
            return this.note.info.dataUrl
        }
    }
}