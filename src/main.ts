import { MarkdownPostProcessorContext, Plugin } from 'obsidian';
import * as Yaml from 'yaml';
import * as Chartist from 'chartist';
import { renderChart } from './charting/chartRenderer';
import { ChartPluginSettings, DEFAULT_SETTINGS } from './constants/settingsConstants';
import { legacyRenderer } from './charting/legacyRenderer';

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
			return;
		}

		if (yaml.legacy == true) {
			legacyRenderer(yaml, el);
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
