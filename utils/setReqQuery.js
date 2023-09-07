const setQuery = (arr, obj) => {
    obj.query = {}
    arr.forEach((search, key) => {
        obj.query[key] = search;
    })
}

module.exports = setQuery