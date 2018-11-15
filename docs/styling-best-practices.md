# Styling Best-Practices

## Avoid lifting classes
Some people try to optimize this kind of rule:
```css
.myComp .elem1.colorRed  {
  color: red;
} 
```
With this one:
```css
.colorRed  {
  color: red;
} 
```
Assuming that `.colorRed` can only appear along-side `.elem1`,
and that each component is namespaced this would work exactly the same, and won't introduce any risk.

The thing is, that it is hard to maintain.
Say that you want to add a default color to `.elem1` like so:
```css
.myComp .elem1  {
  color: blue;
} 
.colorRed  {
  color: red;
} 
```
The css priority logic would take the default color rule (blue) over the red.

In other cases, rule ordering would decide on the priority.

This makes it hard to add defaults, or refactor the stylesheet.