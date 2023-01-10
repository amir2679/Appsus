import { emailService } from '../services/emailService.service.js';
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    props: ['email'],
    template: `
        <tr>
            <td  :title="bookMarkTitle" @click.stop="toggleProperty('isBookmarked')">
                <img class="email-bookmark-icon" 
                :class="{unselected: !email.isBookmarked}"
                :src="bookmarkIcon"
                alt="bookmark-icon"/>
            </td>

            <td :title="starTitle"  @click.stop="toggleProperty('isStarred')">
                <img class="email-star-icon" 
                :src="starIcon" 
                :class="{unselected: !email.isStarred}"
                alt="star-icon" />
            </td>

            <td title="Subject" class="email-subject">{{email.subject}}</td>
            <td title="Mail" class="email-body">{{email.body}}</td>
            <td v-if="isActionsDisplay" title="Date" class="email-body">{{getDate}}</td>
            <div :style="actionsBackgroundColor" ref="actionsContainer" class="email-preview-actions">
                <span>
                    <img v-if="!email.removedAt" @click.stop="deleteEmail"
                     src="./assets/style/apps/mail/icons/trash-icon.png"
                      alt="trash-icon" />
                </span>
                <span>
                    <img @click.stop="toggleProperty('isRead')"
                     :src="readStateIcon" 
                     alt="unread-mail-icon" />
                </span>
            </div>
        </tr>
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
        readStateIcon() {
            return (this.email.isRead) ? './assets/style/apps/mail/icons/envelope-open-solid.svg' : 
                './assets/style/apps/mail/icons/envelope-solid.svg'
        },
        actionsBackgroundColor() {
            return { backgroundColor: (this.email.isRead) ? 'var(--clr-mail-light-secondary)' : 'var( --clr-mail-background)' }
        },
        getDate() {
            const emailDate = new Date(this.email.sentAt)
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                "July", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            // If Pass By Year
            if (new Date().getFullYear() - emailDate.getFullYear() > 1) {
                return monthNames[emailDate.getMonth()] + ' ' + emailDate.getFullYear()
            // If Pass By Less Then 24 Hours 
            } else if (new Date() - emailDate < 1000 * 60 * 60 * 24){
                const hour = (emailDate.getHours() < 10) ? '0' + emailDate.getHours() : emailDate.getHours() 
                const minutes = (emailDate.getMinutes() < 10) ? '0' + emailDate.getMinutes() : emailDate.getMinutes()
                return hour + ':' + minutes
            } else {
                return monthNames[emailDate.getMonth()] + ' ' + (emailDate.getDay() + 1)
            }

        }
    },
    methods: {
        toggleProperty(property) {
            this.email[property] = !this.email[property]
            emailService.save(this.email)
            
            let propTxt;
            switch(property) {
                case 'isStarred':
                    propTxt = 'starred'
                    break
                case 'isBookmarked':
                    propTxt = 'bookmarked'
                    break
                case 'isRead':
                    propTxt = 'read'
                    break
            }

            let propVal = (this.email[property]) ? ' ' : ' un'
            let userMsg = `E Mail set as` + propVal + propTxt
            showSuccessMsg(userMsg)
        },
        deleteEmail() {
            this.email.removedAt = Date.now()
            emailService.save(this.email)
                .then(() => {
                    showSuccessMsg('E-Mail Was Deleted')
                })
        },
        isActionsDisplay() {
            return this.$refs.actionsContainer.style.display === 'flex'
        }
    },
}