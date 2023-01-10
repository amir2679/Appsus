import { noteService } from "../services/note.service.js"

export default {
    template: `
    <section class="keep-canvas">
        <nav class="canvas-nav">
            <span @click="save">Save</span>
            <span @click="resetCanvas">New Canvas</span>
        </nav>
        <div class="canvas-container">
        <canvas @mousemove="draw" @mousedown="startDraw" @mouseup="stopDraw" class="my-canvas" id="my-canvas" height="450" 
        width="450" ref="myCanvas"></canvas>
        </div>
    </section>
    `,
    data() {
        return {
            canvas: null,
            ctx: null,
            isDrag: false,
            x: 0,
            y: 0,
            isDraw: false,
            note: noteService.getEmptyNote('note-canvas', false, { dataUrl: '', title: '' }, null)
        }
    },
    created() {
    },
    mounted() {
        this.canvas = this.$refs.myCanvas
        this.ctx = this.canvas.getContext('2d')
        const elContainer = document.querySelector('.canvas-container')
        this.canvas.width = elContainer.offsetWidth - 100
        this.canvas.height = elContainer.offsetHeight - 50

        const noteId = this.$route.params.id
        if (noteId) {
            noteService.get(noteId).then(note => {
                this.note = note
                const img = new Image()
                img.src = note.info.dataUrl
                img.onload = () => {
                    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                }
            })
        }
    },
    methods: {
        draw(ev) {
            if (this.isDraw) {
                this.drawLine(this.x, this.y, ev.offsetX, ev.offsetY)
                this.x = ev.offsetX
                this.y = ev.offsetY
            }
        },
        drawLine(x1, y1, x2, y2) {
            let ctx = this.ctx;
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
        },
        startDraw(ev) {
            this.x = ev.offsetX
            this.y = ev.offsetY
            this.isDraw = true
        },
        stopDraw(ev) {
            if (this.isDraw) {
                this.drawLine(this.x, this.y, ev.offsetX, ev.offsetY)
                this.x = 0
                this.y = 0
                this.isDraw = false
            }
        },
        save() {
            const imgContent = this.canvas.toDataURL('image/png')
            this.note.info.dataUrl = imgContent
            console.log(imgContent);
            noteService.save(this.note).then(() => {
                this.$router.push(`/keep`)
            })
        },
        resetCanvas() {
            this.ctx.fillStyle = "white"
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }
    },
    computed: {
        canvasData() {
            return this.$route.query.data
        },
    },

}