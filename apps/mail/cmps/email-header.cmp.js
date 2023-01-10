import emailSearch from "./email-search.cmp.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
            <img class="email-logo" src="./assets/style/apps/mail/icons/gmail-logo-icon.png" alt="email-logo" />
            <div class="main-header-features">
                <email-search class="email-search"/>
                <img @click="toggleMailSideMenu" class="mail-mobile-side-menu" src="./assets/style/apps/mail/icons/appsus-grid-icon.png" alt="menu-btn" />
            </div>

        
    `,
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
        toggleMailSideMenu() {
            eventBus.emit('toggle-mail-side-menu')
        }
    },
    components: {
        emailSearch
    }

}