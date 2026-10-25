# DSA Visualizer

Live app: https://algorithm-visualizer-nu-five.vercel.app/

Sorting and recursion problems run step by step on your own data, with the code, the explanation and the complexity right next to the animation. No login, no backend, nothing to install.

## Sorting (17 algorithms)
- Basic: Bubble, Selection, Insertion, Shell, Cocktail, Comb
- Efficient: Merge, Quick, Heap
- Non-comparison: Counting, Bucket, Radix
- Hybrid and exotic: Tim, Intro, Cycle, Pancake, Bogo

## Recursion (8 problems)
- Factorial, Fibonacci, Sum of Array: a step ledger that builds row by row from the base case
- Power (fast and simple): the same input solved two ways, so the call-count gap is visible
- Reverse a String: the original array and the reversed array filling side by side
- Binary Search: a sorted array where the search range shrinks around the middle element
- Tower of Hanoi: disks moving between three rods
- N-Queens: a board showing eliminated cells, backtracking and dead ends, including the unsolvable N = 2 and 3

## What you get
- Step-by-step playback with a speed slider
- Three tabs per algorithm: See Process (live step log), Explanation (definition, analogy, facts) and See Code
- Code in C++, Java, Python, Go and Ruby, with syntax colouring and a copy button
- Time and space complexity shown for every algorithm
- Type your own values or press Random
- Bar sizes and the maximum array size adapt to your screen
- A "leave site?" prompt only while an animation is running

## How it works
Every algorithm is a pure function that runs instantly and returns an array of snapshots. The UI then replays those snapshots on a timer, so the highlights, the Process log and the speed slider stay in sync with no extra logic.

One step is plain data:

{
  array: [{ id: 3, value: 42 }, ...],   // full state at this moment
  comparing: [2, 3],                    // what to highlight
  sortedIdx: [7, 8, 9],                 // what is finished
  note: "Comparing 42 and 17."          // shown in the Process tab
}

The page layout is written once. Each algorithm is an entry in a lookup table (`ALGO_CONFIG`) that points to its step generator and its code snippets, so adding an algorithm never touches the UI.

Recursion uses the same pattern with one extra piece: a Visualizer component per problem. That is how a ledger, a rod puzzle, a search bar and a chessboard share one page.

## Engineering notes
- Stable id on every bar: React keeps the same DOM node when bars swap, so a swap is a real slide instead of values jumping between slots
- ResizeObserver for layout: bars, index labels and input boxes stay aligned, and the maximum array size scales with the screen
- Pure step generators: algorithm logic has no React in it, so it is easy to read and test
- Honest visuals: Counting, Bucket and Radix are simplified visual stories, and the code tab always shows the real algorithm
- Safety caps: Bogo Sort is factorial time, so it stops after 200 shuffles instead of freezing the tab
- Unfinished entries are disabled: "coming soon" items cannot be selected, so they cannot crash the page
- Own syntax highlighter: about 25 lines of regex using VS Code Dark+ colours, with no extra library
- Static deploy: no backend, hosted on Vercel, with a rewrite rule so refreshes and deep links do not 404

## Add a new algorithm
- Write the code snippets object (`...Codes`)
- Write the step generator (`...Steps`) returning snapshots in the shape above
- Add an entry to `ALGO_OPTIONS`
- Register it in `ALGO_CONFIG`
- Add its `ALGO_COMPLEXITY` and `ALGO_DEFINITIONS` entries

The UI picks it up automatically.

## Run locally
git clone https://github.com/SHAHID-CODES-44/Algorithm-Visualizer.git
cd Algorithm-Visualizer
npm install
npm run dev
- `npm run build` creates a production build
- `npm run preview` previews that build locally

## Project structure
- `src/pages/Home.jsx`: landing page
- `src/pages/OnRefresh.jsx`: the "leave site?" guard while animating
- `src/visualizers/Sorts.jsx`: the 17 sorting algorithms
- `src/visualizers/Recursions.jsx`: the 8 recursion problems
- `src/css/base.css`: visualizer styles
- `src/css/Home.css`: landing page styles
- `src/App.jsx`: routes

## Stack
- React, React Router
- Vite
- Plain CSS
- Vercel

## Roadmap
- Deterministic Bogo Sort (stubbed in the dropdown as "coming soon")
- N-Queens: a "next solution" button
- More categories: searching, graphs and trees

## Author
Built by Shahid. 
GitHub: https://github.com/SHAHID-CODES-44
Linked: Shahid Firozabad
Greatest Software Developer