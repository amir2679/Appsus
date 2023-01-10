import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['folder'],
    template: `
                <div @mouseenter="isHover = true" 
                     @mouseleave="isHover = false" 
                     class="folder-container" 
                     :class="folderClass"> 
                    <div @click.stop="setFilter" class="email-folder" >
                        <img :src="imgUrl" :alt="folder.folderName" :title="folder.folderName" />
                        <span :style="fontFamily">{{ folder.folderName }}</span>
                    </div>
                </div>
    `,
    data() {
        return {
            isHover: false,
        }
    },
    computed: {
        imgUrl() {
            return (this.folder.isSelected) ? `./assets/style/apps/mail/icons/${this.folder.imgName}-filter-icon-hover.png` : `./assets/style/apps/mail/icons/${this.folder.imgName}-filter-icon.png`
        },
        folderClass() {
            return {'folder-hover': this.isHover, 'folder-selected': this.folder.isSelected} 
        },
        fontFamily() {
             return (this.folder.isSelected) ? {fontFamily: 'ProductSans-Bold'} :
                {fontFamily: 'ProductSans-medium'}
        }
    },
    methods: {
        setFilter() {
            eventBus.emit('set-filter', {folder: this.folder.filterBy})
            eventBus.emit('close-email', false)
            this.$emit('selectFolder', this.folder.folderName)
        }
    }
}