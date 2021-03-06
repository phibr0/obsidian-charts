import { MarkdownPostProcessorContext, MarkdownView, Plugin, parseYaml, Menu, Editor } from 'obsidian';

import { renderChart } from './charting/chartRenderer';
import { legacyRenderer } from './charting/legacyRenderer';
import { ChartPluginSettings, DEFAULT_SETTINGS } from './constants/settingsConstants';
import { ChartSettingTab } from './ui/settingsTab';
import { CreationHelperModal } from './ui/creationHelperModal';
import { addIcons } from 'src/ui/icons';

export default class ChartPlugin extends Plugin {

	settings: ChartPluginSettings;

	postprocessor = async (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {

		let yaml;
		try {
			yaml = await parseYaml(content);
		} catch (error) {
			el.innerHTML = "Couldn't render Chart:<br><pre><code style=\"color:crimson\">" + error + "</code></pre>";
			return;
		}

		if (!yaml || !yaml.labels || !yaml.series || !yaml.type) {
			el.innerHTML = "Couldn't render Chart:<br><pre><code style=\"color:crimson\">Missing type, labels or series</code></pre>";
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

		addIcons();

		this.addSettingTab(new ChartSettingTab(this.app, this));

		this.addCommand({
			id: 'creation-helper',
			name: 'Insert new Chart',
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf.view instanceof MarkdownView) {
					if (!checking) {
						new CreationHelperModal(this.app, leaf.view, this.settings).open();
					}
					return true;
				}
				return false;
			}
		});

		this.registerMarkdownCodeBlockProcessor('chart', this.postprocessor);

		// Remove this ignore when the obsidian package is updated on npm
		// Editor mode
		// @ts-ignore
		this.registerEvent(this.app.workspace.on('editor-menu',
			(menu: Menu, editor: Editor, view: MarkdownView) => {
				if (view) {
					menu.addItem((item) => {
						item.setTitle("Insert Chart")
							.setIcon("chart")
							.onClick((_) => {
								new CreationHelperModal(this.app, view, this.settings).open();
							});
					});
				}
			}));
	}

	onunload() {
		console.log('unloading plugin: Obsidian Charts');
	}

}
