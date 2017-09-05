/*
  NOTE ======= NOTE
  Store
    replica of the backend
    banks: store data
    objectBanks: store objects
    addBank('bankName', data)
      this.banks['bankName'] = data
      this.objectBanks['bankName'] = []
    getData('bankName') returns this.banks['bankName']
    setData('bankName', newData)
      this.banks['bankName'] = newData
      this.updateModules['bankName']
    addModule('bankName', module) adds a Module object
      this.objectBanks['bankName'].push(module)
    updateModules('bankName')
      this.objectBanks['bankName'].forEach(function(obj) { obj.update(this.getData('bankName')) })

  Module
    front end jquery module
    constructor(id, Store)
      this.id = id
      this.store = Store
    render()
      ex.
      let strings = this.store.getData('strings'),
        numbers = this.store.getData('numbers')

      this.$html = $(`
        <div>
          <p>Strings: ${strings}</p>
          <p>Numbers: ${numbers}</p>
          <button id='a'>A</button> <button id='b'>B</button>
        </div>
      `)
      this.$html.on('click', 'button#a', function() {
        strings.push(Math.random().toString(36).substring(7))
        this.store.setData('strings', strings)
      })
      this.$html.on('click', 'button#b', function() {
        numbers.push(Math.floor(Math.random()*40))
        this.store.setData('numbers', numbers)
      })
      $(this.id).append(this.$html)
    update()
*/
