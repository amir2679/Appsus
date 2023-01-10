export default {
	template: `
        <header class="app-header flex justify-between align-center">
            <img @click="goHome" src="./assets/img/app-sus-logo.png" alt="app-sus-logo" title="Appsus"/>
            <nav class="flex justify-between align-center">
                <div class="flex align-center"><router-link to="/">Home</router-link></div>
                <div class="flex align-center"><router-link to="/mail">Mail</router-link></div>
                <div class="flex align-center"><router-link to="/Keep">Keep</router-link></div>
                <div class="flex align-center"><a href="./miss-books/index.html">Books</a></div>
                <div class="flex align-center"><router-link to="/about">About</router-link></div>
            </nav>
        </header>
    `,
    methods: {
        goHome() {
            this.$router.push(`/`)
        }
    },
}
