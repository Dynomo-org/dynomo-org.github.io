const get = key => localStorage.getItem(key)
const getJSON = key => JSON.parse(get(key))

const set = (key, value) => localStorage.setItem(key, value)
const setJSON = (key, value) => set(key, JSON.stringify(value))

export default {
    getJSON,
    setJSON
}