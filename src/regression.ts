// This is a test file that is ignored when building
// Used to crate and test the least method implementation in ts (My first time using this language)

// @ts-ignore
let x;
let y;
// Test values.
x = [1, 2, 3, 4, 5]
y = [1, 2, 3, 4, 5, 6]

// https://www.cuemath.com/data/least-squares/
// Form equation
let outX=0;
let outY=0;
let outX2=0;
let outXY=0;
for (let i=0; i<x.length; ++i) {
    // Loop through every x value and sum them up.
    // Is there a better way of doing this??
    outX = outX + x[i]
    outY = outY + y[i]
    outX2 = outX2 + (x[i] * x[i])
    outXY = outXY + (x[i] * y[i])
}
// Form gradient
let gradient = (x.length*outXY-(outY*outX)) / (x.length*outX2-(outX*outX))

console.log(gradient)
// Form intercept
let intercept = (outY-(gradient*outX))/x.length

console.log(intercept)
// Form points from equation
let XVals = [];

// Find x value for every y value supplied using the equation
for (let i=0; i<y.length; ++i) {
    // y = mx+c
    // Given y, solve for x
    XVals.push((y[i]-intercept)/gradient)
}
console.log(XVals)