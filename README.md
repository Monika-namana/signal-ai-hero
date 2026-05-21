# Signal AI // The Cognitive Refactoring & Optimization Engine

**Signal AI** is a next-generation AI coding assistant and static analysis engine that compiles, refactors, and optimizes complex source code in real time. By acting as an automated compiler agent, it parses developer codebases, detects architectural inefficiencies, and generates optimal subtrees—reducing execution latency from seconds to milliseconds.

---

## 💡 The Importance of the Application

Modern software engineering suffers from **cognitive overload** and **performance debt**. As codebases scale, structural bottlenecks—such as quadratic search loops, sub-optimal indexing, and memory allocation leaks—silently compound, causing massive operational latency and bloated infrastructure costs.

### How Signal AI Solves This:
* **Abstract Syntax Tree (AST) Parsing**: Signal AI analyzes code structure directly at the AST level, mapping logical trees with 99.8% precision to understand program flow rather than just treating code as raw text.
* **Automated O(N²) -> O(N) Refactoring**: It automatically replaces brute-force, inefficient algorithms (like nested search loops) with set-lookup hash tables and linear execution strategies.
* **JIT WebAssembly Compilation**: Compiles heavy code calculations directly into fast WebAssembly (Wasm) runtimes, bringing native execution speeds directly to sandboxed compiler environments.
* **Sub-Millisecond Latency Control**: Reduces diagnostic latencies down to a stable `12ms` threshold, enabling real-time refactoring without disrupting active developer loops.

---

## 🎯 Today's Centerpiece Milestone: The Interactive Hero UI

Today, we built the **Interactive Hero Section**—the primary conceptual gateway to the Signal AI platform. This section functions as a high-fidelity visual and technical simulation of the compiler in action, allowing developers to immediately experience the app's speed, depth, and precision:

* **💻 Interactive Code Terminal**: Simulates a live optimization run in real time. It features automatic scanning sequences, active AST analysis, and a visual hot-reload transition as it successfully refactors an inefficient O(N²) Python function into an optimal O(N) lookup loop, bringing execution time down from `420ms` to `12ms`.
* **🔮 Volumetric Holographic Orb**: Represents the central neuro-energy compiler reactor. Built with three staggered, rotating SVG concentric gear tracks, compass HUD crosshairs, active degree ticks, a sweeping scanning laser, and an inner rotating 3D wireframe octahedron encasing a white-hot spark nucleus.
* **🕶️ Five-Plane Depth-of-Field (DoF) Parallax**: Creates immersive visual depth. Floating glass cards containing token lists, JIT WASM stacks, and optimizer matrices are mapped across five independent Z-planes (from Plane -2 to +2). Moving the mouse tilts the central terminal while cards glide and automatically refocus (`blur` transitions) based on cursor distance.
* **🎨 Dynamic Spotlight Atmosphere**: A trailing cursor color-dodge spotlight that shifts color fields dynamically to match the compiler's diagnostic phase (Cyan when **Scanning**, Emerald when **Optimal**, and Violet when **Buggy**), unifying the landing page's aesthetic.
* **⚡ High-Velocity Signal Conduits**: Razor-thin SVG links (`0.25px`) utilizing angle-mapped fading linear gradients that seamlessly dissolve near card nodes, carrying rounded single-bead liquid drop sparks representing active compilation packets.
* **📊 Active Telemetry Sparklines**: Custom-animated visualizers in the metrics grid featuring:
  * *Dev Sandboxes*: A live animated vertical bar equalizer.
  * *AST Accuracy*: A steady-state sine wave with a traveling laser spark.
  * *Wasm Latency*: A horizontal latency timeline tracker.

---

## 🚀 Getting Started & Local Preview

To launch the local development environment and interact with the hero section:

### 1. Installation
Clone this repository and install the project dependencies:
```bash
npm install
```

### 2. Run the Local Development Server
Execute Vite's hot-module-replacement (HMR) local development server:
```bash
npm run dev
```

Once active, Vite will host the application at:
👉 **[http://localhost:5173/](http://localhost:5173/)**

*(Ctrl + Click or Cmd + Click the link above directly from this README file in your editor to open the interactive local host preview!)*

### 3. Build for Production
To compile the application into fully optimized, minified static assets:
```bash
npm run build
```
Compiled outputs will be generated inside the `/dist` folder, ready for premium static hosting.
