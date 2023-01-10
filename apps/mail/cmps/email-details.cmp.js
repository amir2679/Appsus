import { emailService } from "../services/emailService.service.js"
import { showErrorMsg, eventBus, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    props: ['email'],
    template: `
        <section v-if="email" class="email-details">
            <header class="email-details-header">
                <div>
                    <span @click.stop="unselectEmail" title="Back to emails">
                        <img src="./assets/style/apps/mail/icons/back-icon.png"/>
                    </span>
                </div>
                <div class="flex justify-even">
                    <span v-if="!email.removedAt" @click.stop="deleteEmail" title="Delete">
                        <img class="delete-email-icon" src="./assets/style/apps/mail/icons/trash-icon.png" alt="Delete Icon" />
                    </span>
                    <span :title="bookMarkTitle" @click.stop="toggleProperty('isBookmarked')">
                        <img class="email-bookmark-icon" 
                        :class="{unselected: !email.isBookmarked}"
                        :src="bookmarkIcon"
                        alt="bookmark-icon"/>
                    </span>

                    <span :title="starTitle"  @click.stop="toggleProperty('isStarred')">
                        <img class="email-star-icon" 
                        :src="starIcon" 
                        :class="{unselected: !email.isStarred}"
                        alt="star-icon" />
                    </span>
                </div>
                <span></span>
                <!-- <span>GO TO NEXT</span> -->
            </header>
            <section class="email-content" >
                <p class="email-headline">{{ email.headline }}</p>
                <img class="sender-img" :src="email.senderIconImgUrl" alt="sender-img" />
                <p class="email-subject">
                    <span>{{ email.subject }}</span>
                    <span class="email-from">from:    {{ email.from }}</span>
                    <span class="email-sent-time"> {{sentDate}} </span> 
                </p>
                <p>{{ email.body }}</p>
            </section>
        </section>
        <h3 v-else>Loading...</h3>
    `,
    computed: {
        bookMarkTitle() {
            return (this.email.isBookmarked) ? 'Remove mark' : 'Mark'
        },
        bookmarkIcon() {
            return (this.email.isBookmarked) ? "./assets/style/apps/mail/icons/bookmarked-icon.png" :
                "./assets/style/apps/mail/icons/bookmark-icon.png"
        },
        starTitle() {
            return (this.email.isStarred) ? 'Unstar' : 'Star'
        },
        starIcon() {
            return (this.email.isStarred) ? "./assets/style/apps/mail/icons/starred-icon.png" :
                "./assets/style/apps/mail/icons/star-icon.png"
        },
        sentDate() {
            const emailDate = new Date(this.email.sentAt)
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                "July", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            // If Pass By Year
            if (new Date().getFullYear() - emailDate.getFullYear() > 1) {
                return monthNames[emailDate.getMonth()] + ' ' + emailDate.getFullYear()
                // If Pass By Less Then 24 Hours 
            } else if (new Date() - emailDate < 1000 * 60 * 60 * 24) {
                const hour = (emailDate.getHours() < 10) ? '0' + emailDate.getHours() : emailDate.getHours()
                const minutes = (emailDate.getMinutes() < 10) ? '0' + emailDate.getMinutes() : emailDate.getMinutes()
                return hour + ':' + minutes
            } else {
                return monthNames[emailDate.getMonth()] + ' ' + (emailDate.getDay() + 1)
            }

        },
    },
    methods: {
        unselectEmail() {
            eventBus.emit('close-email', false)
        },
        deleteEmail() {

            this.email.removedAt = Date.now()
            emailService.save(this.email)
                .then(() => {
                    showSuccessMsg('E-Mail Was Deleted')
                })
            this.unselectEmail()
        },
        toggleProperty(property) {
            this.email[property] = !this.email[property]
            emailService.save(this.email)

            let propTxt = (property === 'isStarred') ? 'starred' : 'bookmarked'
            let propVal = (this.email[property]) ? ' ' : ' un'
            let userMsg = `E Mail set as` + propVal + propTxt
            showSuccessMsg(userMsg)
        },
    },
}