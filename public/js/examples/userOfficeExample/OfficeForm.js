class OfficeForm extends Mod {
  constructor(id, store, ...bankNames) {
    super(id, store, ...bankNames)
  }
  render() {
    let store = this.store,
      users = this.store.getData('users'),
      offices = this.store.getData('offices')

    this.$html = $(`
      <div>
        <h4>New office!</h4> <input type="text"/>
      </div>
    `)

    let $input = this.$html.find('input:first')

    // gmaps
    let autocomplete = new google.maps.places.Autocomplete($input[0])
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      let place = autocomplete.getPlace(),
        name = place.formatted_address,
        lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng()

        // offices.push({ name, id: office.id, lat, lng, users: [] })
        offices.push(genOffice(name, lat, lng))
        $input.val("")

        store.setData('users', users)
        store.setData('offices', offices)
    })

    $(this.id).empty()
    $(this.id).append(this.$html)
  }
}
