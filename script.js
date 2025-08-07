let bars = [];
let delay = 50;
let size = 50;

const barContainer = document.getElementById('barContainer');
const speedSlider = document.getElementById('speedSlider');
const sizeSlider = document.getElementById('sizeSlider');

speedSlider.addEventListener('input', () => {
    delay = 100 - speedSlider.value;
});
sizeSlider.addEventListener('input', () => {
    size = sizeSlider.value;
    generateArray();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateArray() {
    bars = [];
    barContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        bars.push(value);
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${100 / size}%`;
        barContainer.appendChild(bar);
    }
}

async function sort() {
    const algo = document.getElementById('algoSelect').value;
    switch (algo) {
        case 'bubble': await bubbleSort(); break;
        case 'insertion': await insertionSort(); break;
        case 'selection': await selectionSort(); break;
        case 'merge': await mergeSort(0, bars.length - 1); break;
        case 'quick': await quickSort(0, bars.length - 1); break;
    }
}

// Sorting Algorithms

async function bubbleSort() {
    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            if (bars[j] > bars[j + 1]) {
                [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
                renderBars();
                await sleep(delay);
            }
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < bars.length; i++) {
        let key = bars[i];
        let j = i - 1;
        while (j >= 0 && bars[j] > key) {
            bars[j + 1] = bars[j];
            j = j - 1;
            renderBars();
            await sleep(delay);
        }
        bars[j + 1] = key;
        renderBars();
        await sleep(delay);
    }
}

async function selectionSort() {
    for (let i = 0; i < bars.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < bars.length; j++) {
            if (bars[j] < bars[minIdx]) minIdx = j;
        }
        [bars[i], bars[minIdx]] = [bars[minIdx], bars[i]];
        renderBars();
        await sleep(delay);
    }
}

async function mergeSort(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
    renderBars();
    await sleep(delay);
}

async function merge(start, mid, end) {
    const left = bars.slice(start, mid + 1);
    const right = bars.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) bars[k++] = left[i++];
        else bars[k++] = right[j++];
    }
    while (i < left.length) bars[k++] = left[i++];
    while (j < right.length) bars[k++] = right[j++];
}

async function quickSort(start, end) {
    if (start >= end) return;
    const pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
    renderBars();
    await sleep(delay);
}

async function partition(start, end) {
    const pivot = bars[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
        if (bars[j] < pivot) {
            i++;
            [bars[i], bars[j]] = [bars[j], bars[i]];
            renderBars();
            await sleep(delay);
        }
    }
    [bars[i + 1], bars[end]] = [bars[end], bars[i + 1]];
    return i + 1;
}

function renderBars() {
    barContainer.innerHTML = '';
    for (let i = 0; i < bars.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${bars[i] * 3}px`;
        bar.style.width = `${100 / size}%`;
        barContainer.appendChild(bar);
    }
}

generateArray();
