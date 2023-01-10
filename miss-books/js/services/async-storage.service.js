export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    save,
}

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => entities.find(entity => entity.id === entityId))
}

function post(entityType, newEntity, append = true) {
    if (!newEntity.id) newEntity.id = _makeId()
    return query(entityType).then(entities => {
        append ? entities.push(newEntity) : entities.unshift(newEntity)
        save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
        entities.splice(idx, 1, updatedEntity)
        save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId)
        if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
        entities.splice(idx, 1)
        save(entityType, entities)
    })
}


function save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

// Private functions


function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}