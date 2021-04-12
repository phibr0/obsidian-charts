import { MarkdownPostProcessorContext, Plugin} from 'obsidian';
import * as Yaml from 'yaml';
import * as Chartist from 'chartist';
import { renderChart } from './charting/chartRenderer';
import { ChartPluginSettings, DEFAULT_SETTINGS } from './constants/settingsConstants';

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

		renderChart(yaml, el);

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
