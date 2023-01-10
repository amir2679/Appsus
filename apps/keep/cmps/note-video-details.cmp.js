export default {
    props: ['note'],
    template: `
        <input type="text" v-model="note.info.title" placeholder="Title"/>
        <iframe :src="vidUrl" frameborder="0" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true">
        </iframe>
        <input type="search" v-model="note.info.url" :placeholder="note.info.url" title="Enter New Video Url"/>
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