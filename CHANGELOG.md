*Breaking:* If you want selected options to no longer appear in the select, you
now _must_ either pass them back to `FilteredMultiSelect` via its
`selectedOptions` prop or manually remove them from the `options` list.

A `FilteredMultiSelect` will now update its display if its `options` list's
`.length` changes or is no longer `===` the previous `options` list.

Now using ES6 transforms when transpiling.

Removed React from package.json `dependencies` - it's now only in
`peerDependencies`.

## 0.1.1 - 2014-11-13

No code changes - version bump to get correct package.json metadata into npm.

## 0.1.0 - 2014-11-13

Initial version.