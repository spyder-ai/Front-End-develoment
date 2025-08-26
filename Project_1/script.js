// ===== Dummy Sales Data =====
const salesData = {
  all: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    sales: [1200, 1900, 3000, 2500, 2800, 3500],
    regions: [800, 1200, 600, 900],
    categories: [40, 25, 20, 15]
  },
  north: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    sales: [500, 700, 900, 800, 950, 1000],
    regions: [500, 200, 150, 150],
    categories: [50, 20, 15, 15]
  },
  south: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    sales: [200, 300, 400, 350, 500, 600],
    regions: [100, 300, 100, 100],
    categories: [30, 30, 20, 20]
  },
  east: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    sales: [300, 400, 700, 650, 600, 900],
    regions: [200, 100, 400, 200],
    categories: [25, 35, 20, 20]
  },
  west: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    sales: [200, 500, 1000, 700, 750, 1000],
    regions: [0, 600, 200, 200],
    categories: [35, 25, 25, 15]
  }
};

// ===== Dark Mode Toggle =====
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ===== Chart Instances =====
let lineChart, barChart, pieChart;

// Function to Render Charts
function renderCharts(region = "all") {
  const data = salesData[region];

  // ===== Update Insight Text =====
  document.getElementById("insight-text").textContent = insights[region];

  // Destroy old charts before re-render
  if (lineChart) lineChart.destroy();
  if (barChart) barChart.destroy();
  if (pieChart) pieChart.destroy();
  
  // Line Chart - Sales Trend
  const ctxLine = document.getElementById("lineChart").getContext("2d");
  lineChart = new Chart(ctxLine, {
    type: "line",
    data: {
      labels: data.months,
      datasets: [{
        label: "Sales",
        data: data.sales,
        borderColor: "#0077b6",
        backgroundColor: "rgba(0, 119, 182, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });

  // Bar Chart - Region Performance
  const ctxBar = document.getElementById("barChart").getContext("2d");
  barChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: ["North", "South", "East", "West"],
      datasets: [{
        label: "Regional Sales",
        data: data.regions,
        backgroundColor: ["#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });

  // Pie Chart - Product Categories
  const ctxPie = document.getElementById("pieChart").getContext("2d");
  pieChart = new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: ["Electronics", "Clothing", "Home", "Others"],
      datasets: [{
        data: data.categories,
        backgroundColor: ["#ff6b6b", "#feca57", "#1dd1a1", "#5f27cd"]
      }]
    },
    options: {
      responsive: true
    }
  });
}

// ===== Region Filter =====
document.getElementById("region").addEventListener("change", (e) => {
  renderCharts(e.target.value);
});

// ===== Detailed Insights Text =====
const insights = {
  all: "The company is experiencing overall growth with consistent sales across months. This indicates strong market stability and effective distribution.",
  north: "The North region is the strongest performer, contributing the highest revenue. Focus on retaining loyal customers here to maintain dominance.",
  south: "South shows slower growth but steady improvement. Marketing strategies could boost visibility and increase revenue potential.",
  east: "The East region is showing promising spikes in April and May. It may indicate seasonal demand or untapped potential.",
  west: "The West region shows rapid growth, doubling sales in a short period. A strong opportunity exists to expand aggressively here."
};

// ===== Storytelling Captions =====

const captions = {
  all: "Overall sales show a steady growth trend with strong performance.",
  north: "North region is leading in sales, showing consistent demand.",
  south: "South region has slower growth, but steady improvement.",
  east: "East region shows a sudden jump in April-May.",
  west: "West region sales doubled quickly, big market opportunity!"
};

function showCaption(text) {
  const captionEl = document.getElementById("story-caption");
  captionEl.textContent = text;
  captionEl.classList.add("show");
  setTimeout(() => {
    captionEl.classList.remove("show");
  }, 2000); // stays for 2 seconds
}

// ===== Storytelling Mode =====
document.getElementById("playStory").addEventListener("click", async () => {
  const regions = ["all", "north", "south", "east", "west"];
  for (let r of regions) {
    renderCharts(r);
    showCaption(captions[r]);
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3s delay
  }
});


// ===== Initial Render =====
renderCharts();
