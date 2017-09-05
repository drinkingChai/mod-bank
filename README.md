# ModBank
A html module and front end databank. Modules can modify the data in the front end and the bank will update all related modules.

`requires: jQuery`

### Getting Started
---
Download the files `Mod.js` and `Store.js` from `public/js` and include them in your html file
```html
<script src="js/Store.js" charset="utf-8"></script>
<script src="js/Mod.js" charset="utf-8"></script>
```

### Concept
---
**Store**
- stores data in banks
- attach modules to banks
- when bank update is triggered via `setData`, will call `update` on all modules

**Module**
- can be attached to multiple banks in store
- `update` calls `render`

### Use
---
**Module**
Extend this class like this:
```javascript
class NewMod extends Mod {
  constructor(id, store, ...bankNames) {
    super(id, store, ...bankNames)
  }
}
```
Change the `render` function for your module
Call `setData` with the updated data anywhere

**Example:**
```javascript
render() {
  let store = this.store
  this.$html = $(`<button></button>`)
  this.$html.on('click', 'button', function() {
    store.setData('bankName', newData)
  })
}
```
Please find the examples in the repo in `public/js`
