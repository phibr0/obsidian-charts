import { MarkdownPostProcessorContext, MarkdownView, Plugin, parseYaml } from 'obsidian';

import { renderChart } from './charting/chartRenderer';
import { legacyRenderer } from './charting/legacyRenderer';
import { ChartPluginSettings, DEFAULT_SETTINGS } from './constants/settingsConstants';
import { ChartSettingTab } from './ui/settingsTab';
import { CreationHelperModal } from './ui/creationHelperModal';

export default class ChartPlugin extends Plugin {

	settings: ChartPluginSettings;

	postprocessor = async (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {

		let yaml;
		try {
			yaml = await parseYaml(content);
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

		renderChart(yaml, el, this.settings);

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

		this.addSettingTab(new ChartSettingTab(this.app, this));

		this.addCommand({
			id: 'creation-helper',
			name: 'Insert new Chart',
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf.view instanceof MarkdownView) {
					if (!checking) {
						new CreationHelperModal(this.app, leaf.view).open();
					}
					return true;
				}
				return false;
			}
		});
		
		this.registerMarkdownCodeBlockProcessor('chart', this.postprocessor);
	}

	onunload() {
		console.log('unloading plugin: Obsidian Charts');
	}

}
