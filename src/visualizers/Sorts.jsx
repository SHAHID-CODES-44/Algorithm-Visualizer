import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/base.css";
import OnRefresh from "../pages/OnRefresh";

// --------------------------------- CODE SNIPPETS FOR ALL SORTS ----------------------------------------
// Bubble Sort Codes
const BubbleSortCodes = {
  cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1])
                swap(arr[j], arr[j + 1]);
}`,
  java: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
}`,
  python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
  go: `func bubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}`,
  ruby: `def bubble_sort(arr)
  n = arr.length
  (0...n - 1).each do |i|
    (0...n - i - 1).each do |j|
      arr[j], arr[j + 1] = arr[j + 1], arr[j] if arr[j] > arr[j + 1]
    end
  end
  arr
end`,
};

// Selection Sort Codes
const SelectionSortCodes = {
  cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        swap(arr[i], arr[minIdx]);
    }
}`,
  java: `void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
  python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
  go: `func selectionSort(arr []int) {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        minIdx := i
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        arr[i], arr[minIdx] = arr[minIdx], arr[i]
    }
}`,
  ruby: `def selection_sort(arr)
  n = arr.length
  (0...n - 1).each do |i|
    min_idx = i
    (i + 1...n).each do |j|
      min_idx = j if arr[j] < arr[min_idx]
    end
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
  end
  arr
end`,
};

// Insertion Sort Codes
const InsertionSortCodes = {
  cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
  java: `void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
  python: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
  go: `func insertionSort(arr []int) {
    n := len(arr)
    for i := 1; i < n; i++ {
        key := arr[i]
        j := i - 1
        for j >= 0 && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}`,
  ruby: `def insertion_sort(arr)
  n = arr.length
  (1...n).each do |i|
    key = arr[i]
    j = i - 1
    while j >= 0 && arr[j] > key
      arr[j + 1] = arr[j]
      j -= 1
    end
    arr[j + 1] = key
  end
  arr
end`,
};

// Shell Sort Codes
const ShellSortCodes = {
  cpp: `void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
  java: `void shellSort(int[] arr) {
    int n = arr.length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
  python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2`,
  go: `func shellSort(arr []int) {
    n := len(arr)
    for gap := n / 2; gap > 0; gap /= 2 {
        for i := gap; i < n; i++ {
            temp := arr[i]
            j := i
            for j >= gap && arr[j-gap] > temp {
                arr[j] = arr[j-gap]
                j -= gap
            }
            arr[j] = temp
        }
    }
}`,
  ruby: `def shell_sort(arr)
  n = arr.length
  gap = n / 2
  while gap > 0
    (gap...n).each do |i|
      temp = arr[i]
      j = i
      while j >= gap && arr[j - gap] > temp
        arr[j - gap], arr[j] = arr[j], arr[j - gap] if false
        arr[j] = arr[j - gap]
        j -= gap
      end
      arr[j] = temp
    end
    gap /= 2
  end
  arr
end`,
};

// Cocktail Sort Codes
const CocktailSortCodes = {
  cpp: `void cocktailSort(int arr[], int n) {
    bool swapped = true;
    int start = 0, end = n - 1;
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) { swap(arr[i], arr[i + 1]); swapped = true; }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) { swap(arr[i], arr[i + 1]); swapped = true; }
        }
        start++;
    }
}`,
  java: `void cocktailSort(int[] arr) {
    int n = arr.length;
    boolean swapped = true;
    int start = 0, end = n - 1;
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                int t = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = t;
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                int t = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = t;
                swapped = true;
            }
        }
        start++;
    }
}`,
  python: `def cocktail_sort(arr):
    n = len(arr)
    swapped = True
    start, end = 0, n - 1
    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped:
            break
        swapped = False
        end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1`,
  go: `func cocktailSort(arr []int) {
    n := len(arr)
    swapped := true
    start, end := 0, n-1
    for swapped {
        swapped = false
        for i := start; i < end; i++ {
            if arr[i] > arr[i+1] {
                arr[i], arr[i+1] = arr[i+1], arr[i]
                swapped = true
            }
        }
        if !swapped {
            break
        }
        swapped = false
        end--
        for i := end - 1; i >= start; i-- {
            if arr[i] > arr[i+1] {
                arr[i], arr[i+1] = arr[i+1], arr[i]
                swapped = true
            }
        }
        start++
    }
}`,
  ruby: `def cocktail_sort(arr)
  n = arr.length
  swapped = true
  start_i, end_i = 0, n - 1
  while swapped
    swapped = false
    (start_i...end_i).each do |i|
      if arr[i] > arr[i + 1]
        arr[i], arr[i + 1] = arr[i + 1], arr[i]
        swapped = true
      end
    end
    break unless swapped
    swapped = false
    end_i -= 1
    (start_i...end_i).to_a.reverse.each do |i|
      if arr[i] > arr[i + 1]
        arr[i], arr[i + 1] = arr[i + 1], arr[i]
        swapped = true
      end
    end
    start_i += 1
  end
  arr
end`,
};

// Comb Sort Codes
const CombSortCodes = {
  cpp: `void combSort(int arr[], int n) {
    int gap = n;
    bool swapped = true;
    while (gap != 1 || swapped) {
        gap = (gap * 10) / 13;
        if (gap < 1) gap = 1;
        swapped = false;
        for (int i = 0; i + gap < n; i++) {
            if (arr[i] > arr[i + gap]) {
                swap(arr[i], arr[i + gap]);
                swapped = true;
            }
        }
    }
}`,
  java: `void combSort(int[] arr) {
    int n = arr.length;
    int gap = n;
    boolean swapped = true;
    while (gap != 1 || swapped) {
        gap = (gap * 10) / 13;
        if (gap < 1) gap = 1;
        swapped = false;
        for (int i = 0; i + gap < n; i++) {
            if (arr[i] > arr[i + gap]) {
                int t = arr[i]; arr[i] = arr[i + gap]; arr[i + gap] = t;
                swapped = true;
            }
        }
    }
}`,
  python: `def comb_sort(arr):
    n = len(arr)
    gap = n
    swapped = True
    while gap != 1 or swapped:
        gap = max(1, (gap * 10) // 13)
        swapped = False
        for i in range(n - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                swapped = True`,
  go: `func combSort(arr []int) {
    n := len(arr)
    gap := n
    swapped := true
    for gap != 1 || swapped {
        gap = (gap * 10) / 13
        if gap < 1 {
            gap = 1
        }
        swapped = false
        for i := 0; i+gap < n; i++ {
            if arr[i] > arr[i+gap] {
                arr[i], arr[i+gap] = arr[i+gap], arr[i]
                swapped = true
            }
        }
    }
}`,
  ruby: `def comb_sort(arr)
  n = arr.length
  gap = n
  swapped = true
  while gap != 1 || swapped
    gap = [(gap * 10) / 13, 1].max
    swapped = false
    (0...n - gap).each do |i|
      if arr[i] > arr[i + gap]
        arr[i], arr[i + gap] = arr[i + gap], arr[i]
        swapped = true
      end
    end
  end
  arr
end`,
};

// ---- MERGE SORT ----
const MergeSortCodes = {
  cpp: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
  java: `void mergeSort(int[] arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}
void merge(int[] arr, int l, int m, int r) {
    int[] left = Arrays.copyOfRange(arr, l, m + 1);
    int[] right = Arrays.copyOfRange(arr, m + 1, r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.length && j < right.length)
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}`,
  python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
  go: `func mergeSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    result := []int{}
    i, j := 0, 0
    for i < len(left) && j < len(right) {
        if left[i] <= right[j] {
            result = append(result, left[i]); i++
        } else {
            result = append(result, right[j]); j++
        }
    }
    result = append(result, left[i:]...)
    result = append(result, right[j:]...)
    return result
}`,
  ruby: `def merge_sort(arr)
  return arr if arr.length <= 1
  mid = arr.length / 2
  left = merge_sort(arr[0...mid])
  right = merge_sort(arr[mid..])
  result = []
  until left.empty? || right.empty?
    result << (left.first <= right.first ? left.shift : right.shift)
  end
  result + left + right
end`,
};

// ---- QUICK SORT ----
const QuickSortCodes = {
  cpp: `int partition(int arr[], int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++)
        if (arr[j] < pivot) swap(arr[++i], arr[j]);
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
  java: `void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
int partition(int[] arr, int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
    return i + 1;
}`,
  python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x < pivot]
    right = [x for x in arr[:-1] if x >= pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`,
  go: `func quickSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    pivot := arr[len(arr)-1]
    var left, right []int
    for _, v := range arr[:len(arr)-1] {
        if v < pivot {
            left = append(left, v)
        } else {
            right = append(right, v)
        }
    }
    result := quickSort(left)
    result = append(result, pivot)
    result = append(result, quickSort(right)...)
    return result
}`,
  ruby: `def quick_sort(arr)
  return arr if arr.length <= 1
  pivot = arr.last
  left = arr[0...-1].select { |x| x < pivot }
  right = arr[0...-1].select { |x| x >= pivot }
  quick_sort(left) + [pivot] + quick_sort(right)
end`,
};

// ---- HEAP SORT ----
const HeapSortCodes = {
  cpp: `void heapify(int arr[], int n, int i) {
    int largest = i, l = 2*i+1, r = 2*i+2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) { swap(arr[i], arr[largest]); heapify(arr, n, largest); }
}
void heapSort(int arr[], int n) {
    for (int i = n/2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n-1; i > 0; i--) { swap(arr[0], arr[i]); heapify(arr, i, 0); }
}`,
  java: `void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int t = arr[0]; arr[0] = arr[i]; arr[i] = t;
        heapify(arr, i, 0);
    }
}
void heapify(int[] arr, int n, int i) {
    int largest = i, l = 2*i+1, r = 2*i+2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int t = arr[i]; arr[i] = arr[largest]; arr[largest] = t;
        heapify(arr, n, largest);
    }
}`,
  python: `def heapify(arr, n, i):
    largest = i
    l, r = 2*i+1, 2*i+2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)`,
  go: `func heapify(arr []int, n, i int) {
    largest := i
    l, r := 2*i+1, 2*i+2
    if l < n && arr[l] > arr[largest] { largest = l }
    if r < n && arr[r] > arr[largest] { largest = r }
    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}
func heapSort(arr []int) {
    n := len(arr)
    for i := n/2 - 1; i >= 0; i-- { heapify(arr, n, i) }
    for i := n - 1; i > 0; i-- {
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    }
}`,
  ruby: `def heapify(arr, n, i)
  largest = i
  l, r = 2*i+1, 2*i+2
  largest = l if l < n && arr[l] > arr[largest]
  largest = r if r < n && arr[r] > arr[largest]
  if largest != i
    arr[i], arr[largest] = arr[largest], arr[i]
    heapify(arr, n, largest)
  end
end

def heap_sort(arr)
  n = arr.length
  (n/2 - 1).downto(0) { |i| heapify(arr, n, i) }
  (n-1).downto(1) do |i|
    arr[0], arr[i] = arr[i], arr[0]
    heapify(arr, i, 0)
  end
  arr
end`,
};

// ---- COUNTING SORT ----
const CountingSortCodes = {
  cpp: `void countingSort(int arr[], int n) {
    int maxVal = *max_element(arr, arr+n);
    vector<int> count(maxVal+1, 0), output(n);
    for (int i = 0; i < n; i++) count[arr[i]]++;
    for (int i = 1; i <= maxVal; i++) count[i] += count[i-1];
    for (int i = n-1; i >= 0; i--) output[--count[arr[i]]] = arr[i];
    for (int i = 0; i < n; i++) arr[i] = output[i];
}`,
  java: `void countingSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[max + 1];
    int[] output = new int[arr.length];
    for (int v : arr) count[v]++;
    for (int i = 1; i <= max; i++) count[i] += count[i - 1];
    for (int i = arr.length - 1; i >= 0; i--)
        output[--count[arr[i]]] = arr[i];
    System.arraycopy(output, 0, arr, 0, arr.length);
}`,
  python: `def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for v in arr:
        count[v] += 1
    for i in range(1, max_val + 1):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for v in reversed(arr):
        count[v] -= 1
        output[count[v]] = v
    return output`,
  go: `func countingSort(arr []int) []int {
    maxVal := arr[0]
    for _, v := range arr {
        if v > maxVal { maxVal = v }
    }
    count := make([]int, maxVal+1)
    for _, v := range arr { count[v]++ }
    for i := 1; i <= maxVal; i++ { count[i] += count[i-1] }
    output := make([]int, len(arr))
    for i := len(arr) - 1; i >= 0; i-- {
        count[arr[i]]--
        output[count[arr[i]]] = arr[i]
    }
    return output
}`,
  ruby: `def counting_sort(arr)
  max_val = arr.max
  count = Array.new(max_val + 1, 0)
  arr.each { |v| count[v] += 1 }
  (1..max_val).each { |i| count[i] += count[i - 1] }
  output = Array.new(arr.length)
  arr.reverse_each do |v|
    count[v] -= 1
    output[count[v]] = v
  end
  output
end`,
};

// ---- BUCKET SORT ----
const BucketSortCodes = {
  cpp: `void bucketSort(float arr[], int n) {
    vector<vector<float>> buckets(n);
    for (int i = 0; i < n; i++) buckets[int(n * arr[i])].push_back(arr[i]);
    for (int i = 0; i < n; i++) sort(buckets[i].begin(), buckets[i].end());
    int idx = 0;
    for (int i = 0; i < n; i++)
        for (float v : buckets[i]) arr[idx++] = v;
}`,
  java: `void bucketSort(float[] arr) {
    int n = arr.length;
    List<List<Float>> buckets = new ArrayList<>();
    for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());
    for (float v : arr) buckets.get((int)(n * v)).add(v);
    for (List<Float> b : buckets) Collections.sort(b);
    int idx = 0;
    for (List<Float> b : buckets)
        for (float v : b) arr[idx++] = v;
}`,
  python: `def bucket_sort(arr):
    n = len(arr)
    buckets = [[] for _ in range(n)]
    for v in arr:
        idx = int(n * v)
        buckets[idx].append(v)
    for b in buckets:
        b.sort()
    return [v for b in buckets for v in b]`,
  go: `func bucketSort(arr []float64) []float64 {
    n := len(arr)
    buckets := make([][]float64, n)
    for _, v := range arr {
        idx := int(float64(n) * v)
        buckets[idx] = append(buckets[idx], v)
    }
    for i := range buckets { sort.Float64s(buckets[i]) }
    result := []float64{}
    for _, b := range buckets { result = append(result, b...) }
    return result
}`,
  ruby: `def bucket_sort(arr)
  n = arr.length
  buckets = Array.new(n) { [] }
  arr.each { |v| buckets[(n * v).to_i] << v }
  buckets.each(&:sort!)
  buckets.flatten
end`,
};

// ---- RADIX SORT ----
const RadixSortCodes = {
  cpp: `void countSortByDigit(int arr[], int n, int exp) {
    vector<int> output(n);
    int count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i]/exp)%10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i-1];
    for (int i = n-1; i >= 0; i--) {
        int d = (arr[i]/exp)%10;
        output[--count[d]] = arr[i];
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}
void radixSort(int arr[], int n) {
    int maxVal = *max_element(arr, arr+n);
    for (int exp = 1; maxVal/exp > 0; exp *= 10)
        countSortByDigit(arr, n, exp);
}`,
  java: `void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    for (int exp = 1; max / exp > 0; exp *= 10)
        countSortByDigit(arr, exp);
}
void countSortByDigit(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    for (int v : arr) count[(v / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int d = (arr[i] / exp) % 10;
        output[--count[d]] = arr[i];
    }
    System.arraycopy(output, 0, arr, 0, n);
}`,
  python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        buckets = [[] for _ in range(10)]
        for v in arr:
            buckets[(v // exp) % 10].append(v)
        arr = [v for b in buckets for v in b]
        exp *= 10
    return arr`,
  go: `func radixSort(arr []int) []int {
    maxVal := arr[0]
    for _, v := range arr {
        if v > maxVal { maxVal = v }
    }
    for exp := 1; maxVal/exp > 0; exp *= 10 {
        buckets := make([][]int, 10)
        for _, v := range arr {
            d := (v / exp) % 10
            buckets[d] = append(buckets[d], v)
        }
        arr = []int{}
        for _, b := range buckets { arr = append(arr, b...) }
    }
    return arr
}`,
  ruby: `def radix_sort(arr)
  max_val = arr.max
  exp = 1
  while max_val / exp > 0
    buckets = Array.new(10) { [] }
    arr.each { |v| buckets[(v / exp) % 10] << v }
    arr = buckets.flatten
    exp *= 10
  end
  arr
end`,
};

// ---- TIM SORT (simplified) ----
const TimSortCodes = {
  cpp: `const int RUN = 32;
void insertionSort(int arr[], int left, int right) {
    for (int i = left+1; i <= right; i++) {
        int key = arr[i], j = i-1;
        while (j >= left && arr[j] > key) { arr[j+1] = arr[j]; j--; }
        arr[j+1] = key;
    }
}
void timSort(int arr[], int n) {
    for (int i = 0; i < n; i += RUN)
        insertionSort(arr, i, min(i+RUN-1, n-1));
    for (int size = RUN; size < n; size *= 2)
        for (int left = 0; left < n; left += 2*size) {
            int mid = min(left+size-1, n-1);
            int right = min(left+2*size-1, n-1);
            if (mid < right) merge(arr, left, mid, right);
        }
}`,
  java: `int RUN = 32;
void timSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i += RUN)
        insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
    for (int size = RUN; size < n; size *= 2)
        for (int left = 0; left < n; left += 2 * size) {
            int mid = Math.min(left + size - 1, n - 1);
            int right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) merge(arr, left, mid, right);
        }
}`,
  python: `MIN_RUN = 32

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def tim_sort(arr):
    n = len(arr)
    for start in range(0, n, MIN_RUN):
        insertion_sort(arr, start, min(start + MIN_RUN - 1, n - 1))
    size = MIN_RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(left + size - 1, n - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2
    return arr`,
  go: `const RUN = 32
func timSort(arr []int) {
    n := len(arr)
    for i := 0; i < n; i += RUN {
        insertionSort(arr, i, min(i+RUN-1, n-1))
    }
    for size := RUN; size < n; size *= 2 {
        for left := 0; left < n; left += 2 * size {
            mid := min(left+size-1, n-1)
            right := min(left+2*size-1, n-1)
            if mid < right { merge(arr, left, mid, right) }
        }
    }
}`,
  ruby: `MIN_RUN = 32

def insertion_sort(arr, left, right)
  ((left + 1)..right).each do |i|
    key = arr[i]
    j = i - 1
    while j >= left && arr[j] > key
      arr[j + 1] = arr[j]
      j -= 1
    end
    arr[j + 1] = key
  end
end

def tim_sort(arr)
  n = arr.length
  (0...n).step(MIN_RUN) { |s| insertion_sort(arr, s, [s + MIN_RUN - 1, n - 1].min) }
  size = MIN_RUN
  while size < n
    (0...n).step(2 * size) do |left|
      mid = [left + size - 1, n - 1].min
      right = [left + 2 * size - 1, n - 1].min
      merge(arr, left, mid, right) if mid < right
    end
    size *= 2
  end
  arr
end`,
};

// ---- INTRO SORT (simplified) ----
const IntroSortCodes = {
  cpp: `void introSortUtil(int arr[], int low, int high, int depthLimit) {
    int size = high - low + 1;
    if (size < 16) { insertionSort(arr, low, high); return; }
    if (depthLimit == 0) { make_heap(arr+low, arr+high+1); sort_heap(arr+low, arr+high+1); return; }
    int pivot = partition(arr, low, high);
    introSortUtil(arr, low, pivot-1, depthLimit-1);
    introSortUtil(arr, pivot+1, high, depthLimit-1);
}
void introSort(int arr[], int n) {
    int depthLimit = 2 * log(n);
    introSortUtil(arr, 0, n-1, depthLimit);
}`,
  java: `void introSort(int[] arr) {
    int depthLimit = (int)(2 * Math.log(arr.length));
    introSortUtil(arr, 0, arr.length - 1, depthLimit);
}
void introSortUtil(int[] arr, int low, int high, int depthLimit) {
    int size = high - low + 1;
    if (size < 16) { insertionSort(arr, low, high); return; }
    if (depthLimit == 0) { heapSortRange(arr, low, high); return; }
    int pivot = partition(arr, low, high);
    introSortUtil(arr, low, pivot - 1, depthLimit - 1);
    introSortUtil(arr, pivot + 1, high, depthLimit - 1);
}`,
  python: `import math

def intro_sort_util(arr, low, high, depth_limit):
    size = high - low + 1
    if size < 16:
        insertion_sort(arr, low, high)
        return
    if depth_limit == 0:
        heap_sort_range(arr, low, high)
        return
    pivot = partition(arr, low, high)
    intro_sort_util(arr, low, pivot - 1, depth_limit - 1)
    intro_sort_util(arr, pivot + 1, high, depth_limit - 1)

def intro_sort(arr):
    depth_limit = int(2 * math.log(len(arr)))
    intro_sort_util(arr, 0, len(arr) - 1, depth_limit)
    return arr`,
  go: `func introSortUtil(arr []int, low, high, depthLimit int) {
    size := high - low + 1
    if size < 16 {
        insertionSort(arr, low, high)
        return
    }
    if depthLimit == 0 {
        heapSortRange(arr, low, high)
        return
    }
    pivot := partition(arr, low, high)
    introSortUtil(arr, low, pivot-1, depthLimit-1)
    introSortUtil(arr, pivot+1, high, depthLimit-1)
}`,
  ruby: `def intro_sort_util(arr, low, high, depth_limit)
  size = high - low + 1
  return insertion_sort(arr, low, high) if size < 16
  return heap_sort_range(arr, low, high) if depth_limit == 0
  pivot = partition(arr, low, high)
  intro_sort_util(arr, low, pivot - 1, depth_limit - 1)
  intro_sort_util(arr, pivot + 1, high, depth_limit - 1)
end

def intro_sort(arr)
  depth_limit = (2 * Math.log(arr.length)).to_i
  intro_sort_util(arr, 0, arr.length - 1, depth_limit)
  arr
end`,
};

// ---- CYCLE SORT ----
const CycleSortCodes = {
  cpp: `void cycleSort(int arr[], int n) {
    for (int start = 0; start < n-1; start++) {
        int item = arr[start], pos = start;
        for (int i = start+1; i < n; i++) if (arr[i] < item) pos++;
        if (pos == start) continue;
        while (item == arr[pos]) pos++;
        swap(item, arr[pos]);
        while (pos != start) {
            pos = start;
            for (int i = start+1; i < n; i++) if (arr[i] < item) pos++;
            while (item == arr[pos]) pos++;
            swap(item, arr[pos]);
        }
    }
}`,
  java: `void cycleSort(int[] arr) {
    int n = arr.length;
    for (int start = 0; start < n - 1; start++) {
        int item = arr[start], pos = start;
        for (int i = start + 1; i < n; i++) if (arr[i] < item) pos++;
        if (pos == start) continue;
        while (item == arr[pos]) pos++;
        int t = item; item = arr[pos]; arr[pos] = t;
        while (pos != start) {
            pos = start;
            for (int i = start + 1; i < n; i++) if (arr[i] < item) pos++;
            while (item == arr[pos]) pos++;
            t = item; item = arr[pos]; arr[pos] = t;
        }
    }
}`,
  python: `def cycle_sort(arr):
    n = len(arr)
    for start in range(n - 1):
        item = arr[start]
        pos = start
        for i in range(start + 1, n):
            if arr[i] < item:
                pos += 1
        if pos == start:
            continue
        while item == arr[pos]:
            pos += 1
        arr[pos], item = item, arr[pos]
        while pos != start:
            pos = start
            for i in range(start + 1, n):
                if arr[i] < item:
                    pos += 1
            while item == arr[pos]:
                pos += 1
            arr[pos], item = item, arr[pos]
    return arr`,
  go: `func cycleSort(arr []int) {
    n := len(arr)
    for start := 0; start < n-1; start++ {
        item := arr[start]
        pos := start
        for i := start + 1; i < n; i++ {
            if arr[i] < item { pos++ }
        }
        if pos == start { continue }
        for item == arr[pos] { pos++ }
        item, arr[pos] = arr[pos], item
        for pos != start {
            pos = start
            for i := start + 1; i < n; i++ {
                if arr[i] < item { pos++ }
            }
            for item == arr[pos] { pos++ }
            item, arr[pos] = arr[pos], item
        }
    }
}`,
  ruby: `def cycle_sort(arr)
  n = arr.length
  (0...n - 1).each do |start|
    item = arr[start]
    pos = start
    ((start + 1)...n).each { |i| pos += 1 if arr[i] < item }
    next if pos == start
    pos += 1 while item == arr[pos]
    arr[pos], item = item, arr[pos]
    while pos != start
      pos = start
      ((start + 1)...n).each { |i| pos += 1 if arr[i] < item }
      pos += 1 while item == arr[pos]
      arr[pos], item = item, arr[pos]
    end
  end
  arr
end`,
};

// ---- PANCAKE SORT ----
const PancakeSortCodes = {
  cpp: `void flip(int arr[], int k) {
    int left = 0;
    while (left < k) swap(arr[left++], arr[k--]);
}
int maxIdx(int arr[], int n) {
    int idx = 0;
    for (int i = 1; i < n; i++) if (arr[i] > arr[idx]) idx = i;
    return idx;
}
void pancakeSort(int arr[], int n) {
    for (int size = n; size > 1; size--) {
        int mi = maxIdx(arr, size);
        if (mi != size - 1) { flip(arr, mi); flip(arr, size - 1); }
    }
}`,
  java: `void pancakeSort(int[] arr) {
    for (int size = arr.length; size > 1; size--) {
        int mi = maxIndex(arr, size);
        if (mi != size - 1) {
            flip(arr, mi);
            flip(arr, size - 1);
        }
    }
}
void flip(int[] arr, int k) {
    int left = 0;
    while (left < k) {
        int t = arr[left]; arr[left] = arr[k]; arr[k] = t;
        left++; k--;
    }
}`,
  python: `def flip(arr, k):
    left = 0
    while left < k:
        arr[left], arr[k] = arr[k], arr[left]
        left += 1
        k -= 1

def pancake_sort(arr):
    n = len(arr)
    for size in range(n, 1, -1):
        mi = arr.index(max(arr[:size]))
        if mi != size - 1:
            flip(arr, mi)
            flip(arr, size - 1)
    return arr`,
  go: `func flip(arr []int, k int) {
    left := 0
    for left < k {
        arr[left], arr[k] = arr[k], arr[left]
        left++
        k--
    }
}
func pancakeSort(arr []int) {
    for size := len(arr); size > 1; size-- {
        mi := 0
        for i := 1; i < size; i++ {
            if arr[i] > arr[mi] { mi = i }
        }
        if mi != size-1 {
            flip(arr, mi)
            flip(arr, size-1)
        }
    }
}`,
  ruby: `def flip(arr, k)
  left = 0
  while left < k
    arr[left], arr[k] = arr[k], arr[left]
    left += 1
    k -= 1
  end
end

def pancake_sort(arr)
  (arr.length).downto(2) do |size|
    mi = arr[0...size].each_with_index.max[1]
    if mi != size - 1
      flip(arr, mi)
      flip(arr, size - 1)
    end
  end
  arr
end`,
};

// ---- BOGO SORT ----
const BogoSortCodes = {
  cpp: `bool isSorted(int arr[], int n) {
    for (int i = 1; i < n; i++) if (arr[i-1] > arr[i]) return false;
    return true;
}
void bogoSort(int arr[], int n) {
    while (!isSorted(arr, n)) random_shuffle(arr, arr + n);
}`,
  java: `void bogoSort(int[] arr) {
    while (!isSorted(arr)) shuffle(arr);
}
boolean isSorted(int[] arr) {
    for (int i = 1; i < arr.length; i++)
        if (arr[i - 1] > arr[i]) return false;
    return true;
}
void shuffle(int[] arr) {
    Random rnd = new Random();
    for (int i = arr.length - 1; i > 0; i--) {
        int j = rnd.nextInt(i + 1);
        int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
}`,
  python: `import random

def is_sorted(arr):
    return all(arr[i] <= arr[i+1] for i in range(len(arr)-1))

def bogo_sort(arr):
    while not is_sorted(arr):
        random.shuffle(arr)
    return arr`,
  go: `func isSorted(arr []int) bool {
    for i := 1; i < len(arr); i++ {
        if arr[i-1] > arr[i] { return false }
    }
    return true
}
func bogoSort(arr []int) {
    for !isSorted(arr) {
        rand.Shuffle(len(arr), func(i, j int) { arr[i], arr[j] = arr[j], arr[i] })
    }
}`,
  ruby: `def sorted?(arr)
  arr.each_cons(2).all? { |a, b| a <= b }
end

def bogo_sort(arr)
  arr.shuffle! until sorted?(arr)
  arr
end`,
};
// ---------------------------------------------- CODE STORAGE ENDS FOR ALL SORTS ----------------------------------------

// ---- ALGORITHM LIST (dropdown works, only bubble-sort is implemented) ----
const ALGO_OPTIONS = [
  { value: "bubble-sort", label: "Bubble Sort", ready: true },
  { value: "selection-sort", label: "Selection Sort", ready: true },
  { value: "insertion-sort", label: "Insertion Sort", ready: true },
  { value: "shell-sort", label: "Shell Sort", ready: true },
  { value: "cocktail-sort", label: "Cocktail Sort", ready: true },
  { value: "comb-sort", label: "Comb Sort", ready: true },
  { value: "merge-sort", label: "Merge Sort", ready: true },
  { value: "quick-sort", label: "Quick Sort", ready: true },
  { value: "heap-sort", label: "Heap Sort", ready: true },
  { value: "counting-sort", label: "Counting Sort", ready: true },
  { value: "bucket-sort", label: "Bucket Sort", ready: true },
  { value: "radix-sort", label: "Radix Sort", ready: true },
  { value: "tim-sort", label: "Tim Sort", ready: true },
  { value: "intro-sort", label: "Intro Sort", ready: true },
  { value: "cycle-sort", label: "Cycle Sort", ready: true },
  { value: "pancake-sort", label: "pancake Sort", ready: true },
  { value: "bogo-sort", label: "Bogo Sort", ready: true },
];

// Algorithm Explainations
const ALGO_DEFINITIONS = {
  "bubble-sort": {
    definition: "A simple comparison-based algorithm that repeatedly steps through the array, compares adjacent elements, and swaps them if they're in the wrong order. Larger elements 'bubble up' to the end with each pass.",
    example: "Like carbonation bubbles rising in a soda — the biggest bubbles (largest values) rise to the top (end of the array) fastest, one pass at a time.",
  },
  "selection-sort": {
    definition: "Divides the array into a sorted and unsorted region. Repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.",
    example: "Like picking the shortest kid in a lineup, one at a time, and placing them at the front — you're always 'selecting' the best candidate from what's left.",
  },
  "insertion-sort": {
    definition: "Builds the sorted array one element at a time by taking each new element and inserting it into its correct position among the already-sorted elements before it.",
    example: "Like sorting playing cards in your hand — you pick up one card at a time and insert it into the correct spot among the cards you're already holding.",
  },
  "shell-sort": {
    definition: "An optimized version of Insertion Sort that compares elements far apart first (using a shrinking 'gap'), gradually reducing the gap until it becomes a regular Insertion Sort.",
    example: "Like organizing a huge bookshelf by first grouping every 5th book, then every 3rd, then finally every book — big jumps first, fine-tuning last.",
  },
  "cocktail-sort": {
    definition: "A variation of Bubble Sort that sorts in both directions on each pass — first left-to-right pushing large values to the end, then right-to-left pushing small values to the start.",
    example: "Like a bartender shaking a cocktail shaker back and forth — sorting sweeps forward, then backward, forward, then backward.",
  },
  "comb-sort": {
    definition: "Improves on Bubble Sort by comparing elements with a gap larger than 1, shrinking the gap each pass (by a factor of ~1.3) until it reaches 1, removing 'turtles' (small values stuck near the end) faster.",
    example: "Like combing through tangled hair — wide comb strokes first to remove big tangles, then a fine comb for the last little snags.",
  },
  "merge-sort": {
    definition: "A divide-and-conquer algorithm that recursively splits the array into halves, sorts each half, then merges the sorted halves back together.",
    example: "Like sorting a deck of cards by splitting it into two piles, having a friend sort each pile separately, then merging the two sorted piles back into one.",
  },
  "quick-sort": {
    definition: "A divide-and-conquer algorithm that picks a 'pivot' element, partitions the array so smaller elements go left and larger go right, then recursively sorts each side.",
    example: "Like organizing people by height around a reference person (the pivot) — shorter people stand left, taller stand right, then repeat within each group.",
  },
  "heap-sort": {
    definition: "Builds a binary heap from the array, then repeatedly extracts the maximum element from the heap and places it at the end of the array.",
    example: "Like repeatedly picking the tallest person from a crowd and sending them to the back of a line, one at a time, until everyone's sorted by height.",
  },
  "counting-sort": {
    definition: "A non-comparison sort that counts the occurrences of each distinct value, then uses those counts to place elements directly into their sorted position.",
    example: "Like sorting exam scores by first counting how many students got each score (0-100), then listing them out in order using those counts.",
  },
  "bucket-sort": {
    definition: "Distributes elements into several 'buckets' based on value range, sorts each bucket individually, then concatenates the buckets back together.",
    example: "Like sorting mail by zip code range into different bins first, then alphabetizing names within each bin separately.",
  },
  "radix-sort": {
    definition: "A non-comparison sort that processes integers digit by digit, from least significant to most significant, using a stable sort (like Counting Sort) at each digit position.",
    example: "Like sorting a stack of ID cards first by the last digit, then the second-to-last, and so on — each pass refines the order further.",
  },
  "tim-sort": {
    definition: "A hybrid sorting algorithm derived from Merge Sort and Insertion Sort, designed to perform well on real-world data by exploiting existing order (runs) in the array.",
    example: "Like a librarian who notices some shelves are already partially organized, sorts small messy sections with quick fixes, then merges everything using a bigger strategy.",
  },
  "intro-sort": {
    definition: "A hybrid algorithm that starts with Quick Sort, switches to Heap Sort if recursion goes too deep (avoiding worst-case slowdowns), and uses Insertion Sort for small subarrays.",
    example: "Like a hiker who starts on the fast trail (Quick Sort), switches to the safe trail (Heap Sort) if things get too steep, and walks carefully (Insertion Sort) near the finish.",
  },
  "cycle-sort": {
    definition: "Minimizes the number of writes to the array by moving each element directly to its final sorted position in cycles, ideal when write operations are expensive.",
    example: "Like a game of musical chairs where each person walks directly to their assigned seat in one move, rather than shuffling around repeatedly.",
  },
  "pancake-sort": {
    definition: "Sorts by repeatedly 'flipping' a prefix of the array (like flipping a stack of pancakes with a spatula) to move the largest unsorted element to its correct position.",
    example: "Like a chef stacking pancakes by size — flipping a stack of pancakes over and over with a spatula until the biggest ones settle at the bottom.",
  },
  "bogo-sort": {
    definition: "A deliberately inefficient 'algorithm' that randomly shuffles the array and checks if it's sorted, repeating until it gets lucky. Used to illustrate why smart algorithms matter.",
    example: "Like throwing a deck of cards in the air, picking them up in whatever order they land, and hoping they happen to be sorted — again, and again, and again until Sorted.",
  },
};

// ---- LIGHTWEIGHT SYNTAX HIGHLIGHTER (VS Code Dark+ style, no external lib) ----
const KEYWORDS = "int|void|func|def|function|let|const|var|return|if|for|while|do|each|class|public|private|include|using|namespace|import|package|end|then|in|swap";
const TOKEN_REGEX = new RegExp(
  `(//.*|#.*)|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')|(\\b\\d+\\b)|(\\b(?:${KEYWORDS})\\b)|([a-zA-Z_]\\w*)(?=\\()`,
  "g"
);

const highlightCode = (code) => {
  const parts = [];
  let lastIndex = 0;
  let match;
  TOKEN_REGEX.lastIndex = 0;
  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    if (match.index > lastIndex) parts.push({ text: code.slice(lastIndex, match.index), type: "plain" });
    let type = "plain";
    if (match[1]) type = "comment";
    else if (match[2]) type = "string";
    else if (match[3]) type = "number";
    else if (match[4]) type = "keyword";
    else if (match[5]) type = "func";
    parts.push({ text: match[0], type });
    lastIndex = TOKEN_REGEX.lastIndex;
  }
  if (lastIndex < code.length) parts.push({ text: code.slice(lastIndex), type: "plain" });
  return parts;
};

// ----------------------------------------------------- STEPS FOR ALL SORTS -----------------------------------------------------------

// Bubble Sort Logic Code
const bubbleSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const sortedIdx = [];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        sortedIdx: [...sortedIdx],
        note: `Comparing ${a[j].value} and ${a[j + 1].value}.`,
      });
      if (a[j].value > a[j + 1].value) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          array: [...a],
          comparing: [j, j + 1],
          sortedIdx: [...sortedIdx],
          note: `${a[j + 1].value} > ${a[j].value} → swapped.`,
        });
      }
    }
    sortedIdx.push(a.length - i - 1);
  }
  sortedIdx.push(0);
  steps.push({
    array: [...a],
    comparing: [],
    sortedIdx: [...new Set(sortedIdx)],
    note: "Array fully sorted!",
  });
  return steps;
};


// Selection Sort Logic Code
const selectionSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const sortedIdx = [];

  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push({
        array: [...a],
        comparing: [minIdx, j],
        sortedIdx: [...sortedIdx],
        note: `Comparing ${a[minIdx].value} and ${a[j].value}.`,
      });
      if (a[j].value < a[minIdx].value) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({
        array: [...a],
        comparing: [i, minIdx],
        sortedIdx: [...sortedIdx],
        note: `Placed ${a[i].value} at position ${i}.`,
      });
    }
    sortedIdx.push(i);
  }
  sortedIdx.push(a.length - 1);
  steps.push({
    array: [...a],
    comparing: [],
    sortedIdx: [...new Set(sortedIdx)],
    note: "Array fully sorted!",
  });
  return steps;
};

// Insertion Sort Logic Code
const insertionSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [0], note: "Initial array. First element is trivially sorted." }];

  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0) {
      steps.push({
        array: [...a],
        comparing: [j - 1, j],
        sortedIdx: Array.from({ length: i }, (_, k) => k),
        note: `Comparing ${a[j - 1].value} and ${a[j].value}.`,
      });

      if (a[j - 1].value > a[j].value) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        steps.push({
          array: [...a],
          comparing: [j - 1, j],
          sortedIdx: Array.from({ length: i }, (_, k) => k),
          note: `${a[j - 1].value > a[j].value} → shifted ${a[j].value} left.`,
        });
        j--;
      } else {
        break;
      }
    }
  }
  steps.push({
    array: [...a],
    comparing: [],
    sortedIdx: a.map((_, i) => i),
    note: "Array fully sorted!",
  });
  return steps;
};

// Shell Sort Logic Write
const shellSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], gap: null, note: "Initial array." }];
  const n = a.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let j = i;
      while (j >= gap) {
        steps.push({
          array: [...a],
          comparing: [j - gap, j],
          sortedIdx: [],
          gap,
          note: `Gap ${gap}: comparing ${a[j - gap].value} and ${a[j].value}.`,
        });

        if (a[j - gap].value > a[j].value) {
          [a[j - gap], a[j]] = [a[j], a[j - gap]];
          steps.push({
            array: [...a],
            comparing: [j - gap, j],
            sortedIdx: [],
            gap,
            note: `Swapped — ${a[j].value} moved back ${gap} step(s).`,
          });
          j -= gap;
        } else {
          break;
        }
      }
    }
  }

  steps.push({
    array: [...a],
    comparing: [],
    sortedIdx: a.map((_, i) => i),
    gap: null,
    note: "Array fully sorted!",
  });
  return steps;
};

// Cocktail Sort Steps  
const cocktailSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  let start = 0, end = a.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    for (let i = start; i < end; i++) {
      steps.push({
        array: [...a], comparing: [i, i + 1], sortedIdx: [], note: `Comparing ${a[i].value} and ${a[i + 1].value}.`,
      });
      if (a[i].value > a[i + 1].value) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
        steps.push({
          array: [...a], comparing: [i, i + 1], sortedIdx: [], note: `Swapped — moving right to left end.`,
        });
      }
    }
    if (!swapped) break;
    end--;

    swapped = false;
    for (let i = end - 1; i >= start; i--) {
      steps.push({
        array: [...a], comparing: [i, i + 1], sortedIdx: [], note: `Comparing ${a[i].value} and ${a[i + 1].value}.`,
      });
      if (a[i].value > a[i + 1].value) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
        steps.push({
          array: [...a], comparing: [i, i + 1], sortedIdx: [], note: `Swapped — moving left to right end.`,
        });
      }
    }
    start++;
  }

  steps.push({
    array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅",
  });
  return steps;
};

// Comb Sort Logic Write
const combSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const n = a.length;
  let gap = n;
  let swapped = true;

  while (gap !== 1 || swapped) {
    gap = Math.floor((gap * 10) / 13);
    if (gap < 1) gap = 1;
    swapped = false;

    for (let i = 0; i + gap < n; i++) {
      steps.push({
        array: [...a], comparing: [i, i + gap], sortedIdx: [], note: `Gap ${gap}: comparing ${a[i].value} and ${a[i + gap].value}.`,
      });
      if (a[i].value > a[i + gap].value) {
        [a[i], a[i + gap]] = [a[i + gap], a[i]];
        swapped = true;
        steps.push({
          array: [...a], comparing: [i, i + gap], sortedIdx: [], note: `Swapped ${a[i].value} and ${a[i + gap].value}.`,
        });
      }
    }
  }

  steps.push({
    array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅",
  });
  return steps;
};

// ---- MERGE SORT ----
const mergeSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];

  const merge = (start, mid, end) => {
    let left = a.slice(start, mid + 1);
    let right = a.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
      steps.push({ array: [...a], comparing: [start + i, mid + 1 + j], sortedIdx: [], note: `Comparing ${left[i].value} and ${right[j].value}.` });
      if (left[i].value <= right[j].value) { a[k] = left[i]; i++; } else { a[k] = right[j]; j++; }
      steps.push({ array: [...a], comparing: [k], sortedIdx: [], note: `Placed ${a[k].value} at position ${k}.` });
      k++;
    }
    while (i < left.length) { a[k] = left[i]; steps.push({ array: [...a], comparing: [k], sortedIdx: [], note: `Placed ${a[k].value} at position ${k}.` }); i++; k++; }
    while (j < right.length) { a[k] = right[j]; steps.push({ array: [...a], comparing: [k], sortedIdx: [], note: `Placed ${a[k].value} at position ${k}.` }); j++; k++; }
  };

  const sort = (start, end) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    sort(start, mid);
    sort(mid + 1, end);
    merge(start, mid, end);
  };

  sort(0, a.length - 1);
  steps.push({ array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- QUICK SORT ----
const quickSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const sortedIdx = [];

  const partition = (low, high) => {
    const pivot = a[high];
    steps.push({ array: [...a], comparing: [high], sortedIdx: [...sortedIdx], note: `Pivot selected: ${pivot.value}.` });
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ array: [...a], comparing: [j, high], sortedIdx: [...sortedIdx], note: `Comparing ${a[j].value} with pivot ${pivot.value}.` });
      if (a[j].value < pivot.value) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ array: [...a], comparing: [i, j], sortedIdx: [...sortedIdx], note: `Swapped ${a[i].value} and ${a[j].value}.` });
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({ array: [...a], comparing: [i + 1, high], sortedIdx: [...sortedIdx], note: `Pivot ${a[i + 1].value} placed at position ${i + 1}.` });
    sortedIdx.push(i + 1);
    return i + 1;
  };

  const sort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    } else if (low === high) {
      sortedIdx.push(low);
    }
  };

  sort(0, a.length - 1);
  steps.push({ array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- HEAP SORT ----
const heapSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const n = a.length;
  const sortedIdx = [];

  const heapify = (size, i) => {
    let largest = i;
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < size) {
      steps.push({ array: [...a], comparing: [largest, l], sortedIdx: [...sortedIdx], note: `Comparing ${a[largest].value} and ${a[l].value}.` });
      if (a[l].value > a[largest].value) largest = l;
    }
    if (r < size) {
      steps.push({ array: [...a], comparing: [largest, r], sortedIdx: [...sortedIdx], note: `Comparing ${a[largest].value} and ${a[r].value}.` });
      if (a[r].value > a[largest].value) largest = r;
    }
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({ array: [...a], comparing: [i, largest], sortedIdx: [...sortedIdx], note: `Swapped ${a[i].value} and ${a[largest].value}.` });
      heapify(size, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);

  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    steps.push({ array: [...a], comparing: [0, i], sortedIdx: [...sortedIdx], note: `Moved max ${a[i].value} to position ${i}.` });
    sortedIdx.push(i);
    heapify(i, 0);
  }
  sortedIdx.push(0);

  steps.push({ array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- COUNTING SORT (approximate visualization — non-comparison sort) ----
const countingSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const max = Math.max(...arr, 0);
  const count = new Array(max + 1).fill(0);
  arr.forEach((v) => count[v]++);
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];
  const output = new Array(a.length);
  for (let i = a.length - 1; i >= 0; i--) {
    const v = a[i].value;
    output[count[v] - 1] = a[i];
    count[v]--;
  }
  for (let k = 0; k < output.length; k++) {
    steps.push({ array: output.slice(0, k + 1).concat(a.slice(k + 1)), comparing: [k], sortedIdx: Array.from({ length: k + 1 }, (_, x) => x), note: `Placing ${output[k].value} at its counted position.` });
  }
  steps.push({ array: output, comparing: [], sortedIdx: output.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- BUCKET SORT (approximate visualization) ----
const bucketSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const n = a.length;
  const max = Math.max(...arr, 1);
  const buckets = Array.from({ length: n }, () => []);
  a.forEach((item) => {
    const idx = Math.min(n - 1, Math.floor((item.value / (max + 1)) * n));
    buckets[idx].push(item);
    steps.push({ array: [...a], comparing: [], sortedIdx: [], note: `Placed ${item.value} into bucket ${idx}.` });
  });
  buckets.forEach((b) => b.sort((x, y) => x.value - y.value));
  const result = buckets.flat();
  steps.push({ array: result, comparing: [], sortedIdx: [], note: "Buckets sorted internally, concatenating." });
  steps.push({ array: result, comparing: [], sortedIdx: result.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- RADIX SORT ----
const radixSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const max = Math.max(...arr, 0);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    const buckets = Array.from({ length: 10 }, () => []);
    a.forEach((item) => { buckets[Math.floor(item.value / exp) % 10].push(item); });
    a = buckets.flat();
    steps.push({ array: [...a], comparing: [], sortedIdx: [], note: `Sorted by digit at place value ${exp}.` });
    exp *= 10;
  }
  steps.push({ array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- TIM SORT (simplified: small insertion-sorted runs, then merged) ----
const timSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const n = a.length;
  const RUN = 4;

  for (let start = 0; start < n; start += RUN) {
    const end = Math.min(start + RUN - 1, n - 1);
    for (let i = start + 1; i <= end; i++) {
      let j = i;
      while (j > start) {
        steps.push({ array: [...a], comparing: [j - 1, j], sortedIdx: [], note: `Run insertion: comparing ${a[j - 1].value} and ${a[j].value}.` });
        if (a[j - 1].value > a[j].value) {
          [a[j - 1], a[j]] = [a[j], a[j - 1]];
          j--;
        } else break;
      }
    }
  }

  const merge = (start, mid, end) => {
    let left = a.slice(start, mid + 1), right = a.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
      steps.push({ array: [...a], comparing: [start + i, mid + 1 + j], sortedIdx: [], note: `Merging: comparing ${left[i].value} and ${right[j].value}.` });
      if (left[i].value <= right[j].value) { a[k] = left[i]; i++; } else { a[k] = right[j]; j++; }
      k++;
    }
    while (i < left.length) { a[k] = left[i]; i++; k++; }
    while (j < right.length) { a[k] = right[j]; j++; k++; }
    steps.push({ array: [...a], comparing: [], sortedIdx: [], note: `Merged run [${start}-${end}].` });
  };

  let size = RUN;
  while (size < n) {
    for (let start = 0; start < n; start += 2 * size) {
      const mid = Math.min(start + size - 1, n - 1);
      const end = Math.min(start + 2 * size - 1, n - 1);
      if (mid < end) merge(start, mid, end);
    }
    size *= 2;
  }

  steps.push({ array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- INTRO SORT (simplified: quicksort + insertion sort for small ranges) ----
const introSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const THRESHOLD = 4;

  const insertionRange = (low, high) => {
    for (let i = low + 1; i <= high; i++) {
      let j = i;
      while (j > low) {
        steps.push({ array: [...a], comparing: [j - 1, j], sortedIdx: [], note: `Small range insertion: comparing ${a[j - 1].value} and ${a[j].value}.` });
        if (a[j - 1].value > a[j].value) { [a[j - 1], a[j]] = [a[j], a[j - 1]]; j--; } else break;
      }
    }
  };

  const partition = (low, high) => {
    const pivot = a[high];
    steps.push({ array: [...a], comparing: [high], sortedIdx: [], note: `Pivot selected: ${pivot.value}.` });
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ array: [...a], comparing: [j, high], sortedIdx: [], note: `Comparing ${a[j].value} with pivot ${pivot.value}.` });
      if (a[j].value < pivot.value) { i++;[a[i], a[j]] = [a[j], a[i]]; steps.push({ array: [...a], comparing: [i, j], sortedIdx: [], note: `Swapped.` }); }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({ array: [...a], comparing: [i + 1, high], sortedIdx: [], note: `Pivot placed at ${i + 1}.` });
    return i + 1;
  };

  const sort = (low, high) => {
    if (high - low < THRESHOLD) { if (low < high) insertionRange(low, high); return; }
    if (low < high) { const pi = partition(low, high); sort(low, pi - 1); sort(pi + 1, high); }
  };

  sort(0, a.length - 1);
  steps.push({ array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- CYCLE SORT ----
const cycleSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const n = a.length;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = a[cycleStart];
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < n; i++) {
      steps.push({ array: [...a], comparing: [cycleStart, i], sortedIdx: [], note: `Comparing ${item.value} and ${a[i].value}.` });
      if (a[i].value < item.value) pos++;
    }
    if (pos === cycleStart) continue;
    while (item.value === a[pos].value) pos++;
    [a[pos], item] = [item, a[pos]];
    steps.push({ array: [...a], comparing: [pos], sortedIdx: [], note: `Placed ${a[pos].value} at position ${pos}.` });

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        steps.push({ array: [...a], comparing: [cycleStart, i], sortedIdx: [], note: `Comparing ${item.value} and ${a[i].value}.` });
        if (a[i].value < item.value) pos++;
      }
      while (item.value === a[pos].value) pos++;
      [a[pos], item] = [item, a[pos]];
      steps.push({ array: [...a], comparing: [pos], sortedIdx: [], note: `Placed ${a[pos].value} at position ${pos}.` });
    }
  }

  steps.push({ array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- PANCAKE SORT ----
const pancakeSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];
  const n = a.length;

  const flip = (k) => {
    let left = 0, right = k;
    while (left < right) { [a[left], a[right]] = [a[right], a[left]]; left++; right--; }
  };

  for (let size = n; size > 1; size--) {
    let maxIdx = 0;
    for (let i = 1; i < size; i++) {
      steps.push({ array: [...a], comparing: [maxIdx, i], sortedIdx: [], note: `Comparing ${a[maxIdx].value} and ${a[i].value} for max.` });
      if (a[i].value > a[maxIdx].value) maxIdx = i;
    }
    if (maxIdx !== size - 1) {
      flip(maxIdx);
      steps.push({ array: [...a], comparing: [0, maxIdx], sortedIdx: [], note: `Flipped first ${maxIdx + 1} elements.` });
      flip(size - 1);
      steps.push({ array: [...a], comparing: [0, size - 1], sortedIdx: [], note: `Flipped first ${size} elements to place max at end.` });
    }
  }

  steps.push({ array: [...a], comparing: [], sortedIdx: a.map((_, i) => i), note: "Array fully sorted! ✅" });
  return steps;
};

// ---- BOGO SORT (capped attempts — exponential time, don't let it hang the browser) ----
const bogoSortSteps = (arr) => {
  let a = arr.map((v, i) => ({ id: i, value: v }));
  const steps = [{ array: [...a], comparing: [], sortedIdx: [], note: "Initial array." }];

  const isSorted = (a) => { for (let i = 1; i < a.length; i++) if (a[i - 1].value > a[i].value) return false; return true; };
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } };

  let attempts = 0;
  const MAX_ATTEMPTS = 200; // safety cap — bogo sort is O((n+1)!), only usable for tiny n
  while (!isSorted(a) && attempts < MAX_ATTEMPTS) {
    shuffle(a);
    attempts++;
    steps.push({ array: [...a], comparing: [], sortedIdx: [], note: `Shuffle attempt #${attempts}.` });
  }

  const sorted = isSorted(a);
  steps.push({ array: [...a], comparing: [], sortedIdx: sorted ? a.map((_, i) => i) : [], note: sorted ? "Array fully sorted (by luck)! ✅" : "Gave up after max attempts — bogo sort is impractical here." });
  return steps;
};
// ----------------------------------------------------- STEPS ENDED FOR ALL SORTS -----------------------------------------------------------


// Configuration
const ALGO_CONFIG = {
  "bubble-sort": { steps: bubbleSortSteps, code: BubbleSortCodes },
  "selection-sort": { steps: selectionSortSteps, code: SelectionSortCodes },
  "insertion-sort": { steps: insertionSortSteps, code: InsertionSortCodes },
  "shell-sort": { steps: shellSortSteps, code: ShellSortCodes },
  "cocktail-sort": { steps: cocktailSortSteps, code: CocktailSortCodes },
  "comb-sort": { steps: combSortSteps, code: CombSortCodes },
  "merge-sort": { steps: mergeSortSteps, code: MergeSortCodes },
  "quick-sort": { steps: quickSortSteps, code: QuickSortCodes },
  "heap-sort": { steps: heapSortSteps, code: HeapSortCodes },
  "counting-sort": { steps: countingSortSteps, code: CountingSortCodes },
  "bucket-sort": { steps: bucketSortSteps, code: BucketSortCodes },
  "radix-sort": { steps: radixSortSteps, code: RadixSortCodes },
  "tim-sort": { steps: timSortSteps, code: TimSortCodes },
  "intro-sort": { steps: introSortSteps, code: IntroSortCodes },
  "cycle-sort": { steps: cycleSortSteps, code: CycleSortCodes },
  "pancake-sort": { steps: pancakeSortSteps, code: PancakeSortCodes },
  "bogo-sort": { steps: bogoSortSteps, code: BogoSortCodes }
};

// Algorithms Time and Space Complexity
const ALGO_COMPLEXITY = {
  "bubble-sort": { time: "O(n²)", space: "O(1)" },
  "selection-sort": { time: "O(n²)", space: "O(1)" },
  "insertion-sort": { time: "O(n²)", space: "O(1)" },
  "shell-sort": { time: "O(n²)", space: "O(1)" },
  "cocktail-sort": { time: "O(n²)", space: "O(1)" },
  "comb-sort": { time: "O(n²)", space: "O(1)" },
  "merge-sort": { time: "O(n log n)", space: "O(n)" },
  "quick-sort": { time: "O(n log n)", space: "O(log n)" },
  "heap-sort": { time: "O(n log n)", space: "O(1)" },
  "counting-sort": { time: "O(n + k)", space: "O(k)" },
  "bucket-sort": { time: "O(n + k)", space: "O(n)" },
  "radix-sort": { time: "O(nk)", space: "O(n + k)" },
  "tim-sort": { time: "O(n log n)", space: "O(n)" },
  "intro-sort": { time: "O(n log n)", space: "O(log n)" },
  "cycle-sort": { time: "O(n²)", space: "O(1)" },
  "pancake-sort": { time: "O(n²)", space: "O(1)" },
  "bogo-sort": { time: "O((n+1)!)", space: "O(1)" },
};

// Main Function
const Sorts = () => {
  const [algo, setAlgo] = useState("bubble-sort");
  const [n, setN] = useState("8");
  const [array, setArray] = useState([]);
  const [allSteps, setAllSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [phase, setPhase] = useState("idle");
  const [speed, setSpeed] = useState(650); // ms per step
  const [panelTab, setPanelTab] = useState("process");
  const [lang, setLang] = useState("go");
  const [copied, setCopied] = useState(false);
  const timeoutsRef = useRef([]);
  const stageRef = useRef(null);
  const [stageHeight, setStageHeight] = useState(260);
  const [stageWidth, setStageWidth] = useState(800);

  OnRefresh(phase === "playing");


  // All Sorting Steps
  const step = allSteps[currentStep] || {
    array: array.map((v, i) => ({ id: i, value: v })),
    comparing: [],
    sortedIdx: [],
    note: "Enter or randomize an array, then press Start.",
  };

  const MIN_BAR_WIDTH = 12;   // smallest a bar should ever get, for legibility
  const GAP = 8;
  const MAX_BAR_WIDTH = 49;
  const MIN_BAR_HEIGHT = 36;   // ← unchanged, leave this alone
  const count = step.array.length || 1;
  const rawBarWidth = Math.floor((stageWidth - GAP * (count - 1)) / count);
  const barWidth = Math.min(Math.max(rawBarWidth, MIN_BAR_WIDTH), MAX_BAR_WIDTH);
  const dynamicMaxN = Math.min(99, Math.max(10, Math.floor(stageWidth / (MIN_BAR_WIDTH + GAP))));

  // Stage Width for Increasing Ns based on screensize. 
  useEffect(() => {
    if (!stageRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setStageHeight(entry.contentRect.height);
        setStageWidth(entry.contentRect.width);
      }
    });
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // measure the bars stage so it always fills available screen space
  useEffect(() => {
    if (!stageRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setStageHeight(entry.contentRect.height);
    });
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const maxVal = Math.max(...array, 1);
  const maxBarHeight = Math.max(stageHeight - 46, MIN_BAR_HEIGHT + 20);
  const scaleHeight = (val) =>
    MIN_BAR_HEIGHT + (val / maxVal) * (maxBarHeight - MIN_BAR_HEIGHT);

  const handleRandom = () => {
    const size = Math.min(Math.max(parseInt(n) || 8, 2), dynamicMaxN);
    setN(String(size));
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 190) + 10);
    setArray(arr);
    setAllSteps([]);
    setCurrentStep(-1);
    setPhase("idle");
  };

  const handleSizeChange = (val) => {
    const size = Math.min(Math.max(parseInt(val) || 0, 0), dynamicMaxN);
    setN(val);
    setArray(Array.from({ length: size }, (_, i) => array[i] || ""));
    setAllSteps([]);
    setCurrentStep(-1);
    setPhase("idle");
  };

  const handleArrayInput = (i, value) => {
    const copy = [...array];
    copy[i] = Number(value) || 0;
    setArray(copy);
  };

  const handleStart = () => {
    if (array.length < 2 || array.some((v) => v === "" || v === undefined)) return;
    clearAllTimeouts();
    const steps = ALGO_CONFIG[algo].steps(array.map(Number));
    setAllSteps(steps);
    setCurrentStep(0);
    setPhase("playing");
    steps.forEach((_, i) => {
      timeoutsRef.current.push(setTimeout(() => setCurrentStep(i), i * speed));
    });
    timeoutsRef.current.push(setTimeout(() => setPhase("done"), steps.length * speed));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ALGO_CONFIG[algo].code[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="sort-root">
      {/* NAVBAR */}
      <div className="sort-navbar">
        <Link to="/" className="sort-back-btn">← Back</Link>
        <select className="sort-select" value={algo} onChange={(e) => setAlgo(e.target.value)}>
          {ALGO_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="complexity-badge">
          ⏱ Time: <strong>{ALGO_COMPLEXITY[algo].time}</strong>
          &nbsp;·&nbsp;
          🛢️ Space: <strong>{ALGO_COMPLEXITY[algo].space}</strong>
        </span>
        {!ALGO_OPTIONS.find(o => o.value === algo)?.ready && (
          <span className="algo-soon-badge">🚧 coming soon — showing Bubble Sort</span>
        )}

        <div className="sort-navbar-right">
          <div className="speed-control">
            <span className="speed-label">Auto Speed — {(speed / 1000).toFixed(1)}s / step</span>
            <input
              type="range"
              min={200}
              max={1500}
              step={50}
              value={1700 - speed}
              onChange={(e) => setSpeed(1700 - Number(e.target.value))}
              disabled={phase === "playing"}
              className="speed-slider"
            />
            <div className="speed-ends">
              <span>Slow</span>
              <span>Medium</span>
              <span>Fast</span>
            </div>
          </div>
          <label className="sort-n-label">
            n
            <input
              type="number"
              min={2}
              max={dynamicMaxN}
              value={n}
              onChange={(e) => handleSizeChange(e.target.value)}
              disabled={phase === "playing"}
              className="sort-n-input"
            />
          </label>
          <button className="sort-random-btn" onClick={handleRandom} disabled={phase === "playing"}>
            🎲 Random
          </button>
        </div>
      </div>

      <div className="sort-layout">
        {/* LEFT: visualization */}
        <div className="sort-viz-panel">
          <div className="bars-stage" ref={stageRef}>
            {step.array.map((item, idx) => (
              <div
                key={item.id}
                className={`bar ${step.comparing?.includes(idx) ? "bar--comparing" : ""} ${step.sortedIdx?.includes(idx) ? "bar--sorted" : ""}`}
                style={{
                  left: idx * (barWidth + GAP),
                  height: scaleHeight(item.value),
                  width: barWidth,
                }}
              >
                <span className="bar-value">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="index-row" style={{ width: step.array.length * (barWidth + GAP) }}>
            {step.array.map((_, idx) => (
              <span key={idx} className="index-label" style={{ width: barWidth, marginRight: GAP }}>
                {idx}
              </span>
            ))}
          </div>

          <div className="array-input-row">
            {array.length === 0 && <span className="array-empty-hint">Set n, then type values or hit Randomb <b>(Set N as per your screen size)</b></span>}
            {step.array.map((item, i) => (
              <input
                key={i}
                type="number"
                value={item.value}
                onChange={(e) => handleArrayInput(i, e.target.value)}
                className="array-box"
                disabled={phase === "playing"}
              />
            ))}
          </div>

          <button
            className="sort-start-btn"
            onClick={handleStart}
            disabled={phase === "playing" || array.length < 2}
          >
            {phase === "playing" ? "Sorting…" : phase === "done" ? "Restart" : "Start"}
          </button>
        </div>

        {/* RIGHT: process / code panel */}
        <div className="sort-side-panel">
          <div className="side-tabs">
            <button
              className={`side-tab-btn ${panelTab === "process" ? "active" : ""}`}
              onClick={() => setPanelTab("process")}
            >
              See Process
            </button>
            <button
              className={`side-tab-btn ${panelTab === "explain" ? "active" : ""}`}
              onClick={() => setPanelTab("explain")}
            >
              Explaination
            </button>
            <button
              className={`side-tab-btn ${panelTab === "code" ? "active" : ""}`}
              onClick={() => setPanelTab("code")}
            >
              See Code
            </button>
          </div>

          {panelTab === "process" ? (
            <div className="process-list">
              {/* unchanged */}
            </div>
          ) : panelTab === "explain" ? (
            <div className="explain-panel">
              <h3 className="explain-title">{ALGO_OPTIONS.find(o => o.value === algo)?.label}</h3>
              <div className="explain-block">
                <span className="explain-label">Definition</span>
                <p>{ALGO_DEFINITIONS[algo]?.definition}</p>
              </div>
              <div className="explain-block">
                <span className="explain-label">Example</span>
                <p>{ALGO_DEFINITIONS[algo]?.example}</p>
              </div>
            </div>
          ) : (
            <div className="code-panel">
              <div className="code-header">
                <select className="lang-select" value={lang} onChange={(e) => setLang(e.target.value)}>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="go">Go</option>
                  <option value="ruby">Ruby</option>
                </select>
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? "✓ Copied" : "⧉ Copy"}
                </button>
              </div>
              <pre className="code-block">
                <code>
                  {highlightCode(ALGO_CONFIG[algo].code[lang]).map((tok, i) => (
                    <span key={i} className={`tok-${tok.type}`}>{tok.text}</span>
                  ))}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sorts;