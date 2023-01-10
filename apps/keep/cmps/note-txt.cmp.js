export default {
    props: ['note'],
    template: `
        <section class="note-txt-preview">
            <h2>{{note.info.txt}}</h2>
        </section>
    `,
}