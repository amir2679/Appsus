export default {
    template: `
        <section class="home-page">
            <div class="img-container">
                <img :src="backgroundImg" alt="background-img" />
            </div>
            <div class="about">
                <h3>In today's world of technology, Appsus manages three main activities</h3>
                <p>Contact and Internet communication through the best email system available</p>
                <p>Clear and easy-to-use notes management system</p>
                <p>Bookstore for storing and managing your favorite books!</p> 
                <nav>
                    <router-link to="/mail"><p class="mail">Try Our Mail</p></router-link>
                    <router-link to="/keep"><p class="keep">Try Our Keep</p></router-link>
                    <a href="./miss-books/index.html"><p class="books">Try Our Books</p></a>
                </nav>
                <img class="home-page-img" src="./miss-books/img/illustration-reporting.0215bbf2f950.svg" alt="" />

            </div>
        </section>
    `,
    data() {
        return {
            imgIdx: 1,
        }
    },
    computed: {
        backgroundImg() {
            return `./assets/img/header-background/${this.imgIdx}.jpg`
        }
    },
    created() {
        setInterval(() => {
            if (this.imgIdx === 5) this.imgIdx = 0
            this.imgIdx++
        }, 9000)
    },
}
