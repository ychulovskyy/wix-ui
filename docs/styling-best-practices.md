# Styling Best-Practices

## Avoid lifting classes
Some people would write a component's stylsheet like this:
```css
.button {
  background-color: grey;
  color: white;
}

.button .prefix {
  background-color: black;
}

.prefixRed {
  color: red;
}
```

While they could have written:

```css
.button {
  background-color: grey;
  color: white;
}

.button .prefix {
  background-color: black;
}

.button .prefix.prefixRed {
  color: red;
}
```

It comes from a wish to optimise run-time, by having shorter rules.

Assuming that `.prefixRed` can only appear along-side `.prefix`,
and that each component is namespaced this would work exactly the same, and won't introduce any risk.

The thing is, that it is hard for future maintenance.

Say that you want to add a default yellow color to `.prefix` like so:
```css
.button {
  background-color: grey;
  color: white;
}

.button .prefix {
  background-color: black;
  color: yellow;
}

.prefixRed {
  color: red;
}
```

The css priority (specifity) logic would take the default yellow color rule over the red.

In other cases, rule ordering would decide on the priority.

This makes it hard to add defaults, or refactor the stylesheet.