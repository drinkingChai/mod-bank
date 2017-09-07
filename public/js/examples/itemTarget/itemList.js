class ItemList extends Mod {
  constructor(id, store, ...bankNames) {
    super(id, store, ...bankNames)
  }
  render() {
    console.log('rendered everything!');

    let store = this.store,
      items = this.store.getData('items')

    this.$html = $(`
      <div>
        <ul>
          ${ items.reduce((lis, item)=> {
              return lis += `
                <li data-id=${item.id}>I have ${item.count} ${item.name}<button>Delete</button></li>
              `;
            }, '')}
        </ul>
      </div>
    `);

    this.$html.on('click', 'button', function() {
      let id = $(this).parent().data().id
      items = items.filter(i=> i.id*1 != id*1)
      store.setData('items', items)
    })

    $(this.id).empty()
    $(this.id).append(this.$html)
  }
  update(newData) {
    // overwriting parent
    console.log('deleting one item, not re-rendering, spaghetti!! woo!!!');
    
    this.store = newData
    let itemIds = this.store.getData('items').map(i=> i.id),
      lis = this.$html.find('li')

    lis.each(function(i) {
      if (!itemIds.includes($(this).data().id)) $(this).remove()
    })
  }
}
