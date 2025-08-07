const container = document.getElementById("barsContainer");
const sizeSlider = document.getElementById("size");
const algorithmSelect = document.getElementById("algorithm");
const sortBtn = document.getElementById("sortBtn");
const newArrayBtn = document.getElementById("newArrayBtn");
const speedSlider = document.getElementById("speedRange");

let array = [];
let delay = 50;

sizeSlider.addEventListener("input", generateBars);
speedSlider.addEventListener("input", () => {
  delay = 101 - parseInt(speedSlider.value);
});

newArrayBtn.addEventListener("click", generateBars);

function generateBars() {
  array = [];
  container.innerHTML = "";
  for (let i = 0; i < sizeSlider.value; i++) {
    const value = Math.floor(Math.random() * 400) + 10;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    bar.style.width = `${100 / sizeSlider.value}%`;
    container.appendChild(bar);
  }
}

function swap(el1, el2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let temp = el1.style.height;
      el1.style.height = el2.style.height;
      el2.style.height = temp;
      resolve();
    }, delay);
  });
}

async function bubbleSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      if (
        parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)
      ) {
        await swap(bars[j], bars[j + 1]);
      }
    }
  }
}

async function selectionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < bars.length; j++) {
      if (
        parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)
      ) {
        minIndex = j;
      }
    }
    await swap(bars[i], bars[minIndex]);
  }
}

async function insertionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 1; i < bars.length; i++) {
    let j = i;
    while (
      j > 0 &&
      parseInt(bars[j - 1].style.height) > parseInt(bars[j].style.height)
    ) {
      await swap(bars[j], bars[j - 1]);
      j--;
    }
  }
}

async function mergeSort(start = 0, end = array.length - 1) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
  generateBars(); // Refresh view
}

async function merge(start, mid, end) {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
  }

  while (i < left.length) array[k++] = left[i++];
  while (j < right.length) array[k++] = right[j++];

  await new Promise((resolve) => setTimeout(resolve, delay));
}

async function quickSort(start = 0, end = array.length - 1) {
  if (start >= end) return;
  const pivotIndex = await partition(start, end);
  await quickSort(start, pivotIndex - 1);
  await quickSort(pivotIndex + 1, end);
  generateBars(); // Refresh view
}

async function partition(start, end) {
  let pivot = array[end];
  let pIndex = start;

  for (let i = start; i < end; i++) {
    if (array[i] < pivot) {
      [array[i], array[pIndex]] = [array[pIndex], array[i]];
      pIndex++;
    }
  }

  [array[pIndex], array[end]] = [array[end], array[pIndex]];
  await new Promise((resolve) => setTimeout(resolve, delay));
  return pIndex;
}

sortBtn.addEventListener("click", async () => {
  switch (algorithmSelect.value) {
    case "bubble":
      await bubbleSort();
      break;
    case "selection":
      await selectionSort();
      break;
    case "insertion":
      await insertionSort();
      break;
    case "merge":
      await mergeSort();
      break;
    case "quick":
      await quickSort();
      break;
  }
});

generateBars();
