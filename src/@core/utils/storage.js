const storage = {
  save (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get (key) {
    return JSON.parse(localStorage.getItem(key) || 'null') || null
  },
  remove (key) {
    localStorage.removeItem(key)
  },
  clear () {
    localStorage.clear()
  }
}

export default storage
