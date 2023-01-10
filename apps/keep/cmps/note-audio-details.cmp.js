export default {
    props: ['note'],
    template: `
            <input type="text" v-model="note.info.title" placeholder="Title"/>
            <audio controls>
            <!-- <source src="horse.ogg" type="audio/ogg"> -->
                <source :src="note.info.url" type="audio/mpeg">
            </audio>
            <audio controls>
                <source />
            </audio>
            <input type="search" v-model="note.info.url" :placeholder="note.info.url" title="Enter New Video Url" class="audio-details-input"/>
    `,
    data() {
        return {
            audioIN : { audio: true }
        }
    },
    created() {
        
    },

}