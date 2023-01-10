export default {
    props: ['note'],
    template: `
    <section class="note-audio-preview">
        <h3>{{note.info.title}}</h3>
        <audio controls>
        <!-- <source src="horse.ogg" type="audio/ogg"> -->
        <source :src="note.info.url" type="audio/mpeg">
    </audio>
    </section>
    `
}