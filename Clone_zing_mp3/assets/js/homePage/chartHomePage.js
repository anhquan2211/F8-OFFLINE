// // <block:setup:1>
// const DATA_COUNT = 7;
// const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

// const labels = Utils.months({ count: 7 });
// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [10, 30, 50, 20, 25, 44, -10],
//       borderColor: Utils.CHART_COLORS.red,
//       backgroundColor: Utils.CHART_COLORS.red,
//     },
//     {
//       label: "Dataset 2",
//       data: [100, 33, 22, 19, 11, 49, 30],
//       borderColor: Utils.CHART_COLORS.blue,
//       backgroundColor: Utils.CHART_COLORS.blue,
//     },
//   ],
// };
// // </block:setup>

// // <block:config:0>
// const config = {
//   type: "line",
//   data: data,
//   options: {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: "Min and Max Settings",
//       },
//     },
//     scales: {
//       y: {
//         min: 10,
//         max: 50,
//       },
//     },
//   },
// };
// // </block:config>

// module.exports = {
//   config: config,
// };
const Utils = ChartUtils.init();

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

console.log(Utils.numbers);
let labels = ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5"];

let itemData = [1000000, 1500000, 2000000, 1800000, 3000000];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      yAxisID: "y",
      tension: 0.1,
    },
    {
      label: "Dataset 2",
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      yAxisID: "y1",
      tension: 0.1,
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    reponsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "#ZingChart",
      },
    },

    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  },
};

const chart = new Chart(document.getElementById("myChart"), config);
