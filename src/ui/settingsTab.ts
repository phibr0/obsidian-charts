import { App, PluginSettingTab, Setting, Notice, } from "obsidian";
import type ChartPlugin from "../main";

export class ChartSettingTab extends PluginSettingTab {
	plugin: ChartPlugin;

	constructor(app: App, plugin: ChartPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	isColor(strColor: string) {
		var s = new Option().style;
		s.color = strColor;
		return s.color == strColor;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings - Obsidian Charts' });
		containerEl.innerHTML += "<h4>Read the <a href=\"https://github.com/phibr0/obsidian-charts/blob/master/README.md\">Documentation</a></h4>";
		containerEl.innerHTML += `<p style="position: absolute; bottom: 75px;">If you find this plugin helpful, consider supporting me and thus ensuring the further development of this and other plugins:<p><br><a href="https://www.buymeacoffee.com/phibr0" style="position: absolute; bottom: 15px;"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=phibr0&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff"></a>`
	}
}