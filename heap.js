
class MaxHeap {
    constructor(){
        this.heap = [];
    }

    maxHeapify(arr, n, idx){
        let largest = idx;
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        
        if(left < n && arr[left] > arr[largest]){
            largest = left;
        }

        if(right < n && arr[right] > arr[largest]){
            largest = right;
        }

        if(largest != idx){
            let temp = arr[idx];
            arr[idx] = arr[largest];
            arr[largest] = temp;

            this.maxHeapify(arr, n, largest);
        }
    }

    insert(val){
        this.heap.push(val);
        let idx = this.heap.length - 1;
        let parent = Math.floor((idx - 1) / 2);

        while(idx > 0 && this.heap[parent] < this.heap[idx]){
            [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
            idx = parent;
            parent = Math.floor((idx - 1) / 2);
        }
    }

    remove(val){
        const size = this.heap.length;

        let i = 0;
        for(i = 0; i < size; i++){
            if(this.heap[i] === val){
                break;
            }
        }

        [this.heap[i], this.heap[size - 1]] = [this.heap[size - 1], this.heap[i]];
        this.heap.splice(size - 1, 1);

        for(let i = parseInt(this.heap.length/2) - 1; i >= 0; i--){
            this.maxHeapify(this.heap, this.heap.length, i);
        }
    }

    findMax(){
        return this.heap[0];
    }

    removeMax(){
        return this.remove(this.heap[0]);
    }

    extractMax(){
        const max = this.findMax();
        this.removeMax();
        return max;
    }

    size(){
        return this.heap.length;
    }

    isEmpty(){
        return this.heap.length === 0;
    }

    getHeap(){
        return this.heap;
    }

    convertToMaxHeap(arr){
        this.heap = arr;
        for(let i = parseInt(this.heap.length/2) - 1; i >=0; i--){
            this.maxHeapify(this.heap, this.heap.length, i);
        }
    }
}

class MinHeap {
    constructor(){
        this.heap = [];
    }

    minHeapify(arr, n, idx){
        let smallest = idx;
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        
        if(left < n && arr[left] < arr[smallest]){
            smallest = left;
        }

        if(right < n && arr[right] < arr[smallest]){
            smallest = right;
        }

        if(smallest != idx){
            [ arr[idx], arr[smallest] ] = [ arr[smallest], arr[idx] ];

            this.minHeapify(arr, n, smallest);
        }
    }

    insert(val){
        this.heap.push(val);
        let idx = this.heap.length - 1;
        let parent = Math.floor((idx - 1) / 2);

        while(idx > 0 && this.heap[parent] > this.heap[idx]){
            [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
            idx = parent;
            parent = Math.floor((idx - 1) / 2);
        }
    }

    remove(val){
        const size = this.heap.length;

        let i = 0;
        for(i = 0; i < size; i++){
            if(this.heap[i] === val){
                break;
            }
        }

        [this.heap[i], this.heap[size - 1]] = [this.heap[size - 1], this.heap[i]];
        this.heap.splice(size - 1, 1);

        for(let i = parseInt(this.heap.length/2) - 1; i >= 0; i--){
            this.minHeapify(this.heap, this.heap.length, i);
        }
    }

    findMin(){
        return this.heap[0];
    }

    removeMin(){
        return this.remove(this.heap[0]);
    }

    extractMin(){
        const min = this.findMin();
        this.removeMin();
        return min;
    }

    size(){
        return this.heap.length;
    }

    isEmpty(){
        return this.heap.length === 0;
    }

    getHeap(){
        return this.heap;
    }

    convertToMinHeap(arr){
        this.heap = arr;
        for(let i = parseInt(this.heap.length/2) - 1; i >=0; --i){
            this.minHeapify(this.heap, this.heap.length, i);
        }
    }
}

const heap = new MaxHeap();
heap.insert(3);
heap.insert(4);
heap.insert(9);
heap.insert(5);
heap.insert(2);

console.log("Heap", heap.getHeap());

const maxHeap = new MaxHeap();

console.log("Converted to Max Heap:");
maxHeap.convertToMaxHeap([3, 5, 9, 6, 8, 20, 10, 12, 18, 9]);
console.log(maxHeap.getHeap());