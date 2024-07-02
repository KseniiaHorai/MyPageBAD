let something;

const buttons = document.querySelectorAll("button");
const result = document.querySelectorAll(".result");

const functions = {
    func1: function (array, index) {
        //Результати усіх обрахувань
        const start = new Date().getTime();
        const sortedArray = array.slice(0).sort((a, b) => b - a);
        const median = findMedian(sortedArray);
        const average = findAverage(sortedArray);
        const increasingSubset = findLongestIncreasingSequence(array);
        const decreasingSubset = findLongestDecreasingSequence(array);
        const end = new Date().getTime();
        const time = end - start;
        result[
            index
        ].innerHTML = `<li><span class="time">Time:  ${time}ms</span></li>
                              
        <li><span>Min:</span>${sortedArray[sortedArray.length - 1]}</li>
                                <li><span>Max:  </span>${sortedArray[0]}</li>
                                <li><span>Median:  </span>${median}</li>
                                <li><span>Average:  </span>${average}</li>
                                <li><span>IncreasingSequence:  </span>${increasingSubset.join(
                                    ", "
                                )}</li>
                                <li><span>DecreasingSequence:</span>   ${decreasingSubset.join(
                                    ", "
                                )}</li>`;
    },

    func2: function (array, index) {
        //1. Max і Min за допомогою reduce. Можна було б так само пройтися циклом, проте цей метод ніколи не використовувала, хотілось спробувати
        const start = new Date().getTime();
        const min = array.reduce((p, c) => Math.min(p, c), Infinity);
        const max = array.reduce((p, c) => Math.max(p, c), -Infinity);
        const end = new Date().getTime();
        const time = end - start;
        result[index].innerHTML =
            `<span class="time">Time:  ${time}ms</span><br>` +
            `<span>Min: </span>${min}<br>` +
            `<span>Max: </span>${max}`;
    },
    //2 Медіана - тут доведеться сортувати
    func3: function (array, index) {
        //2.1 Спробувала сортування QuickSort прописати вручну і знайшла медіану
        const start = new Date().getTime();
        const sortedArray = quickSort(array);
        const min = sortedArray[0];
        const max = sortedArray[sortedArray.length - 1];
        const median = findMedian(sortedArray);
        const end = new Date().getTime();
        const time = end - start;
        result[index].innerHTML =
            `<span class="time">Time:  ${time}ms</span><br>` +
            `<span>Min:</span> ${min}<br>` +
            `<span>Max:</span> ${max}<br>` +
            `<span>Median:</span> ${median}`;
    },
    func4: function (array, index) {
        //2.2 Сортування з вбудованим методом sort виявилося швидшим,
        //тому застосуємо його, знайдемо медіану і середнє значення
        const start = new Date().getTime();
        const sortedArray = array.slice(0).sort((a, b) => a - b);
        const min = sortedArray[0];
        const max = sortedArray[sortedArray.length - 1];
        const median = findMedian(sortedArray);
        const average = findAverage(sortedArray);
        const end = new Date().getTime();
        const time = end - start;
        result[index].innerHTML =
            `<span class="time">Time:  ${time}ms</span><br>` +
            `<span>Min: </span>${min}<br>` +
            `<span>Max: </span>${max}<br>` +
            `<span>Median: </span> ${median}<br>` +
            `<span>Average: </span> ${average}`;
    },
    func5: function (array, index) {
        //3. Знайдемо найбільшу послідовність чисел, яка збільшується і яка зменшується
        const start = new Date().getTime();
        const increasingSubset = findLongestIncreasingSequence(array);
        const decreasingSubset = findLongestDecreasingSequence(array);
        const end = new Date().getTime();
        const time = end - start;
        result[index].innerHTML =
            `<span class="time">Time:  ${time}ms</span><br>` +
            `<span>IncreasingSequence: </span> ${increasingSubset.join(
                ", "
            )}<br>` +
            `<span>DecreasingSequence: </span>${decreasingSubset.join(", ")}`;
    },
};

buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let file = document.getElementById("file").files[0];
        if (!file) {
            alert("Choose a file first");
            return 0;
        }
        result[index].innerHTML = `<span>Loading...</span>`;
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            let array = reader.result.split("\n");
            array = array.map(function (number) {
                return +number;
            });
            const funcName = `func${index + 1}`;
            functions[funcName](array, index);
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
    });
});

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const less = [];
    const greater = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > pivot) {
            greater.push(arr[i]);
        } else {
            less.push(arr[i]);
        }
    }

    return [...quickSort(less), pivot, ...quickSort(greater)];
}

function findMedian(array) {
    let median;
    const middleIndex = array.length / 2;
    if (Number.isInteger(middleIndex)) {
        const rightIndex = middleIndex;
        const leftIndex = rightIndex - 1;
        median = (array[rightIndex] + array[leftIndex]) / 2;
    } else {
        median = array[Math.floor(middleIndex)];
    }
    return median;
}

function findAverage(array) {
    let sum = 0;
    array.forEach((item) => {
        sum += item;
    });
    return sum / array.length;
}

function findLongestIncreasingSequence(arr) {
    let maxSeq = [];
    let currentSeq = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === 0 || arr[i] > arr[i - 1]) {
            currentSeq.push(arr[i]);
        } else {
            if (currentSeq.length > maxSeq.length) {
                maxSeq = currentSeq;
            }
            currentSeq = [arr[i]];
        }
    }

    if (currentSeq.length > maxSeq.length) {
        maxSeq = currentSeq;
    }

    return maxSeq;
}

function findLongestDecreasingSequence(arr) {
    let maxSeq = [];
    let currentSeq = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === 0 || arr[i] < arr[i - 1]) {
            currentSeq.push(arr[i]);
        } else {
            if (currentSeq.length > maxSeq.length) {
                maxSeq = currentSeq;
            }
            currentSeq = [arr[i]];
        }
    }

    if (currentSeq.length > maxSeq.length) {
        maxSeq = currentSeq;
    }

    return maxSeq;
}
