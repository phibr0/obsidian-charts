import { borderColors, colors } from '../constants/colorConstants';
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
                },
                plugins: {
                    legend: {
                        display: yaml.legend,
                        position: yaml.legendPosition
                    }
                },
                layout: {
                    padding: yaml.padding
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
                indexAxis: yaml.indexAxis,
                scales: {
                    y: {
                        min: yaml.yMin,
                        max: yaml.yMax,
                        reverse: yaml.yReverse,
                        ticks: {
                            display: yaml.yTickDisplay,
                            padding: yaml.yTickPadding
                        },
                        display: yaml.yDisplay,
                        stacked: yaml.stacked,
                        beginAtZero: yaml.beginAtZero,
                        grid: { color: 'rgba(122,122,122,0.3)' }
                    },
                    x: {
                        min: yaml.xMin,
                        max: yaml.xMax,
                        reverse: yaml.xReverse,
                        ticks: {
                            display: yaml.xTickDisplay,
                            padding: yaml.xTickPadding
                        },
                        display: yaml.xDisplay,
                        stacked: yaml.stacked,
                        grid: { color: 'rgba(122,122,122,0.3)' }
                    }
                },
                plugins: {
                    legend: {
                        display: yaml.legend,
                        position: yaml.legendPosition
                    }
                },
                layout: {
                    padding: yaml.padding
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
            options: {
                plugins: {
                    legend: {
                        display: yaml.legend,
                        position: yaml.legendPosition
                    }
                },
                layout: {
                    padding: yaml.padding
                }
            }
        };
    }

    new Chart(destinationContext!, chartOptions);

    el.appendChild(destination);

    destination.parentElement!.style.width = yaml.width;
    destination.parentElement!.style.margin = "auto";
    
    return;
}