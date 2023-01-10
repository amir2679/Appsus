import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { templateData } from './templateData.service.js'

const EMAIL_KEY = 'emailDB'



const email1 = {
    id: 'e102',
    subject: 'ABA!',
    body: 'Would love to catch up eeee',
    isRead: true,
    isStarred: false,
    isBookmarked: true,
    sentAt : 1551133930594,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}



_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getNextEmailId
}

function query() {
    return storageService.query(EMAIL_KEY)
}

function get(emailId){
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if(email.id){
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getEmptyEmail(subject, body, to) {
    return {
        id: '',
        senderIconImgUrl: `./assets/style/apps/mail/icons/user-icon-${utilService.getRandomIntInclusive(1, 4)}.png`,
        subject: '',
        body: '',
        headline: '',
        isRead: false,
        isStarred: false,
        isBookmarked: false,
        isSent: false,
        removedAt: 0,
        sentAt : '',
        from: 'Avishai@momo.com',
        to: ''
    }
}

function getNextEmailId(emailId) {
    return storageService.query(EMAIL_KEY)
        .then(emails =>{
            var idx  = emails.findIndex(email => email.id === emailId)
            if (idx === emails.length-1) idx = -1
            return emails[idx+1].id
        })
}


function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = [...templateData.getTemplateEmail()]
        console.log(emails);
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
    return emails
}

function _createEmail(vendor, maxSpeed = 250) {
    const email = getEmptyEmail(vendor, maxSpeed)
    email.id = utilService.makeId() 
    return email
}






