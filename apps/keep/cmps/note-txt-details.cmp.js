export default {
    props: ['note'],
    template: `
        <textarea rows="8" cols="50" v-model="note.info.txt">
            {{ note.info.txt }}
        </textarea>

        <!-- <cite contenteditable="true">{{ note.info.txt }}</cite> -->

    `
}