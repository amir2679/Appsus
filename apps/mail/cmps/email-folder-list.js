import { eventBus } from "../../../services/event-bus.service.js"
import emailFolder from "./email-folder.cmp.js"


export default {
    props: ['emails'],
    template:`
        <section ref="emailSideMenu">
            
            <button @click.stop="onComposeMail" class="compose-btn">Compose</button>

            <div class="email-folders-container">
                <email-folder v-for="folder in folders" :folder="folder" @selectFolder="selectFolder"></email-folder>
            </div>
            <div class="unread-counter-container">
                <div class="filler" :style="{ 'width':(200 * (emails.length - unreadEmailsCount) / emails.length) + 'px' }">
                </div>
                <p>{{ unreadEmailsCount }}</p>
            </div>
        </section>
    `,
    computed:{
        // Use Reduce
        unreadEmailsCount() {
            let count = 0
            this.emails.forEach(email => {
                if (!email.isRead) count++
            })
            return count
        },

        fillerWidth() {
            return {color: 5000 + 'px'}
        },
    },
    data() {
        return {
            folders: [
                {filterBy: '', folderName: 'Inbox', imgName: 'all', isSelected: true},
                {filterBy: 'isStarred', folderName: 'Starred', imgName: 'starred', isSelected: false},
                {filterBy: 'isBookmarked', folderName: 'Bookmarked', imgName: 'bookmarked', isSelected: false},
                {filterBy: 'isSent', folderName: 'Sent', imgName: 'sent', isSelected: false},
                {filterBy: 'removedAt', folderName: 'Trash', imgName: 'trash', isSelected: false},
                {filterBy: 'isRead', folderName: 'Read', imgName: 'read'},
                {filterBy: 'unread', folderName: 'Unread', imgName: 'unread', isSelected: false},
            ]
        }
    },
    methods: {
        setFilter(filterBy) {
            eventBus.emit('set-filter', filterBy)
            eventBus.emit('close-email', false)
        },
        imgUrl(folderName) {
            return `./assets/style/apps/mail/icons/${folderName}-filter-icon.png`
        },
        selectFolder(folderName) {
            this.folders.forEach(folder => folder.isSelected = false)
            const folder = this.folders.find(folder => folder.folderName === folderName)
            folder.isSelected = true
            this.folders = this.folders.slice()
        },
        onComposeMail() {
            this.$emit('compose-mail')
            eventBus.emit('toggle-mail-side-menu')
        }


    },
    components: {
        emailFolder,
    },

    created() {
        eventBus.on('toggle-mail-side-menu', () => {
            this.$refs.emailSideMenu.style.left = (this.$refs.emailSideMenu.style.left === '0px') ? '-1000px' : '0px'
        })
    },
    

}