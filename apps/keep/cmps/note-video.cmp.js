export default {
    props: ['note'],
    template: `
        <section class="note-video-preview">
        <h2>{{note.info.title}}</h2>
        <iframe :src="vidUrl" frameborder="0" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true">
        </iframe>
        </section>
    `,
    computed: {
        vidUrl() {
            const { url } = this.note.info
            const id = url.split("?v=")[1]
            const embedlink = "http://www.youtube.com/embed/"
            return (embedlink + id).split('&')[0]
        }
    }
}