// src/visualizers/Recursion.jsx
import { Link } from "react-router-dom";
import "../css/base.css";
import OnRefresh from "../pages/OnRefresh";
import { useState, useRef, useEffect, Fragment } from "react";
// --------------------------------- CODE SNIPPETS FOR ALL RECURSION PROBLEMS ----------------------------------------

const FactorialCodes = {
  cpp: `long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
  java: `long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
  python: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
  go: `func factorial(n int) *big.Int {
    if n <= 1 {
        return big.NewInt(1)
    }
    return new(big.Int).Mul(big.NewInt(int64(n)), factorial(n-1))
}`,
  ruby: `def factorial(n)
  return 1 if n <= 1
  n * factorial(n - 1)
end`,
};

const FibonacciCodes = {
  cpp: `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  java: `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
  go: `func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}`,
  ruby: `def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end`,
};

const SumOfArrayCodes = {
  cpp: `int sumArray(int arr[], int n) {
    if (n == 0) return 0;
    return arr[n - 1] + sumArray(arr, n - 1);
}`,
  java: `int sumArray(int[] arr, int n) {
    if (n == 0) return 0;
    return arr[n - 1] + sumArray(arr, n - 1);
}`,
  python: `def sum_array(arr, n):
    if n == 0:
        return 0
    return arr[n - 1] + sum_array(arr, n - 1)`,
  go: `func sumArray(arr []int, n int) int {
    if n == 0 {
        return 0
    }
    return arr[n-1] + sumArray(arr, n-1)
}`,
  ruby: `def sum_array(arr, n)
  return 0 if n == 0
  arr[n - 1] + sum_array(arr, n - 1)
end`,
};

const FastPowerCodes = {
  cpp: `long long power(long long b, int e) {
    if (e == 0) return 1;
    if (e % 2 == 0) {
        long long half = power(b, e / 2);
        return half * half;
    }
    return b * power(b, e - 1);
}`,
  java: `long power(long b, int e) {
    if (e == 0) return 1;
    if (e % 2 == 0) {
        long half = power(b, e / 2);
        return half * half;
    }
    return b * power(b, e - 1);
}`,
  python: `def power(b, e):
    if e == 0:
        return 1
    if e % 2 == 0:
        half = power(b, e // 2)
        return half * half
    return b * power(b, e - 1)`,
  go: `func power(b int64, e int) int64 {
    if e == 0 {
        return 1
    }
    if e%2 == 0 {
        half := power(b, e/2)
        return half * half
    }
    return b * power(b, e-1)
}`,
  ruby: `def power(b, e)
  return 1 if e == 0
  if e.even?
    half = power(b, e / 2)
    return half * half
  end
  b * power(b, e - 1)
end`,
};

const SimplePowerCodes = {
  cpp: `long long power(long long b, int e) {
    if (e == 0) return 1;
    return b * power(b, e - 1);
}`,
  java: `long power(long b, int e) {
    if (e == 0) return 1;
    return b * power(b, e - 1);
}`,
  python: `def power(b, e):
    if e == 0:
        return 1
    return b * power(b, e - 1)`,
  go: `func power(b int64, e int) int64 {
    if e == 0 {
        return 1
    }
    return b * power(b, e-1)
}`,
  ruby: `def power(b, e)
  return 1 if e == 0
  b * power(b, e - 1)
end`,
};

const ReverseStringCodes = {
  cpp: `string reverse(string s) {
    if (s.empty()) return "";
    return reverse(s.substr(1)) + s[0];
}`,
  java: `String reverse(String s) {
    if (s.isEmpty()) return "";
    return reverse(s.substring(1)) + s.charAt(0);
}`,
  python: `def reverse(s):
    if s == "":
        return ""
    return reverse(s[1:]) + s[0]`,
  go: `func reverse(s string) string {
    if s == "" {
        return ""
    }
    return reverse(s[1:]) + string(s[0])
}`,
  ruby: `def reverse(s)
  return "" if s.empty?
  reverse(s[1..]) + s[0]
end`,
};

const BinarySearchCodes = {
  cpp: `int binarySearch(int arr[], int target, int low, int high) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (target < arr[mid])
        return binarySearch(arr, target, low, mid - 1);
    return binarySearch(arr, target, mid + 1, high);
}`,
  java: `int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (target < arr[mid])
        return binarySearch(arr, target, low, mid - 1);
    return binarySearch(arr, target, mid + 1, high);
}`,
  python: `def binary_search(arr, target, low, high):
    if low > high:
        return -1
    mid = low + (high - low) // 2
    if arr[mid] == target:
        return mid
    if target < arr[mid]:
        return binary_search(arr, target, low, mid - 1)
    return binary_search(arr, target, mid + 1, high)`,
  go: `func binarySearch(arr []int, target, low, high int) int {
    if low > high {
        return -1
    }
    mid := low + (high-low)/2
    if arr[mid] == target {
        return mid
    }
    if target < arr[mid] {
        return binarySearch(arr, target, low, mid-1)
    }
    return binarySearch(arr, target, mid+1, high)
}`,
  ruby: `def binary_search(arr, target, low, high)
  return -1 if low > high
  mid = low + (high - low) / 2
  return mid if arr[mid] == target
  if target < arr[mid]
    binary_search(arr, target, low, mid - 1)
  else
    binary_search(arr, target, mid + 1, high)
  end
end`,
};

const TowerOfHanoiCodes = {
  cpp: `void hanoi(int n, char from, char helper, char to) {
    if (n == 1) {
        cout << "Move disk 1 from " << from << " to " << to << endl;
        return;
    }
    hanoi(n - 1, from, to, helper);
    cout << "Move disk " << n << " from " << from << " to " << to << endl;
    hanoi(n - 1, helper, from, to);
}`,
  java: `void hanoi(int n, char from, char helper, char to) {
    if (n == 1) {
        System.out.println("Move disk 1 from " + from + " to " + to);
        return;
    }
    hanoi(n - 1, from, to, helper);
    System.out.println("Move disk " + n + " from " + from + " to " + to);
    hanoi(n - 1, helper, from, to);
}`,
  python: `def hanoi(n, source, helper, destination):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return
    hanoi(n - 1, source, destination, helper)
    print(f"Move disk {n} from {source} to {destination}")
    hanoi(n - 1, helper, source, destination)`,
  go: `func hanoi(n int, from, helper, to string) {
    if n == 1 {
        fmt.Printf("Move disk 1 from %s to %s\\n", from, to)
        return
    }
    hanoi(n-1, from, to, helper)
    fmt.Printf("Move disk %d from %s to %s\\n", n, from, to)
    hanoi(n-1, helper, from, to)
}`,
  ruby: `def hanoi(n, source, helper, destination)
  if n == 1
    puts "Move disk 1 from #{source} to #{destination}"
    return
  end
  hanoi(n - 1, source, destination, helper)
  puts "Move disk #{n} from #{source} to #{destination}"
  hanoi(n - 1, helper, source, destination)
end`,
};

// ---------------------------------------------- CODE STORAGE ENDS FOR ALL RECURSION PROBLEMS ----------------------------------------

// ---- PROBLEM LIST (dropdown works, only Tower of Hanoi is implemented) ----
const RECURSION_OPTIONS = [
  { value: "factorial", label: "Factorial", ready: true },
  { value: "fibonacci", label: "Fibonacci", ready: true },
  { value: "sum-of-array", label: "Sum of Array", ready: true },
  { value: "power", label: "Power (Fast)", ready: true },
  { value: "power-simple", label: "Power (Simple)", ready: true },
  { value: "reverse-string", label: "Reverse a String", ready: true },
  { value: "binary-search", label: "Binary Search (Recursive)", ready: true },
  { value: "tower-of-hanoi", label: "Tower of Hanoi", ready: true },
  { value: "n-queens", label: "N-Queens", ready: false },
];

// ---- LIGHTWEIGHT SYNTAX HIGHLIGHTER (same as Sorts.jsx) ----
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

// ----------------------------------------------------- STEPS FOR ALL RECURSION PROBLEMS -----------------------------------------------------------

// Tower of Hanoi Logic Code — each step is a full rod snapshot (matches Sorts.jsx's "steps" pattern)
const buildInitialRods = (n) => ({
  Source: Array.from({ length: n }, (_, i) => n - i),
  Helper: [],
  Destination: [],
});

const cloneRods = (rods) => ({
  Source: [...rods.Source],
  Helper: [...rods.Helper],
  Destination: [...rods.Destination],
});

// Format huge BigInt values into a readable node label (full value on hover)
const formatBig = (v) => {
  const s = v.toString();
  if (s.length <= 8) return s;
  return `${s.slice(0, 4)}...×10^${s.length - 1}`;
};

// ---------------------------------- RECURSION STEPS/PROCESSING CODES START HERE ----------------------------------- 
const factorialSteps = (n) => {
  n = Math.min(20, Math.max(1, n)); // strict cap of 5

  const factorials = [1]; // factorials[k] = k!
  for (let k = 1; k <= n; k++) factorials[k] = k * factorials[k - 1];

  const exprStr = (k) => (k === 1 ? "1 = 1" : `${k} * ${k - 1}! = ${factorials[k]}`);
  const expandedStr = (k) => {
    const parts = [];
    for (let i = k; i >= 1; i--) parts.push(i);
    return `${k} = ${parts.join(" * ")}`;
  };

  const rowsAll = [];
  for (let k = 1; k <= n; k++) {
    rowsAll.push({ sr: k, expr: exprStr(k), expanded: expandedStr(k) });
  }

  const steps = [];
  for (let k = 1; k <= n; k++) {
    steps.push({ rows: rowsAll.slice(0, k), note: `Computed f(${k}) = ${factorials[k]}.` });
  }
  return steps;
};

const fibonacciSteps = (n) => {
  n = Math.min(20, Math.max(0, n));
  const fib = [0, 1];
  for (let k = 2; k <= n; k++) fib[k] = fib[k - 1] + fib[k - 2];

  const exprStr = (k) => {
    if (k === 0) return "0 (base case)";
    if (k === 1) return "1 (base case)";
    return `f(${k - 1}) + f(${k - 2}) = ${fib[k]}`;
  };
  const expandedStr = (k) => `f(${k}) = ${fib.slice(0, k + 1).join(", ")}`;

  const rowsAll = [];
  for (let k = 0; k <= n; k++) {
    rowsAll.push({ sr: k, expr: exprStr(k), expanded: expandedStr(k) });
  }

  const steps = [];
  for (let k = 0; k <= n; k++) {
    steps.push({ rows: rowsAll.slice(0, k + 1), note: `Computed f(${k}) = ${fib[k]}.` });
  }
  return steps;
};

const sumOfArraySteps = (n) => {
  n = Math.min(10, Math.max(2, n));
  const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 15) + 1);

  const sums = [0];
  for (let k = 1; k <= n; k++) sums[k] = sums[k - 1] + arr[k - 1];

  const exprStr = (k) => (k === 0 ? "0 (base case)" : `arr[${k - 1}] + sum(${k - 1}) = ${sums[k]}`);
  const expandedStr = (k) => (k === 0 ? "0" : arr.slice(0, k).join(" + "));

  const rowsAll = [];
  for (let k = 0; k <= n; k++) {
    rowsAll.push({ sr: k, expr: exprStr(k), expanded: expandedStr(k) });
  }

  const steps = [];
  for (let k = 0; k <= n; k++) {
    steps.push({
      rows: rowsAll.slice(0, k + 1),
      array: arr,
      highlightIndex: k === 0 ? -1 : k - 1,
      note: k === 0 ? "Base case: sum(0) = 0." : `Added arr[${k - 1}] = ${arr[k - 1]} → sum(${k}) = ${sums[k]}.`,
    });
  }
  return steps;
};

const fastPowerSteps = (e) => {
  e = Math.min(20, Math.max(0, e));
  const base = 2;

  // The exponents the recursion actually visits going down, e.g. 10 → 5 → 4 → 2 → 1 → 0
  const chain = [];
  let cur = e;
  while (true) {
    chain.push(cur);
    if (cur === 0) break;
    cur = cur % 2 === 0 ? cur / 2 : cur - 1;
  }

  const values = {};
  const rowsAll = [];
  const steps = [];

  // Rows appear bottom-up (base case first), same as Factorial's ledger
  [...chain].reverse().forEach((k, idx) => {
    let expr, expanded, note;
    if (k === 0) {
      values[0] = 1;
      expr = "1 (base case)";
      expanded = "1";
      note = `Call chain: ${chain.map((x) => `${base}^${x}`).join(" → ")}. Calls made: ${chain.length} (simple version: ${e + 1}). Base case: ${base}^0 = 1.`;
    } else if (k % 2 === 0) {
      const half = values[k / 2];
      values[k] = half * half;
      expr = `(${base}^${k / 2})²`;
      expanded = `${half} × ${half} = ${values[k]}`;
      note = `${base}^${k} is even: (${base}^${k / 2})² = ${half} × ${half} = ${values[k]}.`;
    } else {
      const prev = values[k - 1];
      values[k] = base * prev;
      expr = `${base} × ${base}^${k - 1}`;
      expanded = `${base} × ${prev} = ${values[k]}`;
      note = `${base}^${k} is odd: ${base} × ${base}^${k - 1} = ${base} × ${prev} = ${values[k]}.`;
    }
    rowsAll.push({ sr: idx, label: `${base}^${k}`, expr, expanded });
    steps.push({ rows: [...rowsAll], note });
  });

  return steps;
};

const simplePowerSteps = (e) => {
  e = Math.min(20, Math.max(0, e));
  const base = 2;
  const rowsAll = [];
  const steps = [];
  let prev = 1;

  for (let k = 0; k <= e; k++) {
    let expr, expanded, note, val;
    if (k === 0) {
      val = 1;
      expr = "1 (base case)";
      expanded = "1";
      note = `Base case: ${base}^0 = 1. This version makes ${e + 1} calls, one per exponent.`;
    } else {
      val = base * prev;
      expr = `${base} × ${base}^${k - 1}`;
      expanded = `${base} × ${prev} = ${val}`;
      note = `${base}^${k} = ${base} × ${base}^${k - 1} = ${base} × ${prev} = ${val}.`;
    }
    prev = val;
    rowsAll.push({ sr: k, label: `${base}^${k}`, expr, expanded });
    steps.push({ rows: [...rowsAll], note });
  }
  return steps;
};

const reverseStringSteps = (input) => {
  const word = String(input).toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8);
  const n = word.length;
  const chars = word.split("");
  const rev = (s) => s.split("").reverse().join("");

  const rowsAll = [];
  const steps = [];

  for (let k = 0; k <= n; k++) {
    const suffix = word.slice(n - k);        // the part this call receives
    const held = k === 0 ? "" : word[n - k]; // the character this call holds
    const rest = word.slice(n - k + 1);      // what it hands to the next call
    const result = rev(suffix);

    rowsAll.push({
      sr: k,
      label: `rev("${suffix}")`,
      expr: k === 0 ? `"" (base case)` : `rev("${rest}") + "${held}"`,
      expanded: k === 0 ? `""` : `"${rev(rest)}" + "${held}" = "${result}"`,
    });

    steps.push({
      rows: [...rowsAll],
      arrays: [
        {
          label: "og",
          values: chars,
          active: k === 0 ? -1 : n - k,
          done: Array.from({ length: Math.max(0, k - 1) }, (_, j) => n - k + 1 + j),
        },
        {
          label: "revArr",
          values: chars.map((_, i) => (i < k ? chars[n - 1 - i] : null)),
          active: k === 0 ? -1 : k - 1,
          done: Array.from({ length: Math.max(0, k - 1) }, (_, i) => i),
        },
      ],
      note:
        k === 0
          ? `Base case: rev("") = "". The chain was ${n + 1} calls deep, and nothing has been moved to revArr yet.`
          : `rev("${suffix}") holds "${held}" (og[${n - k}]) and attaches it after rev("${rest}") = "${rev(rest)}" → "${result}". "${held}" lands in revArr[${k - 1}].`,
    });
  }
  return steps;
};

// Random sorted array + target (75% chance the target exists in the array)
const makeRandomSearchInput = (size) => {
  const set = new Set();
  while (set.size < size) set.add(Math.floor(Math.random() * 90) + 5);
  const sorted = [...set].sort((a, b) => a - b);
  let t;
  if (Math.random() < 0.75) {
    t = sorted[Math.floor(Math.random() * size)];
  } else {
    do { t = Math.floor(Math.random() * 90) + 5; } while (set.has(t));
  }
  return { arr: sorted.map(String), target: String(t) };
};

const binarySearchSteps = (n, extra) => {
  let arr, target;
  if (extra && Array.isArray(extra.array)) {
    arr = [...extra.array].sort((a, b) => a - b);
    target = extra.target;
  } else {
    const r = makeRandomSearchInput(n);
    arr = r.arr.map(Number);
    target = Number(r.target);
  }

  const rows = [];
  const steps = [];

  const search = (low, high, depth) => {
    if (low > high) {
      rows.push({ sr: depth, label: `bs(${low}, ${high})`, expr: "low > high → empty range", expanded: "return -1 (not found)" });
      steps.push({
        rows: [...rows],
        bs: { low, high, mid: -1, status: "notfound" },
        note: `Range is empty (low = ${low} > high = ${high}), so ${target} is not in the array.`,
      });
      return;
    }

    const mid = Math.floor((low + high) / 2);
    const midVal = arr[mid];
    const label = `bs(${low}, ${high})`;
    const expr = `mid = ${mid}, arr[${mid}] = ${midVal}`;

    if (midVal === target) {
      rows.push({ sr: depth, label, expr, expanded: `${target} = ${midVal} → found at index ${mid}` });
      steps.push({
        rows: [...rows],
        bs: { low, high, mid, status: "found" },
        note: `Call ${depth + 1}: mid = ${mid}, arr[${mid}] = ${midVal} equals the target ${target}. Found at index ${mid}.`,
      });
      return;
    }

    const goLeft = target < midVal;
    rows.push({ sr: depth, label, expr, expanded: goLeft ? `${target} < ${midVal} → go left` : `${target} > ${midVal} → go right` });
    steps.push({
      rows: [...rows],
      bs: { low, high, mid, status: "searching" },
      note: `Call ${depth + 1}: mid = ${mid}, arr[${mid}] = ${midVal}. ${target} ${goLeft ? "<" : ">"} ${midVal}, so search the ${goLeft ? `left half [${low}..${mid - 1}]` : `right half [${mid + 1}..${high}]`}.`,
    });

    if (goLeft) search(low, mid - 1, depth + 1);
    else search(mid + 1, high, depth + 1);
  };

  search(0, arr.length - 1, 0);
  return steps;
};

const towerOfHanoiSteps = (n) => {
  const rods = buildInitialRods(n);
  const steps = [{ rods: cloneRods(rods), move: null, note: "Initial setup — all disks on Source." }];

  const solve = (count, source, helper, destination) => {
    if (count === 1) {
      const disk = rods[source].pop();
      rods[destination].push(disk);
      steps.push({ rods: cloneRods(rods), move: { disk, from: source, to: destination }, note: `Move disk ${disk} from ${source} to ${destination}.` });
      return;
    }
    solve(count - 1, source, destination, helper);
    const disk = rods[source].pop();
    rods[destination].push(disk);
    steps.push({ rods: cloneRods(rods), move: { disk, from: source, to: destination }, note: `Move disk ${disk} from ${source} to ${destination}.` });
    solve(count - 1, helper, source, destination);
  };

  solve(n, "Source", "Helper", "Destination");
  return steps;
};

// ---- VISUALIZER COMPONENTS (one per problem — renders whatever that problem's step shape needs) ----
const DISK_COLORS = ["#2563EB", "#7C3AED", "#0891B2", "#059669", "#D97706", "#DC2626", "#DB2777"];
const ROD_NAMES = ["Source", "Helper", "Destination"];

const FactorialVisualizer = ({ step, n, allStepsLength, currentStep, phase, onStart, formula, maxN }) => {
  const isText = typeof n === "string";
  const rows = step.rows || [];
  return (
    <div className="fact-root">
      <div className="fact-infobar">
        <span className="fact-info-item">{isText ? `Max length = ${maxN}` : `Max(n) <= ${maxN}`}</span>
        <span className="fact-info-sep">•</span>
        <span className="fact-info-item">Step {Math.max(currentStep + 1, 0)} / {allStepsLength || (isText ? n.length + 1 : n)}</span>
        <span className="fact-info-sep">•</span>
        <span className="fact-info-item">{isText ? "word" : "n"} = {n}</span>
        <span className="fact-info-sep">•</span>
        <span className="fact-info-item">Formula = {formula}</span>
        <span className="fact-info-sep">•</span>
        <span className="fact-info-item-2">Decrease the Page Zoom when Steps are not fitting</span>
        <button className="fact-start-btn" onClick={onStart} disabled={phase === "playing" || n === ""}>
          {phase === "playing" ? "Running…" : phase === "done" ? "Restart" : "Start"}
        </button>
      </div>
      {step.arrays && (
        <div className="fact-arrays-wrap">
          {step.arrays.map((arr, idx) => (
            <Fragment key={arr.label}>
              {idx > 0 && <span className="fact-array-arrow">→</span>}
              <div className="fact-array-group">
                <span className="fact-array-label">{arr.label}</span>
                <div className="fact-array-row">
                  {arr.values.map((val, i) => (
                    <div
                      key={i}
                      className={`fact-array-box ${val === null ? "fact-array-box--empty" : ""} ${i === arr.active ? "fact-array-box--active" : ""} ${arr.done.includes(i) ? "fact-array-box--done" : ""}`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}
      <div className="fact-window">
        {rows.length === 0 && <p className="fact-empty">Press Start to compute step by step.</p>}
        {rows.map((r) => (
          <div key={r.sr} className="fact-row">
            <span className="fact-sr">{r.sr}</span>
            <span className="fact-label">{r.label ?? `f(${r.sr})`}</span>
            <span className="fact-eq">=</span>
            <span className="fact-expr">{r.expr}</span>
            <span className="fact-eq">=</span>
            <span className="fact-expanded">{r.expanded}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BinarySearchVisualizer = ({ step, n, allStepsLength, currentStep, phase, onStart, onReset, formula, maxN }) => {
  const [arr, setArr] = useState([]);
  const [target, setTarget] = useState("");
  const [pulse, setPulse] = useState(false);
  const [error, setError] = useState("");
  const pulseTimer = useRef(null);

  const playing = phase === "playing";
  const hasSteps = allStepsLength > 0;
  const b = hasSteps ? step.bs || null : null;
  const rows = step.rows || [];

  // New random array whenever n changes (also runs once on mount)
  useEffect(() => {
    const r = makeRandomSearchInput(n);
    setArr(r.arr);
    setTarget(r.target);
    setError("");
  }, [n]);

  const handleRandom = () => {
    if (hasSteps) onReset();
    const r = makeRandomSearchInput(n);
    setArr(r.arr);
    setTarget(r.target);
    setError("");
    setPulse(true);                       // draws the eye to the new target
    clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulse(false), 2700);
  };

  const editArr = (i, v) => {
    if (hasSteps) onReset();
    setArr((prev) => prev.map((x, j) => (j === i ? v : x)));
    setError("");
  };

  const editTarget = (v) => {
    if (hasSteps) onReset();
    setTarget(v);
    setError("");
  };

  const handleStartClick = () => {
    const nums = arr.map((v) => (v === "" ? NaN : Number(v)));
    const t = target === "" ? NaN : Number(target);
    if (nums.some(Number.isNaN) || Number.isNaN(t)) {
      setError("Fill every box and the target first.");
      return;
    }
    const sorted = [...nums].sort((a, c) => a - c);
    setArr(sorted.map(String));
    onStart({ array: sorted, target: t });
  };

  const boxClass = (i) => {
    if (!b) return "bs-box";
    if (b.status === "found" && i === b.mid) return "bs-box bs-box--found";
    if (b.status === "searching" && i === b.mid) return "bs-box bs-box--mid";
    if (i < b.low || i > b.high) return "bs-box bs-box--out";
    return "bs-box";
  };

  const tagText = (i) => {
    if (!b || b.status === "notfound") return "";
    const t = [];
    if (i === b.low) t.push("low");
    if (i === b.mid) t.push("mid");
    if (i === b.high) t.push("high");
    return t.join("/");
  };

  return (
    <div className="fact-root">
      <div className="fact-infobar">
        <span className="fact-info-item">Max(n) &lt;= {maxN}</span>
        <span className="fact-info-sep">•</span>
        <span className="fact-info-item">Step {Math.max(currentStep + 1, 0)} / {allStepsLength || "—"}</span>
        <span className="fact-info-sep">•</span>
        <span className="fact-info-item">n = {n}</span>
        <span className="fact-info-sep">•</span>
        <span className="fact-info-item">Formula = {formula}</span>
        <div className="bs-actions">
          <button className="bs-random-btn" onClick={handleRandom} disabled={playing}>🎲 Random</button>
          <button className="fact-start-btn" onClick={handleStartClick} disabled={playing}>
            {playing ? "Running…" : phase === "done" ? "Restart" : "Start"}
          </button>
        </div>
      </div>

      <div className="bs-target-row">
        <span className="bs-target-label">Target</span>
        <input
          type="number"
          value={target}
          onChange={(e) => editTarget(e.target.value)}
          disabled={playing}
          className={`bs-target-input ${pulse ? "bs-target-input--pulse" : ""}`}
        />
        <span className="bs-hint">bs = Binary Search, The array is sorted automatically when you press Start.</span>
        {error && <span className="bs-error">{error}</span>}
      </div>

      <div className="bs-array-row">
        {arr.map((val, i) => (
          <div key={i} className="bs-cell">
            <input
              type="number"
              value={val}
              onChange={(e) => editArr(i, e.target.value)}
              disabled={playing}
              className={boxClass(i)}
            />
            <span className="bs-idx">{i}</span>
            <span className="bs-tag">{tagText(i)}</span>
          </div>
        ))}
      </div>

      {b && b.status === "found" && (
        <div className="bs-result bs-result--found">Found {target} at index {b.mid}</div>
      )}
      {b && b.status === "notfound" && (
        <div className="bs-result bs-result--notfound">{target} is not in the array</div>
      )}

      <div className="fact-window">
        {rows.length === 0 && <p className="fact-empty">Press Start to search step by step.</p>}
        {rows.map((r) => (
          <div key={r.sr} className="fact-row">
            <span className="fact-sr">{r.sr}</span>
            <span className="fact-label">{r.label}</span>
            <span className="fact-eq">=</span>
            <span className="fact-expr">{r.expr}</span>
            <span className="fact-eq">=</span>
            <span className="fact-expanded">{r.expanded}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TowerOfHanoiVisualizer = ({ step, totalDisks }) => {
  const getDiskWidth = (diskNum) => {
    if (totalDisks <= 1) return 150;
    return 36 + ((diskNum - 1) / (totalDisks - 1)) * 114;
  };
  return (
    <div className="toh-viz">
      {ROD_NAMES.map((rodName) => (
        <div className="rod-col" key={rodName}>
          <div className="rod-disks">
            {step.rods[rodName].map((diskNum, i) => (
              <div
                key={i}
                className={`disk ${step.move && step.move.disk === diskNum && step.move.to === rodName ? "disk--landing" : ""}`}
                style={{ width: getDiskWidth(diskNum), background: DISK_COLORS[(diskNum - 1) % DISK_COLORS.length] }}
              >
                {diskNum}
              </div>
            ))}
          </div>
          <div className="rod-pole" />
          <div className="rod-base" />
          <div className="rod-name">{rodName}</div>
        </div>
      ))}
    </div>
  );
};

// ----------------------------------------------------- STEPS ENDED FOR ALL RECURSION PROBLEMS -----------------------------------------------------------

// Configuration — mirrors ALGO_CONFIG in Sorts.jsx, plus a "param" (the one input control per problem) and "Visualizer"
const RECURSION_CONFIG = {
  "factorial": {
    steps: factorialSteps,
    code: FactorialCodes,
    Visualizer: FactorialVisualizer,
    param: { key: "n", label: "n", min: 1, max: 20, default: 5 },
    ownControls: true, // tells the page: this problem draws its own info bar + Start button
    formula: "n! = n × (n-1)!",

  },
  "fibonacci": {
    steps: fibonacciSteps,
    code: FibonacciCodes,
    Visualizer: FactorialVisualizer, // same ledger UI, reused as-is
    param: { key: "n", label: "n", min: 0, max: 20, default: 10 },
    ownControls: true,
    formula: "f(n) = f(n-1) + f(n-2)",

  },
  "sum-of-array": {
    steps: sumOfArraySteps,
    code: SumOfArrayCodes,
    Visualizer: FactorialVisualizer,
    param: { key: "n", label: "Array Size (n)", min: 2, max: 10, default: 6 },
    ownControls: true,
    formula: "sum(n) = arr[n-1] + sum(n-1)",
  },
  "power": {
    steps: fastPowerSteps,
    code: FastPowerCodes,
    Visualizer: FactorialVisualizer,
    param: { key: "n", label: "Exponent (n)", min: 0, max: 20, default: 10 },
    ownControls: true,
    formula: "2ⁿ = (2^(n/2))² if even, 2 × 2^(n-1) if odd",
  },
  "power-simple": {
    steps: simplePowerSteps,
    code: SimplePowerCodes,
    Visualizer: FactorialVisualizer,
    param: { key: "n", label: "Exponent (n)", min: 0, max: 20, default: 10 },
    ownControls: true,
    formula: "2ⁿ = 2 × 2^(n-1)",
  },
  "reverse-string": {
    steps: reverseStringSteps,
    code: ReverseStringCodes,
    Visualizer: FactorialVisualizer,
    param: { key: "word", label: "Word (max 8)", type: "text", maxLength: 8, default: "CODE" },
    ownControls: true,
    formula: "rev(s) = rev(s[1:]) + s[0]",
  },
  "binary-search": {
    steps: binarySearchSteps,
    code: BinarySearchCodes,
    Visualizer: BinarySearchVisualizer,
    param: { key: "n", label: "Array Size (n)", min: 2, max: 10, default: 8 },
    ownControls: true,
    formula: "mid = ⌊(low + high) / 2⌋",
  },
  "tower-of-hanoi": {
    steps: towerOfHanoiSteps,
    code: TowerOfHanoiCodes,
    Visualizer: TowerOfHanoiVisualizer,
    param: { key: "disks", label: "Disks", min: 1, max: 12, default: 3 },
    formula: "Will be Added Soon...",
  },
};

// Time and Space Complexity
const RECURSION_COMPLEXITY = {
  "factorial": { time: "O(n)", space: "O(n)" },
  "fibonacci": { time: "O(2ⁿ)", space: "O(n)" },
  "sum-of-array": { time: "O(n)", space: "O(n)" },
  "power": { time: "O(log n)", space: "O(log n)" },
  "power-simple": { time: "O(n)", space: "O(n)" },
  "reverse-string": { time: "O(n)", space: "O(n)" },
  "binary-search": { time: "O(log n)", space: "O(log n)" },
  "tower-of-hanoi": { time: "O(2ⁿ)", space: "O(n)" },
  "n-queens": { time: "O(n!)", space: "O(n)" },
};

// Definitions + Examples
const RECURSION_DEFINITIONS = {
  "factorial": {
    definition: "Computes the product of all positive integers up to n, by defining n! in terms of a smaller version of itself: n! = n × (n-1)!.",
    example: "Like a line of people passing a multiplying baton backward — each person multiplies their number by whatever the person behind them eventually hands back.",
  },
  "fibonacci": {
    definition: "A sequence where each number is the sum of the two numbers before it, starting from 0 and 1: 0, 1, 1, 2, 3, 5, 8, 13...",
    example: "Like a family tree of numbers — every new number is born from its two immediate parents, carrying forward the pattern endlessly.",
    facts: [
      "As n grows, the ratio between consecutive Fibonacci numbers converges to the Golden Ratio (φ ≈ 1.618) — a proportion artists and architects have prized for millennia.",
      "The spiral pattern of a nautilus shell closely approximates a Fibonacci/golden spiral, growing outward in the same proportional curve.",
      "Sunflower seed heads and pinecones arrange themselves in spirals whose counts are almost always consecutive Fibonacci numbers (e.g. 34 and 55 spirals).",
      "The number of petals on many flowers — lilies (3), buttercups (5), delphiniums (8), daisies (34 or 55) — tends to match a Fibonacci number.",
      "Human faces and bodies are often cited as having proportions close to the Golden Ratio, from the width-to-height ratio of the face to finger bone lengths.",
      "Spiral galaxies, including the Milky Way, exhibit arm patterns that approximate the same logarithmic spiral shape found in Fibonacci growth.",
      "The Parthenon in Athens and many Renaissance paintings were deliberately proportioned using the Golden Ratio derived from this sequence.",
    ],
  },
  "sum-of-array": {
    definition: "Adds up all elements in an array by recursively summing everything except the first element, then adding the first element to that result.",
    example: "Like passing a receipt down a line of people — each person adds their item's price to the running total handed to them, until it reaches the front.",
  },
  "power": {
    definition: "Computes base^n by halving the exponent each call: when n is even, it solves base^(n/2) once and squares the result; when n is odd, it peels off one multiplication first. This is also called exponentiation by squaring.",
    example: "Like folding a sheet of paper in half over and over instead of tearing off one strip at a time. Each fold removes half the remaining work.",
    facts: [
      "2^20 takes 21 calls with the simple method but only 7 with fast power. The gap grows with n: 2^1000 needs under 20 calls instead of 1,000.",
      "The catch: you must call power(b, n/2) once, store it, then square it. Writing power(b, n/2) * power(b, n/2) makes two calls per level and brings you back to O(n).",
      "RSA encryption depends on this idea. It raises numbers hundreds of digits long to huge powers using repeated squaring (with modular arithmetic), which would be impossible one multiplication at a time.",
      "The technique is very old. A version of it is traced back to Pingala's ancient Indian text on poetic meters, around 200 BCE.",
    ],
  },
  "power-simple": {
    definition: "Computes base^n the direct way: base^n = base × base^(n-1), until the exponent reaches 0, where the answer is 1.",
    example: "Like climbing a staircase one step at a time. It's easy to follow, but a staircase with 1,000 steps takes 1,000 moves.",
  },
  "reverse-string": {
    definition: "Reverses a string by recursively reversing everything after the first character, then placing the first character at the very end.",
    example: "Like unstacking a pile of plates one at a time and restacking them in a new pile — the last plate you pick up ends up on top, flipping the entire order.",
  },
  "binary-search": {
    definition: "Searches a sorted array by checking the middle element and then searching only the left or right half, discarding half the remaining data on each call. If the range becomes empty, the target isn't there.",
    example: "Like looking up a word in a dictionary. You open it near the middle, decide which half your word is in, and repeat, never reading every page.",
    facts: [
      "It only works on sorted data. That is why the visualizer sorts your array when you press Start.",
      "1,000 items need at most 10 checks. 1,000,000 items need at most 20. Each doubling of the data adds just one more step.",
      "Compute the middle as low + (high - low) / 2 instead of (low + high) / 2. Both give the same answer, but the second can overflow an int when the numbers are huge. This famous bug sat in widely used library code for years.",
    ],
  },
  "tower-of-hanoi": {
    definition: "A classic recursive puzzle: move a stack of disks from a source rod to a destination rod, using a helper rod, moving one disk at a time and never placing a larger disk on a smaller one.",
    example: "Like moving a stack of nested bowls from one table to another, one bowl at a time, using a spare table as temporary storage — always keeping bigger bowls beneath smaller ones.",
  },
  "n-queens": {
    definition: "Places n chess queens on an n×n board so none attack each other, by recursively placing one queen per row and backtracking whenever a placement leads to a conflict.",
    example: "Like seating guests at a round table one at a time, checking for conflicts after each seat is filled, and undoing the last seating whenever a clash is found — trying the next option instead.",
  },
};

// Main Function
const Recursion = () => {
  const [algo, setAlgo] = useState("factorial");
  const [paramValue, setParamValue] = useState(RECURSION_CONFIG["factorial"].param.default);
  const [allSteps, setAllSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [phase, setPhase] = useState("idle");
  const [speed, setSpeed] = useState(800);
  const [panelTab, setPanelTab] = useState("process");
  const [lang, setLang] = useState("go");
  const [copied, setCopied] = useState(false);
  const timeoutsRef = useRef([]);

  OnRefresh(phase === "playing");

  const activeConfig = RECURSION_CONFIG[algo];
  const step = allSteps[currentStep] || {
    rods: buildInitialRods(paramValue),
    move: null,
    note: "Set a value and press Start.",
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const handleReset = () => {
    clearAllTimeouts();
    setAllSteps([]);
    setCurrentStep(-1);
    setPhase("idle");
  };

  const handleAlgoChange = (value) => {
    setAlgo(value);
    const cfg = RECURSION_CONFIG[value] || RECURSION_CONFIG["tower-of-hanoi"];
    setParamValue(cfg.param.default);
    setAllSteps([]);
    setCurrentStep(-1);
    setPhase("idle");
  };

  const handleParamChange = (val) => {
    if (activeConfig.param.type === "text") {
      // letters only, uppercase, hard cap at maxLength
      const clean = val.toUpperCase().replace(/[^A-Z]/g, "").slice(0, activeConfig.param.maxLength);
      setParamValue(clean);
    } else {
      const clamped = Math.min(Math.max(parseInt(val) || 0, activeConfig.param.min), activeConfig.param.max);
      setParamValue(clamped);
    }
    setAllSteps([]);
    setCurrentStep(-1);
    setPhase("idle");
  };

  const handleStart = (extra) => {
    if (paramValue === "") return;
    clearAllTimeouts();
    const steps = activeConfig.steps(paramValue, extra);
    setAllSteps(steps);
    setCurrentStep(0);
    setPhase("playing");
    steps.forEach((_, i) => {
      timeoutsRef.current.push(setTimeout(() => setCurrentStep(i), i * speed));
    });
    timeoutsRef.current.push(setTimeout(() => setPhase("done"), steps.length * speed));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeConfig.code[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const Visualizer = activeConfig.Visualizer;

  return (
    <div className="sort-root">
      {/* NAVBAR — identical structure/classes to Sorts.jsx */}
      <div className="sort-navbar">
        <Link to="/" className="sort-back-btn">← Back</Link>
        <select className="sort-select" value={algo} onChange={(e) => handleAlgoChange(e.target.value)}>
          {RECURSION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="complexity-badge">
          ⏱ Time: <strong>{RECURSION_COMPLEXITY[algo]?.time ?? "—"}</strong>
          &nbsp;·&nbsp;
          🛢️ Space: <strong>{RECURSION_COMPLEXITY[algo]?.space ?? "—"}</strong>
        </span>
        {!RECURSION_OPTIONS.find((o) => o.value === algo)?.ready && (
          <span className="algo-soon-badge">🚧 coming soon — showing Tower of Hanoi</span>
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
            {activeConfig.param.label}
            {activeConfig.param.type === "text" ? (
              <input
                type="text"
                maxLength={activeConfig.param.maxLength}
                value={paramValue}
                onChange={(e) => handleParamChange(e.target.value)}
                disabled={phase === "playing"}
                placeholder="e.g. CODE"
                spellCheck={false}
                className="sort-n-input sort-n-input--text"
              />
            ) : (
              <input
                type="number"
                min={activeConfig.param.min}
                max={activeConfig.param.max}
                value={paramValue}
                onChange={(e) => handleParamChange(e.target.value)}
                disabled={phase === "playing"}
                className="sort-n-input"
              />
            )}
          </label>
        </div>
      </div>

      <div className="sort-layout">
        {/* LEFT: visualization */}
        {/* LEFT: visualization */}
        <div className="sort-viz-panel">
          {activeConfig.ownControls ? (
            <Visualizer
              step={step}
              n={paramValue}
              allStepsLength={allSteps.length}
              currentStep={currentStep}
              phase={phase}
              onStart={handleStart}
              onReset={handleReset}
              formula={activeConfig.formula}
              maxN={activeConfig.param.max}
            />
          ) : (
            <div className="toh-viz-wrap">
              <div className="step-bar">
                {allSteps.length > 0 ? (
                  <>
                    <span className="step-counter">{currentStep + 1} <span className="step-of">/ {allSteps.length}</span></span>
                    <span className="step-desc">{step.note}</span>
                  </>
                ) : (
                  <span className="step-hint">Set {activeConfig.param.label.toLowerCase()} and press Start</span>
                )}
              </div>
              <Visualizer step={step} totalDisks={paramValue} n={paramValue} maxN={activeConfig.param.max ?? activeConfig.param.maxLength} />
            </div>
          )}

          {!activeConfig.ownControls && (
            <button className="sort-start-btn" onClick={handleStart} disabled={phase === "playing"}>
              {phase === "playing" ? "Running…" : phase === "done" ? "Restart" : "Start"}
            </button>
          )}
        </div>

        {/* RIGHT: process / explain / code panel — identical to Sorts.jsx */}
        <div className="sort-side-panel">
          <div className="side-tabs">
            <button className={`side-tab-btn ${panelTab === "process" ? "active" : ""}`} onClick={() => setPanelTab("process")}>
              See Process
            </button>
            <button className={`side-tab-btn ${panelTab === "explain" ? "active" : ""}`} onClick={() => setPanelTab("explain")}>
              Explaination
            </button>
            <button className={`side-tab-btn ${panelTab === "code" ? "active" : ""}`} onClick={() => setPanelTab("code")}>
              See Code
            </button>
          </div>

          {panelTab === "process" ? (
            <div className="process-list">
              {allSteps.length === 0 && <p className="process-empty">Steps will appear here once you press Start.</p>}
              {allSteps.map((s, i) => (
                <div key={i} className={`process-item ${i === currentStep ? "process-item--active" : i < currentStep ? "process-item--done" : ""}`}>
                  <span className="process-num">{i + 1}</span>
                  <span>{s.note}</span>
                </div>
              ))}
            </div>
          ) : panelTab === "explain" ? (
            <div className="explain-panel">
              <h3 className="explain-title">{RECURSION_OPTIONS.find((o) => o.value === algo)?.label}</h3>
              <div className="explain-block">
                <span className="explain-label">Definition</span>
                <p>{RECURSION_DEFINITIONS[algo]?.definition}</p>
              </div>
              <div className="explain-block">
                <span className="explain-label">Example</span>
                <p>{RECURSION_DEFINITIONS[algo]?.example}</p>
              </div>
              {RECURSION_DEFINITIONS[algo]?.facts && (
                <div className="explain-block">
                  <span className="explain-label">Fascinating Facts</span>
                  <ul className="explain-facts-list">
                    {RECURSION_DEFINITIONS[algo].facts.map((fact, i) => (
                      <li key={i}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}
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
                  {highlightCode(activeConfig.code[lang]).map((tok, i) => (
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

export default Recursion;