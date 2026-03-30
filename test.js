import {HashMap} from "./script.js";

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden');


console.log(test.length());
console.log(test.buckets.forEach((list) => {
    console.log(list.toString())
}))

test.set('ice cream', '1')
test.set('jacket', '2')
test.set('kite', '3')

console.log(test.buckets.forEach((list) => {
    console.log(list.toString())
}))