import { emailService } from "../services/emailService.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
            <form @submit.prevent="sendMail" class="compose-mail-modal">
                <header class="compose-mail-header">
                    <p>New Message</p>
                    <img class="x-icon" @click.stop="$emit('compose-mail')" src="./assets/style/apps/mail/icons/close-icon.png" alt="Close" title="Close" />
                </header>
                <section class="actions-container">
                    <label>
                        <input v-model="emailToEdit.to"
                               ref="sendTo" 
                               type="text" 
                               title="Send To" 
                               placeholder="To:"/>
                    </label>
                    <label>
                        <input 
                        v-model="emailToEdit.subject" 
                        type="text" 
                        title="Subject" 
                        placeholder="Subject:"/>
                    </label>
                    <div class="textarea-container">
                        <textarea 
                        v-model="emailToEdit.body" 
                        cols="30" rows="10" 
                        placeholder="Mail Body:"></textarea>
                    </div>
                    <div class="send-delete-actions">
                        <button  class="send-btn" title="send">Send</button>
                        <img @click.stop="$emit('compose-mail')"
                        class="trash-icon" 
                        src="./assets/style/apps/mail/icons/trash-icon.png" 
                        alt="trash-icon" 
                        title="Trash"/>
                    </div>
                </section>
            </form>
    `,
    data() {
        return {
            emailToEdit: emailService.getEmptyEmail()
        }
    },

    methods: {
        sendMail() {

            
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            if (!regex.test(this.emailToEdit.to)) {
                showErrorMsg(`Invalid mail address`)
                return
            }
            
            this.emailToEdit.headline = this.emailToEdit.subject
            this.emailToEdit.sentAt = Date.now()
            this.emailToEdit.isRead = true

            this.emailToEdit.isSent = true
            
            emailService.save(this.emailToEdit)
                .then(email => {
                    showSuccessMsg(`Email Successfully Sended to ${email.to}`)
                    this.$emit('compose-mail')
                    eventBus.emit('reload-list')   
                })
                .catch(err => {
                    showErrorMsg(`Cannot save email`)
                })

        },
    },

    mounted() {
        this.$refs.sendTo.focus()
    },

    created() {
        const emailId = this.$route.params.id
        if (emailId) {
            this.emailToEdit = emailService.get(emailId)
                .then(email => this.emailToEdit = email)
        }
    },
}