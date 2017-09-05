class UserList extends Mod {
  constructor(id, store, ...bankNames) {
    super(id, store, ...bankNames)
  }
  render() {
    let store = this.store,
      users = this.store.getData('users'),
      offices = this.store.getData('offices')

    this.$html = $(`
      <ul>
        ${ users.reduce((lis, user)=> {
            return lis += `
              <li data-id="${user.id}" data-cur-office-id=${user.officeId}>
                <h3 class="text-bold">${ user.name }</h3>
                <select>
                  ${ offices.reduce((opts, off)=> {
                      return opts += `
                        <option data-office-id="${off.id}" ${off.id === user.officeId ? "selected": ""}>${off.name}</option>
                      `
                    }, '<option>---</option>')}
                </select>
                <button class="btn">Delete!</button>
              </li>
            `
          }, '')}
      </ul>
    `)

    this.$html.on('click', 'button', function(e) {
      let id = $(this).parent().data().id
      users = users.filter(u=> u.id != id)
      offices.forEach(office=> {
        office.users = office.users.filter(u=> u.id != id)
      })

      store.setData('users', users)
      store.setData('offices', offices)
    })

    this.$html.on('change', 'select', function() {
      let id = $(this).parent().data().id,
        prevOfficeId = $(this).parent().data().curOfficeId,
        officeId = $(this).find(':selected').data().officeId,
        $user = $(this)

      let user = users.find(u=> u.id == id),
        prevOffice = offices.find(o=> o.id == prevOfficeId),
        newOffice = offices.find(o=> o.id == officeId)

      if (prevOffice) prevOffice.users = prevOffice.users.filter(u=> u.id != user.id)
      if (newOffice) newOffice.users.push(user)
      user.officeId = newOffice ? newOffice.id : null
      $user.parent().data().curOfficeId = user.officeId

      store.setData('offices', offices)
    })

    $(this.id).empty()
    $(this.id).append(this.$html)
  }
}
