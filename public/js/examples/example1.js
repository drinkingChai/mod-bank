class Foods extends Mod {
  constructor(id, ex1store, ...bankNames) {
    super(id, ex1store, ...bankNames)
  }
  render() {
    let store = this.store,
      foods = this.store.getData('foods'), // fetch data you need
      user = this.store.getData('user')

    this.$html = $(`
      <div>
        <h4>Component D</h4>
        <hr/>
        ${ foods.reduce((lis, food)=> {
          return lis += `<button data-name="${food}" class="btn-blue">${food}</button>`
          }, '') }
      </div>
    `)

    this.$html.on('click', 'button', function() {
      user.likesFoods.push($(this).data().name)
      store.setData('user', user)
    })

    $(this.id).empty()
    $(this.id).append(this.$html)
  }
}

class MyUser extends Mod {
  constructor(id, store, ...bankNames) {
    super(id, store, ...bankNames)
  }
  render() {
    let store = this.store,
      user = this.store.getData('user')

    this.$html = $(`
      <div>
        <h4>Component C</h4>
        <hr/>
        <p>${user.name} likes ${user.likesFoods}</p>
      </div>
    `)

    $(this.id).empty()
    $(this.id).append(this.$html)
  }
}


let foods = [ 'cheeseburger', 'salad', 'chicken rice' ],
  user = { name: 'Moddy', likesFoods: [] }
let ex1store = new Store()
ex1store.addBank('foods', foods)
ex1store.addBank('user', user)

let newFoods = new Foods('#foods', ex1store),
  moddy = new MyUser('#moddy', ex1store, 'user')
newFoods.render()
moddy.render()
