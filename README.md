# codemirror-magma

A Codemirror mode for the Magma language.

The file `mode.js` defines the mode "magma" and the corresponding "text/x-magma" MIME type.
This requires `CodeMirror` and the simple mode addon (`codemirror/addon/mode/simple.js`) to
already be loaded.

## Browser example

This example uses `cdnjs` to load the `codemirror` dependencies, then loads `mode.js` to define the Magma mode.

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/codemirror.min.css" rel='stylesheet' type='text/css'>
<link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/theme/base16-dark.min.css" rel='stylesheet' type='text/css'>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/addon/mode/simple.min.js"></script>
<script src="mode.js"></script>
```

Also see `demo.html`.

## Node

```javascript
var CodeMirror = require('codemirror')
require('codemirror/addon/mode/simple.js)
require('./mode.js') // or require('codemirror-magma') if this makes it to npm
```
