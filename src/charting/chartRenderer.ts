import { borderColors, colors } from "src/constants/colorConstants";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export function renderChart(yaml: any, el: HTMLElement) {
    //create the new canvas element
    const destination = document.createElement('canvas');
    const destinationContext = destination.getContext("2d");

    const datasets = [];
    for (let i = 0; yaml.series.length > i; i++) {
        datasets.push({
            label: yaml.series[i].title ?? "",
            data: yaml.series[i].data,
            backgroundColor: yaml.labelColors ? colors : colors[i],
            borderColor: yaml.labelColors ? borderColors : borderColors[i],
            borderWidth: 1,
            fill: yaml.fill ?? false,
            tension: yaml.tension ?? 0,
        });
    }

    let chartOptions;

    if (yaml.type == 'radar' || yaml.type == 'polarArea') {
        chartOptions = {
            type: yaml.type,
            data: {
                labels: yaml.labels,
                datasets: datasets
            },
            options: {
                scales: {
                    r: {
                        grid: { color: 'rgba(122,122,122,0.3)' },
                        beginAtZero: yaml.beginAtZero
                    },
                }
            }
        };
    } else if (yaml.type == 'bar' || yaml.type == 'line') {
        chartOptions = {
            type: yaml.type,
            data: {
                labels: yaml.labels,
                datasets: datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: yaml.beginAtZero,
                        grid: { color: 'rgba(122,122,122,0.3)' }
                    },
                    x: {
                        grid: { color: 'rgba(122,122,122,0.3)' }
                    }
                }
            }
        };
    } else {
        chartOptions = {
            type: yaml.type,
            data: {
                labels: yaml.labels,
                datasets: datasets
            },
            options: {}
        };
    }

    new Chart(destinationContext, chartOptions);

    el.appendChild(destination);

    destination.parentElement.style.width = yaml.width;
    destination.parentElement.style.margin = "auto";
}