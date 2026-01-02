document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("intro-splash");
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const sim = document.getElementById("simulation");

  setTimeout(() => {
    splash.style.display = "none";
    page1.style.opacity = "1";
  }, 3000);

  document.getElementById("start-button").onclick = () => {
    page1.classList.add("hidden");
    page2.classList.remove("hidden");
  };

  document.getElementById("back2").onclick = () => {
    page2.classList.add("hidden");
    page1.classList.remove("hidden");
  };

  document.getElementById("agree-button").onclick = () => {
    page2.classList.add("hidden");
    sim.classList.remove("hidden");
  };

  document.getElementById("back-btn").onclick = () => {
    sim.classList.add("hidden");
    page2.classList.remove("hidden");
  };

  const lambda = document.getElementById("lambda");
  const slit = document.getElementById("slit");
  const screen = document.getElementById("screen");
  const polarizer = document.getElementById("polarizer");
  const entanglement = document.getElementById("entanglement");

  const updateVals = () => {
    document.getElementById("lambda-val").innerText = lambda.value;
    document.getElementById("slit-val").innerText = slit.value;
    document.getElementById("screen-val").innerText = screen.value;
    document.getElementById("polarizer-val").innerText = polarizer.value;
  };

  [lambda, slit, screen, polarizer].forEach(i =>
    i.addEventListener("input", updateVals)
  );
  updateVals();

  function computePattern({ λ, d, L, mode, a }) {
    const x = [];
    const y = [];
    const visibility =
      mode === "none" ? 1 : mode === "which" ? 0 : Math.cos(a * Math.PI / 180) ** 2;

    for (let i = -10; i <= 10; i += 0.05) {
      const phase = (2 * Math.PI * d * i * 1e-3) / (λ * L);
      const intensity = 0.5 * (1 + visibility * Math.cos(phase));
      x.push(i);
      y.push(intensity);
    }
    return { x, y };
  }

  document.getElementById("submit-btn").onclick = () => {
    const data = computePattern({
      λ: lambda.value * 1e-9,
      d: slit.value * 1e-3,
      L: screen.value,
      mode: entanglement.value,
      a: polarizer.value
    });

    document.getElementById("plot-section").classList.remove("hidden");

    Plotly.newPlot("plot", [{
      x: data.x,
      y: data.y,
      type: "scatter",
      line: { color: "#00ffff" }
    }], {
      paper_bgcolor: "#0b0f14",
      plot_bgcolor: "#0b0f14",
      xaxis: { title: "Position (mm)", color: "#fff" },
      yaxis: { title: "Intensity", range: [0, 1], color: "#fff" }
    }, { displayModeBar: false });
  };

  document.getElementById("clear-btn").onclick = () => {
    Plotly.purge("plot");
    document.getElementById("plot-section").classList.add("hidden");
  };
});
