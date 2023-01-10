import appHeader from "../cmps/app-header.cmp.js"
import appFooter from "../cmps/app-footer.cmp.js"
import userMsg from "../cmps/user-msg.cmp.js"

import bookDetails from "../views/book-details.cmp.js"
import bookApp from "../views/book-app.cmp.js"
import homePage from '../views/home-page.cmp.js'
import aboutPage from '../views/about-page.cmp.js'
import bookReviews from '../views/book-reviews.cmp.js'

const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter

const app = createApp({
    template:`
        <app-header class="main-layout full" />
        <main class="full">
            <user-msg />
            <router-view/>
        </main>
        <app-footer class="full main-layout" />
    `,
    data() {
        return {
            filterBy: {},
            isShowMainPage: false,
        }
    },
    methods: {
        setFilter(filter) {
            this.filterBy = {title: filter.title, price: filter.price}
        },
    },
    components: {
        bookApp,
        appHeader,
        appFooter,
        userMsg,
    }
})

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/about',
            component: aboutPage,
            name:'about'
            // {name:'about'}
        },
        {
            path: '/bookApp',
            component: bookApp
        },
        {
            path: '/book/:id',
            component: bookDetails,
            props:true
        },
        {
            path: '/bookReviews/:id',
            component: bookReviews
        },
        // {
        //     path: '/car/edit/:id?',
        //     component: carEditCmp
        // },
        // {
        //     path: '/about',
        //     component: aboutPage
        // },
    ]
}

const router = createRouter(routerOptions)

app.use(router)
app.mount('#app')
