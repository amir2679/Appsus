import { emailService } from '../services/emailService.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

import emailHeader from '../cmps/email-header.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import emailFolderList from '../cmps/email-folder-list.js'
import emailList from '../cmps/email-list.cmp.js'
import emailDetails from '../cmps/email-details.cmp.js'


export default {
    template: `
    <main v-if="emails" class="email-app-container">
        <email-header/>
        <email-folder-list 
        :emails="emails" 
        @compose-mail="composeMailToggle" 
        class="email-folder-list"
        />
        <email-compose v-if="isCompose" @compose-mail="composeMailToggle"/>
        
        <email-list 
            v-if="!openedEmail" 
            @set-open-email="setOpenEmail"
            @set-emails="setEmails"
            :emails="emails" 
            class="email-list"/>
        <!-- <email-details v-else="!openedEmail" :email="openedEmail"/> -->
        <email-details v-else="openedEmail" :email="openedEmail"/>
        
    </main>

    `,
    data() {
        return {
            emails: [],
            isCompose: false,
            openedEmail: null,
        }
    },
    methods: {
        composeMailToggle() {
            this.isCompose = !this.isCompose
        },
        setOpenEmail(email) {
            this.openedEmail = email
        },
        setEmails(emails) {
            this.emails = emails
        }
    },
    created() {
        eventBus.on('close-email', () => { this.openedEmail = false })

    },
    components: {
        emailHeader,
        emailCompose,
        emailFolderList,
        emailList,
        emailDetails
    }
}