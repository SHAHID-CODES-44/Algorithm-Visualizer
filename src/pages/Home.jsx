import { useState, useRef, useCallback } from "react";
import "./Home.css";

const DISK_COLORS = [
  "#2563EB","#7C3AED","#0891B2","#059669","#D97706","#DC2626","#DB2777"
];

const generateAllSteps = (n, source, helper, destination, stepsArr) => {
  if (n === 1) { stepsArr.push({ disk: 1, from: source, to: destination }); return; }
  generateAllSteps(n - 1, source, destination, helper, stepsArr);
  stepsArr.push({ disk: n, from: source, to: destination });
  generateAllSteps(n - 1, helper, source, destination, stepsArr);
};

const buildInitialRods = (n) => ({
  Source: Array.from({ length: n }, (_, i) => n - i),
  Helper: [],
  Destination: [],
});

const applyStepsUpTo = (allSteps, targetIndex, n) => {
  const rods = buildInitialRods(n);
  for (let i = 0; i <= targetIndex; i++) {
    const { from, to } = allSteps[i];
    const disk = rods[from].pop();
    rods[to].push(disk);
  }
  return rods;
};

const ROD_NAMES = ["Source", "Helper", "Destination"];

const Home = () => {
  const [n, setN] = useState("");
  const [speed, setSpeed] = useState(1000);
  const [rods, setRods] = useState(buildInitialRods(0));
  const [allSteps, setAllSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [phase, setPhase] = useState("idle");
  const [countdown, setCountdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const timeoutsRef = useRef([]);

  const clearAllTimeouts = () => { timeoutsRef.current.forEach(clearTimeout); timeoutsRef.current = []; };

  const totalDisks = parseInt(n) || 0;
  const complete = currentStep === allSteps.length - 1 && allSteps.length > 0;

  const handleStart = () => {
    const num = parseInt(n);
    if (!num || num < 1 || num > 7) return;
    clearAllTimeouts();
    const steps = [];
    generateAllSteps(num, "Source", "Helper", "Destination", steps);
    setAllSteps(steps);
    setCurrentStep(-1);
    setRods(buildInitialRods(num));
    setPhase("countdown");

    let count = 4;
    setCountdown(count);
    const tick = () => {
      count--;
      if (count > 0) {
        setCountdown(count);
        timeoutsRef.current.push(setTimeout(tick, 800));
      } else {
        setCountdown(null);
        setPhase("playing");
        runAutoPlay(steps, num, 0);
      }
    };
    timeoutsRef.current.push(setTimeout(tick, 800));
  };

  const runAutoPlay = (steps, num, fromIndex) => {
    steps.forEach((_, i) => {
      if (i < fromIndex) return;
      timeoutsRef.current.push(setTimeout(() => {
        const newRods = applyStepsUpTo(steps, i, num);
        setRods(newRods);
        setCurrentStep(i);
        if (i === steps.length - 1) setPhase("done");
      }, speed * (i - fromIndex + 1)));
    });
  };

  const handlePrev = () => {
    if (currentStep < 0) return;
    clearAllTimeouts();
    if (phase === "playing") setPhase("paused");
    const next = currentStep - 1;
    setCurrentStep(next);
    setRods(next < 0 ? buildInitialRods(totalDisks) : applyStepsUpTo(allSteps, next, totalDisks));
  };

  const handleNext = () => {
    if (currentStep >= allSteps.length - 1) return;
    clearAllTimeouts();
    if (phase === "playing") setPhase("paused");
    const next = currentStep + 1;
    setCurrentStep(next);
    setRods(applyStepsUpTo(allSteps, next, totalDisks));
    if (next === allSteps.length - 1) setPhase("done");
  };

  const getDiskWidth = (diskNum) => {
    if (totalDisks <= 1) return 150;
    return 36 + ((diskNum - 1) / (totalDisks - 1)) * 114;
  };

  const currentStepData = currentStep >= 0 ? allSteps[currentStep] : null;

  return (
    <div className="toh-root">
      <h2 className="sr-only">Tower of Hanoi Visualizer</h2>

      {/* Header */}
      <header className="toh-header">
        <div>
          <span className="toh-eyebrow">Algorithm Visualizer</span>
          <h1 className="toh-title">Tower of Hanoi</h1>
        </div>
        <div className="toh-rules">
          <span>① One disk at a time</span><span className="dot">·</span>
          <span>② Smaller on larger only</span><span className="dot">·</span>
          <span>③ Move all Source → Destination</span>
        </div>
      </header>

      {/* Controls row */}
      <div className="toh-controls">
        <div className="ctrl-group">
          <label className="ctrl-label">Disks <em>(1–7)</em></label>
          <input type="number" min={1} max={7} placeholder="e.g. 3"
            value={n} onChange={(e) => setN(e.target.value)}
            className="ctrl-input"
            disabled={phase === "playing" || phase === "countdown"} />
        </div>
        <div className="ctrl-group ctrl-wide">
          <label className="ctrl-label">Auto speed — {(speed/1000).toFixed(1)}s / step</label>
          <input type="range" min={500} max={5000} step={100}
            value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
            className="ctrl-slider"
            disabled={phase === "playing" || phase === "countdown"} />
          <div className="slider-ends"><span>Fast</span><span>Slow</span></div>
        </div>
        <div className="ctrl-actions">
          <button className="btn-primary" onClick={handleStart}
            disabled={phase === "playing" || phase === "countdown"}>
            {phase === "idle" ? "Start" : phase === "countdown" ? "Starting…" : phase === "playing" ? "Playing…" : "Restart"}
          </button>
          {allSteps.length > 0 && (
            <button className="btn-outline" onClick={() => setShowModal(true)}>Full Process</button>
          )}
        </div>
      </div>

      {/* Countdown */}
      {countdown !== null && <div className="toh-countdown">{countdown}</div>}

      {/* Main area */}
      <div className="toh-main">

        {/* Visualization */}
        <div className="toh-viz-wrap">
          {/* Step info bar */}
          <div className="step-bar">
            {allSteps.length > 0 ? (
              <>
                <span className="step-counter">{currentStep + 1} <span className="step-of">/ {allSteps.length}</span></span>
                {currentStepData && (
                  <span className="step-desc">
                    Disk <strong>{currentStepData.disk}</strong> · {currentStepData.from} → {currentStepData.to}
                  </span>
                )}
                {complete && <span className="badge-complete">✓ Complete!</span>}
              </>
            ) : (
              <span className="step-hint">Enter disks and press Start</span>
            )}
          </div>

          {/* Rods */}
          <div className="toh-viz">
            {ROD_NAMES.map((rodName) => (
              <div className="rod-col" key={rodName}>
                <div className="rod-disks">
                  {rods[rodName].map((diskNum, i) => (
                    <div key={i} className={`disk ${currentStepData && currentStepData.disk === diskNum && currentStepData.to === rodName ? "disk--landing" : ""}`}
                      style={{ width: getDiskWidth(diskNum), background: DISK_COLORS[(diskNum-1) % DISK_COLORS.length] }}>
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

          {/* Prev / Next */}
          <div className="nav-btns">
            <button className="nav-btn" onClick={handlePrev} disabled={currentStep < 0 || allSteps.length === 0}>
              ← Prev
            </button>
            <button className="nav-btn nav-btn--next" onClick={handleNext} disabled={currentStep >= allSteps.length - 1 || allSteps.length === 0}>
              Next →
            </button>
          </div>
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Full Process</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {allSteps.map((s, i) => (
                <div key={i} className={`modal-step ${i === currentStep ? "modal-step--active" : i < currentStep ? "modal-step--done" : ""}`}>
                  <span className="modal-num">{i + 1}</span>
                  <span>Disk <strong>{s.disk}</strong> · {s.from} → {s.to}</span>
                  {i < currentStep && <span className="modal-tick">✓</span>}
                </div>
              ))}
            </div>
            {complete && (
              <div className="modal-footer">
                <span className="badge-complete">✓ All {allSteps.length} steps complete!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;