import { App, PluginSettingTab, Setting } from "obsidian";
import ChartPlugin from "../main";

export class ChartSettingTab extends PluginSettingTab {
	plugin: ChartPlugin;

	constructor(app: App, plugin: ChartPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings - Obsidian Charts' });
		containerEl.innerHTML += "<h4>Read the <a href=\"https://github.com/phibr0/obsidian-charts/blob/master/README.md\">Documentation</a></h4>";
		containerEl.innerHTML += `If you find this Plugin helpful, please consider supporting me:<br><a href="https://www.buymeacoffee.com/phibr0"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=phibr0&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff"></a>`;

		new Setting(containerEl)
			.setName('First Color')
			.setDesc('Set the first color used by any Chart. The Color is typically the same as the Border Color, but with less opacity.')
			.addText(text => text
				.setPlaceholder('Border Color')
				.setValue('')
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.borderColor1 = value;
					await this.plugin.saveSettings();
				}))
			.addText(text => text
				.setPlaceholder('Color')
				.setValue('')
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.color1 = value;
					await this.plugin.saveSettings();
				}));
	}
}