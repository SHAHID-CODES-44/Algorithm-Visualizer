// src/visualizers/Sorts.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/base.css";
import OnRefresh from "../pages/OnRefresh";

// ---- CODE SNIPPETS ----
const CODE = {
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

// ---- ALGORITHM LIST (dropdown works, only bubble-sort is implemented) ----
const ALGO_OPTIONS = [
  { value: "bubble-sort", label: "Bubble Sort", ready: true },
  { value: "selection-sort", label: "Selection Sort (coming soon)", ready: false },
  { value: "insertion-sort", label: "Insertion Sort (coming soon)", ready: false },
  { value: "quick-sort", label: "Quick Sort (coming soon)", ready: false },
  { value: "merge-sort", label: "Merge Sort (coming soon)", ready: false },
];

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

// ---- STEP GENERATOR ----
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
    note: "Array fully sorted! ✅",
  });
  return steps;
};

const BAR_WIDTH = 34;
const BAR_GAP = 29;
const MIN_BAR_HEIGHT = 36;

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

  OnRefresh(phase === "playing");

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
    const size = Math.min(Math.max(parseInt(n) || 8, 2), 20);
    setN(String(size));
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 190) + 10);
    setArray(arr);
    setAllSteps([]);
    setCurrentStep(-1);
    setPhase("idle");
  };

  const handleSizeChange = (val) => {
    const size = Math.min(Math.max(parseInt(val) || 0, 0), 20);
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
    const steps = bubbleSortSteps(array.map(Number));
    setAllSteps(steps);
    setCurrentStep(0);
    setPhase("playing");
    steps.forEach((_, i) => {
      timeoutsRef.current.push(setTimeout(() => setCurrentStep(i), i * speed));
    });
    timeoutsRef.current.push(setTimeout(() => setPhase("done"), steps.length * speed));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const step = allSteps[currentStep] || {
    array: array.map((v, i) => ({ id: i, value: v })),
    comparing: [],
    sortedIdx: [],
    note: "Enter or randomize an array, then press Start.",
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
        {algo !== "bubble-sort" && (
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
    <span>Fast</span>
    <span>Slow</span>
  </div>
</div>
          <label className="sort-n-label">
            n
            <input
              type="number"
              min={2}
              max={18}
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
                className={`bar ${step.comparing.includes(idx) ? "bar--comparing" : ""} ${step.sortedIdx.includes(idx) ? "bar--sorted" : ""}`}
                style={{
                  left: idx * (BAR_WIDTH + BAR_GAP),
                  height: scaleHeight(item.value),
                  width: BAR_WIDTH,
                }}
              >
                <span className="bar-value">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="index-row" style={{ width: step.array.length * (BAR_WIDTH + BAR_GAP) }}>
            {step.array.map((_, idx) => (
              <span key={idx} className="index-label" style={{ width: BAR_WIDTH, marginRight: BAR_GAP }}>
                {idx}
              </span>
            ))}
          </div>

          <div className="array-input-row">
            {array.length === 0 && <span className="array-empty-hint">Set n, then type values or hit Random</span>}
            {array.map((val, i) => (
              <input
                key={i}
                type="number"
                value={val}
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
              className={`side-tab-btn ${panelTab === "code" ? "active" : ""}`}
              onClick={() => setPanelTab("code")}
            >
              See Code →
            </button>
          </div>

          {panelTab === "process" ? (
            <div className="process-list">
              {allSteps.length === 0 && <p className="process-empty">Steps will appear here once you press Start.</p>}
              {allSteps.map((s, i) => (
                <div
                  key={i}
                  className={`process-item ${i === currentStep ? "process-item--active" : i < currentStep ? "process-item--done" : ""}`}
                >
                  <span className="process-num">{i + 1}</span>
                  <span>{s.note}</span>
                </div>
              ))}
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
                  {highlightCode(CODE[lang]).map((tok, i) => (
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