class Mod {
  constructor(id, store, ...bankNames) {
    this.id = id
    this.store = store
    bankNames.forEach((bankName)=> {
      this.store.addModule(bankName, this)
    })
  }
  render() {
    this.$html = $(``)
    $(this.id).empty()
    $(this.id).append(this.$html)
  }
  update(newData) {
    this.store = newData
    this.render()
  }
}
