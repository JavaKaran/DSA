
function increasingMonotonicStack(arr){
    let result = [];
    let stack = [];

    for(let i = 0; i < arr.length; i++){
        while(stack.length > 0 && stack[stack.length - 1] > arr[i]){
            stack.pop();
        }

        stack.push(arr[i]);
    }

    while(stack.length > 0){
        result.unshift(stack.pop());
    }

    return result;
}

function decreasingMonotonicStack(arr){
    let result = [];
    let stack = [];

    for(let i = 0; i < arr.length; i++){
        while(stack.length > 0 && stack[stack.length - 1] < arr[i]){
            stack.pop();
        }

        stack.push(arr[i]);
    }

    while(stack.length > 0){
        result.push(stack.pop());
    }

    return result;
}

let array = [3, 1, 4, 1, 5, 9, 2, 6];

console.log("Increasing Monotonic Stack: ", increasingMonotonicStack(array));
console.log("Decreasing Monotonic Stack: ", decreasingMonotonicStack(array));