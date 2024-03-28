export default {
    computed: {
        type() {
            return this.item.type;
        },
        file_name() {
            return this.item.file_name;
        },
        isCollection() {
            return this.item.isCollection;
        },
        cover_url() {
            return `${this.item.DOMAIN}/${this.item.cover_url}`;
        },
        isDoc() {
            return this.type.includes('msword') && this.file_name.includes('doc') && this.file_name.includes('docx')
        },
        isPdf() {
            return this.file_name.includes('pdf')
        },
        isMp3() {
            return this.file_name.includes('mp3')
        },
        isZip() {
            return this.type.includes('zip') || this.type.includes('x-zip-compressed')
        },
        isPng() {
            return this.file_name.includes('png')
        },
        isXls() {
            return this.file_name.includes('xls')
        },
        isTxt() {
            return this.file_name.includes('txt')
        },
    }
}