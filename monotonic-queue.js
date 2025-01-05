
function increasingMonotonicQueue(arr){
    const queue = [];

    for(let i = 0; i < arr.length; i++){
        while(queue.length > 0 && queue[queue.length - 1] > arr[i]){
            queue.pop();
        }

        queue.push(arr[i]);
    }

    return queue;
}

function decreasingMonotonicQueue(arr){
    const queue = [];

    for(let i = 0; i < arr.length; i++){
        while(queue.length > 0 && queue[queue.length - 1] < arr[i]){
            queue.pop();
        }

        queue.push(arr[i]);
    }

    return queue;
}

let array = [5,6,1,7,8,3,56,8];

console.log("Increasing monotonic queue", increasingMonotonicQueue(array));
console.log("Decreasing monotonic queue", decreasingMonotonicQueue(array));