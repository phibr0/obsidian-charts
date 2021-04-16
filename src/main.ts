import { MarkdownPostProcessorContext, Plugin, Setting, SettingTab } from 'obsidian';
import * as Yaml from 'yaml';
import * as Chartist from 'chartist';
import { Chart, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);


interface ChartPluginSettings {
	color1: string;
	borderColor1: string;
	color2: string;
	borderColor2: string;
	color3: string;
	borderColor3: string;
	color4: string;
	borderColor4: string;
	color5: string;
	borderColor5: string;
	color6: string;
	borderColor6: string;
}

const DEFAULT_SETTINGS: ChartPluginSettings = {
	borderColor1: 'rgba(255, 99, 132, 0.2)',
	borderColor2: 'rgba(54, 162, 235, 0.2)',
	borderColor3: 'rgba(255, 206, 86, 0.2)',
	borderColor4: 'rgba(75, 192, 192, 0.2)',
	borderColor5: 'rgba(153, 102, 255, 0.2)',
	borderColor6: 'rgba(255, 159, 64, 0.2)',
	color1: 'rgba(255, 99, 132, 1)',
	color2: 'rgba(54, 162, 235, 1)',
	color3: 'rgba(255, 206, 86, 1)',
	color4: 'rgba(75, 192, 192, 1)',
	color5: 'rgba(153, 102, 255, 1)',
	color6: 'rgba(255, 159, 64, 1)'
}

export default class ChartPlugin extends Plugin {

	settings: ChartPluginSettings;

	static postprocessor = async (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {

		let yaml;
		try {
			yaml = await Yaml.parse(content);
		} catch (error) {
			el.innerHTML = "Couldn't render Chart:<br><code style=\"color:crimson\">" + error + "</code>";
			return;
		}
		if (!yaml || !yaml.labels || !yaml.series || !yaml.type) {
			el.innerHTML = "Couldn't render Chart:<br><code style=\"color:crimson\">Missing type, labels or series</code>";
		}
		console.log(yaml);

		if (yaml.legacy == true) {
			const destination = document.createElement('div');

			if (yaml.type.toLowerCase() === 'line') new Chartist.Line(destination, {
				labels: yaml.labels,
				series: yaml.series
			}, {
				lineSmooth: Chartist.Interpolation.cardinal({
					fillHoles: yaml.fillGaps ?? false,
				}),
				low: yaml.low,
				showArea: yaml.showArea ?? false,
			});
			else if (yaml.type.toLowerCase() === 'bar') new Chartist.Bar(destination, {
				labels: yaml.labels,
				series: yaml.series
			}, {
				low: yaml.low,
				stackBars: yaml.stacked ?? false,
				horizontalBars: yaml.horizontal ?? false
			});
			else if (yaml.type.toLowerCase() === 'pie') new Chartist.Pie(destination, {
				labels: yaml.labels,
				series: yaml.series
			}, {
				labelDirection: 'explode',
			});
			else return;

			el.appendChild(destination);
			return;
		}

		//create the new canvas element
		const destination = document.createElement('canvas');
		const destinationContext = destination.getContext("2d");

		const colors = [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
			'rgba(255, 159, 64, 0.2)'
		];
		const borderColors = [
			'rgba(255, 99, 132, 1)',
			'rgba(54, 162, 235, 1)',
			'rgba(255, 206, 86, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
			'rgba(255, 159, 64, 1)'
		];

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

		new Chart(destinationContext, chartOptions);

		el.appendChild(destination);

		destination.parentElement.style.width = yaml.width;
		destination.parentElement.style.margin = "auto";

		return;
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onload() {
		console.log('loading plugin: Obsidian Charts');

		await this.loadSettings()
		//this.addSettingTab(new ChartSettingTab(this.app, this));
		this.registerMarkdownCodeBlockProcessor('chart', ChartPlugin.postprocessor);
	}

	onunload() {
		console.log('unloading plugin: Obsidian Charts');
	}

}
