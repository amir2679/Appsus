export default {
    template: `
        <section class="about-page">
            <div class="img-container">
                <img :src="backgroundImg" alt="background-img" />
            </div>
            <div class="about">
                <h3>So how did <span class="bold">Appsus.com</span> come to be?</h3>
                <p>Our task was to create this "Three headed" application in two days</p>
                <p>emphasizing graphics, user experience, and Vue Framework usage</p>
                <div class="icons-container">
                    <img src="./miss-books/img/Gmail-Logo.wine.svg" alt="Gmail logo" />
                    <img src="./miss-books/img/Google_Keep_icon_(2020).svg.png" alt="Gmail logo" />
                    <img src="./miss-books/img/png-clipart-computer-icons-google-books-book-blue-angle-thumbnail-removebg-preview.png" alt="Gmail logo" />
                </div>
                <div class="about-working-img-container">
                <div class="names-container">
                    <div>
                            <p class="yellow">Avishai Dotan</p> 
                            <img src="./miss-books/img/personal-photo.jpg" alt="Avishai Dotan" />
                    </div>
                    <div>
                        <img src="./miss-books/img/T03PU4YR4NS-U03QV7BN4U9-f34a1c6f3407-512.jpg" alt="Amir Gombo" />
                        <p class="blue">Amir Gombo</p> 
                    </div>
                </div>
                
            </div>
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
            return `./assets/img/header-background/team${this.imgIdx}.jpg`
        }
    },
    created() {
        setInterval(() => {
            if (this.imgIdx === 4) this.imgIdx = 0
            this.imgIdx++
        }, 9000)
    },
}
