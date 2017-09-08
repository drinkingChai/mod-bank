class TestMod extends Mod {
  constructor(id, store, ...bankNames) {
    super(id, store, ...bankNames)
  }
  render() {
    let store = this.store,
      strings = this.store.getData('strings'),
      numbers = this.store.getData('numbers')

    this.$html = $(`
      <div>
        <h4>Component A</h4>
        <hr/>
        <p>Strings: ${strings}</p>
        <p>Numbers: ${numbers}</p>
        <button class='a btn-blue'>Update A</button> <button class='b btn-orange'>Update A & B</button>
      </div>
    `)
    this.$html.on('click', 'button.a', function() {
      strings.push(Math.random().toString(36).substring(7))
      store.setData('strings', strings)
    })
    this.$html.on('click', 'button.b', function() {
      numbers.push(Math.floor(Math.random()*40))
      store.setData('numbers', numbers)
    })
    $(this.id).empty()
    $(this.id).append(this.$html)
  }
}

class User extends Mod {
  constructor(id, store, username, ...bankNames) {
    super(id, store, ...bankNames)
    this.username = username
  }
  render() {
    let store = this.store,
      user = this.store.getData('ex2users').find(user=> user.name == this.username),
      numbers = this.store.getData('numbers')

    this.$html = $(`
      <div>
        <h4>Component B</h4>
        <hr/>
        <p>${user.name}</p>
        <p>${user.stuff}</p>
        <p>${numbers}</p>
      </div>
    `)
    $(this.id).empty()
    $(this.id).append(this.$html)
  }
}



let strings = ['stuff', 'cool', ':o'],
  numbers = [4, 8, 15, 16],
  ex2users = [ { name: 'awesome', stuff: 'cool' } ]

let ex2store = new Store()
ex2store.addBank('strings', strings)
ex2store.addBank('numbers', numbers)
ex2store.addBank('ex2users', ex2users)

let newTestMod = new TestMod('#test', ex2store, 'strings', 'numbers')
let newUser = new User('#user', ex2store, 'awesome', 'ex2users', 'numbers')
newTestMod.render()
newUser.render()
