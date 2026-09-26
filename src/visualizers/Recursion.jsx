// src/visualizers/Recursion.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/base.css";
import OnRefresh from "../pages/OnRefresh";
import { param } from "framer-motion/client";

// --------------------------------- CODE SNIPPETS FOR ALL RECURSION PROBLEMS ----------------------------------------
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

// ---------------------------------------------- CODE STORAGE ENDS FOR ALL RECURSION PROBLEMS ----------------------------------------

// ---- PROBLEM LIST (dropdown works, only Tower of Hanoi is implemented) ----
const RECURSION_OPTIONS = [
  { value: "factorial", label: "Factorial", ready: true },
  { value: "fibonacci", label: "Fibonacci", ready: false },
  { value: "sum-of-array", label: "Sum of Array", ready: false },
  { value: "power", label: "Power (Exponentiation)", ready: false },
  { value: "gcd", label: "GCD (Euclidean)", ready: false },
  { value: "reverse-string", label: "Reverse a String", ready: false },
  { value: "palindrome-check", label: "Palindrome Check", ready: false },
  { value: "binary-search", label: "Binary Search (Recursive)", ready: false },
  { value: "tower-of-hanoi", label: "Tower of Hanoi", ready: true },
  { value: "permutations", label: "Permutations of a String", ready: false },
  { value: "subsets", label: "Subsets (Power Set)", ready: false },
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
  n = Math.max(1, Math.min(n, 200)); // safety ceiling, not a UX ceiling — see below
  const steps = [];

  // Build node list: callNode(k) for k=n..1, multiplyNode(k) for k=n..2
  const nodes = {};
  for (let k = n; k >= 1; k--) {
    nodes[`call-${k}`] = {
      id: `call-${k}`, depth: n - k, col: 0, label: `f(${k})`,
      status: "pending", value: null,
    };
    if (k < n) {
      nodes[`mul-${k + 1}`] = {
        id: `mul-${k + 1}`, depth: n - k, col: 1, label: `${k + 1} × f(${k})`,
        status: "pending", value: null,
      };
    }
  }

  const snapshot = (note) => steps.push({
    nodes: Object.fromEntries(Object.entries(nodes).map(([id, nd]) => [id, { ...nd }])),
    note,
  });

  snapshot("Initial call — f(n) starts descending.");

  // Descend
  for (let k = n; k >= 1; k--) {
    nodes[`call-${k}`].status = "active";
    snapshot(k === n ? `Calling f(${k}).` : `f(${k + 1}) calls f(${k}) before it can multiply.`);
  }

  // Base case
  nodes[`call-1`].status = "resolved";
  nodes[`call-1`].value = 1n;
  snapshot("Base case reached: f(1) = 1.");

  // Bubble back up
  for (let k = 2; k <= n; k++) {
    const below = nodes[`call-${k - 1}`].value;
    const result = BigInt(k) * below;
    nodes[`mul-${k}`].status = "resolved";
    nodes[`mul-${k}`].value = result;
    nodes[`call-${k}`].status = "resolved";
    nodes[`call-${k}`].value = result;
    snapshot(`f(${k}) = ${k} × f(${k - 1}) = ${k} × ${below.toString().length > 8 ? formatBig(below) : below} = ${result.toString().length > 8 ? formatBig(result) : result}.`);
  }

  snapshot(`Finished! f(${n}) = ${formatBig(nodes[`call-${n}`].value)}`);
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

const FactorialVisualizer = ({ step, n }) => {
  const containerRef = useRef(null);
  const [containerH, setContainerH] = useState(400);
  const [manualZoom, setManualZoom] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerH(entry.contentRect.height);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const ROW_H = 90, NODE_W = 110, NODE_H = 56, COL_GAP = 40;
  const rows = n; // depth 0..n-1
  const totalLogicalHeight = rows * ROW_H + NODE_H;
  const autoFitScale = Math.min(1, containerH / totalLogicalHeight);
  const scale = manualZoom !== null ? manualZoom : autoFitScale;

  const handleWheel = (e) => {
    e.preventDefault();
    const current = manualZoom !== null ? manualZoom : autoFitScale;
    const next = Math.min(3, Math.max(0.1, current - e.deltaY * 0.001));
    setManualZoom(next);
  };

  const nodeList = Object.values(step.nodes || {});

  return (
    <div className="fact-viz-outer" ref={containerRef} onWheel={handleWheel}>
      <div className="fact-zoom-controls">
        <button onClick={() => setManualZoom(Math.min(3, scale + 0.15))}>+</button>
        <button onClick={() => setManualZoom(Math.max(0.1, scale - 0.15))}>−</button>
        <button onClick={() => setManualZoom(null)}>Reset</button>
        <span className="fact-node-count">{nodeList.length} nodes</span>
      </div>

      <div
        className="fact-tree-inner"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          height: totalLogicalHeight,
        }}
      >
        {nodeList.map((nd) => (
          <div
            key={nd.id}
            className={`fact-node fact-node--${nd.status}`}
            style={{
              top: nd.depth * ROW_H,
              left: `calc(50% + ${(nd.col === 0 ? -1 : 1) * (NODE_W / 2 + COL_GAP / 2)}px)`,
              width: NODE_W, height: NODE_H,
            }}
            title={nd.value !== null ? nd.value.toString() : ""}
          >
            {nd.status === "resolved" && nd.value !== null ? formatBig(nd.value) : nd.label}
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
    param: { key: "n", label: "n", min: 1, max: 100, default: 5 },
  },
  "tower-of-hanoi": {
    steps: towerOfHanoiSteps,
    code: TowerOfHanoiCodes,
    Visualizer: TowerOfHanoiVisualizer,
    param: { key: "disks", label: "Disks", min: 1, max: 7, default: 3 },
  },
};

// Time and Space Complexity
const RECURSION_COMPLEXITY = {
  "factorial": { time: "O(n)", space: "O(n)" },
  "fibonacci": { time: "O(2ⁿ)", space: "O(n)" },
  "sum-of-array": { time: "O(n)", space: "O(n)" },
  "power": { time: "O(log n)", space: "O(log n)" },
  "gcd": { time: "O(log(min(a, b)))", space: "O(log(min(a, b)))" },
  "reverse-string": { time: "O(n)", space: "O(n)" },
  "palindrome-check": { time: "O(n)", space: "O(n)" },
  "binary-search": { time: "O(log n)", space: "O(log n)" },
  "tower-of-hanoi": { time: "O(2ⁿ)", space: "O(n)" },
  "permutations": { time: "O(n!)", space: "O(n)" },
  "subsets": { time: "O(2ⁿ)", space: "O(n)" },
  "n-queens": { time: "O(n!)", space: "O(n)" },
};

// Definitions + Examples
const RECURSION_DEFINITIONS = {
  "factorial": {
    definition: "Computes the product of all positive integers up to n, by defining n! in terms of a smaller version of itself: n! = n × (n-1)!.",
    example: "Like a line of people passing a multiplying baton backward — each person multiplies their number by whatever the person behind them eventually hands back.",
  },
  "fibonacci": {
    definition: "Computes the nth number in the sequence where each number is the sum of the two before it, by recursively calling itself for the two smaller subproblems.",
    example: "Like asking two friends to each recall the previous two answers, then adding what they tell you — except your friends ask their own friends the same thing, all the way down.",
  },
  "sum-of-array": {
    definition: "Adds up all elements in an array by recursively summing everything except the first element, then adding the first element to that result.",
    example: "Like passing a receipt down a line of people — each person adds their item's price to the running total handed to them, until it reaches the front.",
  },
  "power": {
    definition: "Computes baseⁿ efficiently by recursively squaring the result for even exponents and reducing by one for odd exponents, cutting the problem in half each time instead of multiplying one-by-one.",
    example: "Like folding a piece of paper in half repeatedly instead of cutting it into single sheets one at a time — you reach the same result exponentially faster.",
  },
  "gcd": {
    definition: "Finds the greatest common divisor of two numbers by repeatedly replacing the larger number with the remainder of dividing it by the smaller, until one number becomes zero.",
    example: "Like repeatedly trimming the longer of two ropes down by the length of the shorter one, over and over, until both ropes are equal — that length is the answer.",
  },
  "reverse-string": {
    definition: "Reverses a string by recursively reversing everything after the first character, then placing the first character at the very end.",
    example: "Like unstacking a pile of plates one at a time and restacking them in a new pile — the last plate you pick up ends up on top, flipping the entire order.",
  },
  "palindrome-check": {
    definition: "Checks whether a string reads the same forwards and backwards by recursively comparing the first and last characters, then checking the smaller string between them.",
    example: "Like two people starting at opposite ends of a word and walking toward each other, checking letters match at each step, until they meet in the middle.",
  },
  "binary-search": {
    definition: "Searches a sorted array by recursively checking the middle element and searching only the left or right half depending on the result, discarding half the remaining data each call.",
    example: "Like looking up a word in a dictionary — you don't scan every page, you jump to the middle, decide which half your word is in, and repeat.",
  },
  "tower-of-hanoi": {
    definition: "A classic recursive puzzle: move a stack of disks from a source rod to a destination rod, using a helper rod, moving one disk at a time and never placing a larger disk on a smaller one.",
    example: "Like moving a stack of nested bowls from one table to another, one bowl at a time, using a spare table as temporary storage — always keeping bigger bowls beneath smaller ones.",
  },
  "permutations": {
    definition: "Generates every possible ordering of a string's characters by recursively fixing one character at a time and permuting the remaining characters in every position.",
    example: "Like trying on every possible arrangement of a small set of fridge magnets, one letter at a time, until you've spelled out every possible combination.",
  },
  "subsets": {
    definition: "Generates every possible subset (the power set) of a set by recursively deciding, for each element, whether to include it or leave it out.",
    example: "Like standing at a buffet with several dishes and recursively asking 'include this dish or skip it?' for every item, listing every possible plate combination.",
  },
  "n-queens": {
    definition: "Places n chess queens on an n×n board so none attack each other, by recursively placing one queen per row and backtracking whenever a placement leads to a conflict.",
    example: "Like seating guests at a round table one at a time, checking for conflicts after each seat is filled, and undoing the last seating whenever a clash is found — trying the next option instead.",
  },
};

// Main Function
const Recursion = () => {
  const [algo, setAlgo] = useState("tower-of-hanoi");
  const [paramValue, setParamValue] = useState(RECURSION_CONFIG["tower-of-hanoi"].param.default);
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

  const handleAlgoChange = (value) => {
    setAlgo(value);
    const cfg = RECURSION_CONFIG[value] || RECURSION_CONFIG["tower-of-hanoi"];
    setParamValue(cfg.param.default);
    setAllSteps([]);
    setCurrentStep(-1);
    setPhase("idle");
  };

  const handleParamChange = (val) => {
    const clamped = Math.min(Math.max(parseInt(val) || 0, activeConfig.param.min), activeConfig.param.max);
    setParamValue(clamped);
    setAllSteps([]);
    setCurrentStep(-1);
    setPhase("idle");
  };

  const handleStart = () => {
    clearAllTimeouts();
    const steps = activeConfig.steps(paramValue);
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
            <input
              type="number"
              min={activeConfig.param.min}
              max={activeConfig.param.max}
              value={paramValue}
              onChange={(e) => handleParamChange(e.target.value)}
              disabled={phase === "playing"}
              className="sort-n-input"
            />
          </label>
        </div>
      </div>

      <div className="sort-layout">
        {/* LEFT: visualization */}
        <div className="sort-viz-panel">
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

            <Visualizer step={step} totalDisks={paramValue} n={paramValue}/>
          </div>

          <button
            className="sort-start-btn"
            onClick={handleStart}
            disabled={phase === "playing"}
          >
            {phase === "playing" ? "Running…" : phase === "done" ? "Restart" : "Start"}
          </button>
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