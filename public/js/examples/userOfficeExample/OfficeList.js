class OfficeList extends Mod {
  constructor(id, store, ...bankNames) {
    super(id, store, ...bankNames)
  }
  render() {
    let store = this.store,
      users = this.store.getData('users'),
      offices = this.store.getData('offices')

    let $offices = $(`
      <ul>
        ${ offices.reduce((lis, office)=> {
            return lis += `
              <li data-id="${office.id}">
                <p class="text-bold">${office.name}</p>
                <div class="text-italic">
                  <p>Lat: ${office.lat}</p>
                  <p>Lng: ${office.lng}</p>
                </div>
                <p class="text-bold">Users: ${office.users.length}</p>
                <button class="btn">Delete</button>
              </li>
            `
          }, '')}
      </ul>
    `)

    $offices.on('click', 'button', function() {
      let id = $(this).parent().data().id

      offices = offices.filter(office=> office.id != id)
      store.setData('offices', offices)
      store.setData('users', users)
    })

    $(this.id).empty()
    $(this.id).append($offices)
  }
}
