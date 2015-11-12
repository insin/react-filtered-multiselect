# 1.2.4 / 2015-11-12

Changed UMD build directory.

# 0.4.1 / 2015-11-08

Removed `dist/` directory from GitHub in favour of [npmcdn](https://npmcdn.com/).

# 0.4.0 /  2015-10-28

**Breaking:** Now requires React 0.14.

# 0.3.2 / 2015-03-11

Re-bundled with latest Browserify (9.x) and React (0.13.x), but still
compatible with React 0.12.x.

# 0.3.1 / 2015-01-13

Added: new `buttonActive` property for the `classNames` prop - this will be
used when one or more options are selected, otherwise `button` will be used.

Changed: `classNames` prop no longer has to provide all properties - defaults
will be used where not provided.

# 0.3.0 / 2015-01-01

Added: double-clicking now adds the selected option to the selection.

# 0.2.0 / 2014-12-06

**Breaking:** If you want selected options to no longer appear in the select,
you now _must_ either pass them back to `FilteredMultiSelect` via its
`selectedOptions` prop or manually remove them from list that gets passed as its
 `options` prop.

Fixed: `FilteredMultiSelect` will now re-render if its `options` prop is
replaced with another object, or `options.length` changes.

Removed React from package.json `dependencies` - it's now only in
`peerDependencies`.

# 0.1.1 / 2014-11-13

No code changes - version bump to get correct package.json metadata into npm.

# 0.1.0 / 2014-11-13

Initial version.
