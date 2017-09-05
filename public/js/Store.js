class Store {
  constructor() {
    this.banks = {}
    this.objectBanks = {}
  }
  addBank(bankName, data) {
    this.banks[bankName] = data
    this.objectBanks[bankName] = []
  }
  getData(bankName) {
    return this.banks[bankName]
  }
  setData(bankName, newData) {
    this.banks[bankName] = newData
    this.updateModules(bankName)
  }
  addModule(bankName, mod) {
    this.objectBanks[bankName].push(mod)
  }
  updateModules(bankName) {
    this.objectBanks[bankName].forEach((obj)=> {
      obj.update(this)
    })
  }
}
