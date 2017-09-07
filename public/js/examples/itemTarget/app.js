let items = [ { id: 1, name: 'apples', count: 5 },
              { id: 2, name: 'oranges', count: 10 },
              { id: 3, name: 'strawberries', count: 3 }]

const itemStore = new Store()
itemStore.addBank('items', items)

let newItemList = new ItemList('#item-list', itemStore, 'items')
newItemList.render();
