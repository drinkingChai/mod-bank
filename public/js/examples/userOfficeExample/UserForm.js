class UserForm extends Mod {
  constructor(id, store, ...bankNames) {
    super(id, store, ...bankNames)
  }
  render() {
    let store = this.store,
      users = this.store.getData('users')

    let $form = $(`
      <div>
        <h3>Name:</h3> <input type="text"/>
        <button class="btn">Add</button>
      </div>
    `);

    let $input = $form.find('input');

    $form.on('click', 'button', function() {
      if (!$input.val().trim().length) return;

      users.push(genUser($input.val()));
      $input.val("");

      store.setData('users', users)
    })

    $(this.id).empty();
    $(this.id).append($form);
  }
}
