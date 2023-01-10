import { emailService } from '../services/emailService.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

import emailPreview from './email-preview.cmp.js'

export default {
    template: `
        <table>
            <thead>
                <tr class="headlines-container">
                    <td></td>
                    <td></td>
                    <td class="headline" @click.stop="setSort('subject')" title="Sort By Subject Name">
                        <img :src="sortImg" alt="sort-icon" class="sort-icon" />
                    </td>
                    <td></td>
                    <td class="headline" @click.stop="setSort('time')" title="Sort By Sent Time" >Time</td>
                    <!-- <td class="headline" v-for="headlineTxt in tableHeadlines" @click.stop="setSort(headlineTxt)" :title="headline">{{headline}}</td> -->
                </tr>
            </thead>
            <div :class="{open: sideBarOpen}" @click="toggleMailSideMenu" class="overlay"></div>
            <tbody class="emails-container">
                <tr v-for="email in emailsToShow" >
                    <email-preview 
                        @click.stop="handleOpeningEmail(email)"  
                        :email="email"  
                        class="email-container"
                        :class="{read: email.isRead}"
                    />
                </tr>
            </tbody>
        </table>
    `,
    data() {
        return {
            filterBy: {},
            sortBy: { type: '', descending: true },
            tableHeadlines: ['', '', 'a-z', '', 'time'],
            emails: [],
            sideBarOpen: false,
        }
    },
    methods: {
        handleOpeningEmail(email) {
            email.isRead = true
            this.$emit('set-open-email', email)
            emailService.save(email)
            this.$router.push(`/mail/` + email.id)
        },
        setAsRead(email) {
            
            email.isRead = true;
            emailService.save(email)
                .then(() => {
                    emailService.query()
                        .then(emails => this.emails = emails)
                })


        },
        setFilter(filterBy) {
            if (filterBy.txt !== undefined) this.filterBy.txt = filterBy.txt
            if (filterBy.folder !== undefined) this.filterBy.folder = filterBy.folder
        },
        setEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                    this.$emit('set-emails', emails)
                })

        },
        setSort(sortBy) {
            if (this.sortBy.type === sortBy) this.sortBy.descending = !this.sortBy.descending
            this.sortBy.type = sortBy
        },
        toggleMailSideMenu() {
            eventBus.emit('toggle-mail-side-menu')
        }

    },
    computed: {
        emailsToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')


            let emails = this.emails.filter(email => {

                const byName = (regex.test(email.subject) || regex.test(email.to) || regex.test(email.body))
                // Filter By Removed & RemoveState
                if (!this.filterBy.folder) return byName && email.removedAt === 0
                // Filter By Removed
                return byName

            })

            // Filter By Folder   
            if (this.filterBy.folder) {
                if (this.filterBy.folder === 'unread') {
                    emails = emails.filter(email => !email['isRead'])

                } else if (this.filterBy.folder) {
                    emails = emails.filter(email => email[this.filterBy.folder])
                }
            }

            if (this.sortBy.type) {
                emails.sort((email1, email2) => {
                    const order = (this.sortBy.descending) ? [email1, email2] : [email2, email1]
                    if (this.sortBy.type === 'time') return (order[0].sentAt - order[1].sentAt)
                    else if (this.sortBy.type === 'body') return order[0].subject.localeCompare(order[1].subject)
                    else if (this.sortBy.type === 'subject') return order[0].subject.localeCompare(order[1].subject)
                })
            }


            return emails
        },
        sortImg() {
            return (this.sortBy.descending) ? `./assets/style/apps/mail/icons/arrow-down-a-z-solid.svg` :
                `./assets/style/apps/mail/icons/arrow-up-a-z-solid.svg`
        },
    },
    components: {
        emailPreview,
    },
    created() {
        this.setEmails()
        eventBus.on('set-filter', (filterBy) => { this.setFilter(filterBy) })
        // eventBus.on('save-error', () => {this.setEmails()})
        eventBus.on('reload-list', () => { this.setEmails() })
        eventBus.on('toggle-mail-side-menu', () => {
            this.sideBarOpen = !this.sideBarOpen
        })
    },
}