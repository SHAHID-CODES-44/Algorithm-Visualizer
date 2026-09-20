// src/visualizers/Recursion.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/base.css";
import OnRefresh from "../pages/OnRefresh";

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
// ---------------------------------------------- CODE STORAGE ENDS FOR ALL RECURSION PROBLEMS ----------------------------------------

// ---- PROBLEM LIST (dropdown works, only Tower of Hanoi is implemented) ----
const RECURSION_OPTIONS = [
  { value: "tower-of-hanoi", label: "Tower of Hanoi", ready: true },
  { value: "factorial", label: "Factorial (coming soon)", ready: false },
  { value: "fibonacci", label: "Fibonacci (coming soon)", ready: false },
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
  "tower-of-hanoi": {
    steps: towerOfHanoiSteps,
    code: TowerOfHanoiCodes,
    Visualizer: TowerOfHanoiVisualizer,
    param: { key: "disks", label: "Disks", min: 1, max: 7, default: 3 },
  },
};

// Time and Space Complexity
const RECURSION_COMPLEXITY = {
  "tower-of-hanoi": { time: "O(2ⁿ)", space: "O(n)" },
};

// Definitions + Examples
const RECURSION_DEFINITIONS = {
  "tower-of-hanoi": {
    definition: "A classic recursive puzzle: move a stack of disks from a source rod to a destination rod, using a helper rod, moving one disk at a time and never placing a larger disk on a smaller one.",
    example: "Like moving a stack of nested bowls from one table to another, one bowl at a time, using a spare table as temporary storage — always keeping bigger bowls beneath smaller ones.",
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

            <Visualizer step={step} totalDisks={paramValue} />
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