## 0.2.0 - 2014-12-06

**Breaking:** If you want selected options to no longer appear in the select,
you now _must_ either pass them back to `FilteredMultiSelect` via its
`selectedOptions` prop or manually remove them from list that gets passed as its
 `options` prop.

Fixed: `FilteredMultiSelect` will now re-render if its `options` prop is
replaced with another object, or `options.length` changes.

Removed React from package.json `dependencies` - it's now only in
`peerDependencies`.

## 0.1.1 - 2014-11-13

No code changes - version bump to get correct package.json metadata into npm.

## 0.1.0 - 2014-11-13

Initial version.