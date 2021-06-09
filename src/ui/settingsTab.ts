import { App, PluginSettingTab, Setting, } from "obsidian";
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
		let { containerEl, plugin } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings - Obsidian Charts' });
		containerEl.innerHTML += "<h4>Read the <a href=\"https://github.com/phibr0/obsidian-charts/blob/master/README.md\">Documentation</a></h4>";

		const desc1 = document.createDocumentFragment();
		desc1.append(
			"Set the Colors for your Charts. By default the inner Color ist the same as the outer one, but with less opacity. ",
			"You can use any ",
			desc1.createEl("a", {
				href: "https://www.w3schools.com/cssref/css_colors.asp",
				text: "valid CSS Color."
			}),
		)

		const desc2 = document.createDocumentFragment();
		desc2.append(
			"Set the Colors for your Charts. By default the inner Color ist the same as the outer one, but with less opacity. ",
			"You can use any ",
			desc2.createEl("a", {
				href: "https://www.w3schools.com/cssref/css_colors.asp",
				text: "valid CSS Color."
			}),
		)

		const desc3 = document.createDocumentFragment();
		desc3.append(
			"Set the Colors for your Charts. By default the inner Color ist the same as the outer one, but with less opacity. ",
			"You can use any ",
			desc3.createEl("a", {
				href: "https://www.w3schools.com/cssref/css_colors.asp",
				text: "valid CSS Color."
			}),
		)

		const desc4 = document.createDocumentFragment();
		desc4.append(
			"Set the Colors for your Charts. By default the inner Color ist the same as the outer one, but with less opacity. ",
			"You can use any ",
			desc4.createEl("a", {
				href: "https://www.w3schools.com/cssref/css_colors.asp",
				text: "valid CSS Color."
			}),
		)

		const desc5 = document.createDocumentFragment();
		desc5.append(
			"Set the Colors for your Charts. By default the inner Color ist the same as the outer one, but with less opacity. ",
			"You can use any ",
			desc5.createEl("a", {
				href: "https://www.w3schools.com/cssref/css_colors.asp",
				text: "valid CSS Color."
			}),
		)

		const desc6 = document.createDocumentFragment();
		desc6.append(
			"Set the Colors for your Charts. By default the inner Color ist the same as the outer one, but with less opacity. ",
			"You can use any ",
			desc6.createEl("a", {
				href: "https://www.w3schools.com/cssref/css_colors.asp",
				text: "valid CSS Color."
			}),
		)

		new Setting(containerEl)
			.setName("Set Color 1")
			.setDesc(desc1)
			.addText((cb) => {
				cb.setValue(plugin.settings.color1)
				cb.setPlaceholder("Inner Color")
				cb.onChange(async (value) => {
					plugin.settings.color1 = value;
					await plugin.saveSettings();
				})
			})
			.addText((cb) => {
				cb.setValue(plugin.settings.borderColor1)
				cb.setPlaceholder("Border Color")
				cb.onChange(async (value) => {
					plugin.settings.borderColor1 = value;
					await plugin.saveSettings();
				})
			});
		new Setting(containerEl)
			.setName("Set Color 2")
			.setDesc(desc2)
			.addText((cb) => {
				cb.setValue(plugin.settings.color2)
				cb.setPlaceholder("Inner Color")
				cb.onChange(async (value) => {
					plugin.settings.color2 = value;
					await plugin.saveSettings();
				})
			})
			.addText((cb) => {
				cb.setValue(plugin.settings.borderColor2)
				cb.setPlaceholder("Border Color")
				cb.onChange(async (value) => {
					plugin.settings.borderColor2 = value;
					await plugin.saveSettings();
				})
			});
		new Setting(containerEl)
			.setName("Set Color 3")
			.setDesc(desc3)
			.addText((cb) => {
				cb.setValue(plugin.settings.color3)
				cb.setPlaceholder("Inner Color")
				cb.onChange(async (value) => {
					plugin.settings.color3 = value;
					await plugin.saveSettings();
				})
			})
			.addText((cb) => {
				cb.setValue(plugin.settings.borderColor3)
				cb.setPlaceholder("Border Color")
				cb.onChange(async (value) => {
					plugin.settings.borderColor3 = value;
					await plugin.saveSettings();
				})
			});
		new Setting(containerEl)
			.setName("Set Color 4")
			.setDesc(desc4)
			.addText((cb) => {
				cb.setValue(plugin.settings.color4)
				cb.setPlaceholder("Inner Color")
				cb.onChange(async (value) => {
					plugin.settings.color4 = value;
					await plugin.saveSettings();
				})
			})
			.addText((cb) => {
				cb.setValue(plugin.settings.borderColor4)
				cb.setPlaceholder("Border Color")
				cb.onChange(async (value) => {
					plugin.settings.borderColor4 = value;
					await plugin.saveSettings();
				})
			});
		new Setting(containerEl)
			.setName("Set Color 5")
			.setDesc(desc5)
			.addText((cb) => {
				cb.setValue(plugin.settings.color5)
				cb.setPlaceholder("Inner Color")
				cb.onChange(async (value) => {
					plugin.settings.color5 = value;
					await plugin.saveSettings();
				})
			})
			.addText((cb) => {
				cb.setValue(plugin.settings.borderColor5)
				cb.setPlaceholder("Border Color")
				cb.onChange(async (value) => {
					plugin.settings.borderColor5 = value;
					await plugin.saveSettings();
				})
			});
		new Setting(containerEl)
			.setName("Set Color 6")
			.setDesc(desc6)
			.addText((cb) => {
				cb.setValue(plugin.settings.color6)
				cb.setPlaceholder("Inner Color")
				cb.onChange(async (value) => {
					plugin.settings.color6 = value;
					await plugin.saveSettings();
				})
			})
			.addText((cb) => {
				cb.setValue(plugin.settings.borderColor6)
				cb.setPlaceholder("Border Color")
				cb.onChange(async (value) => {
					plugin.settings.borderColor6 = value;
					await plugin.saveSettings();
				})
			});

			new Setting(containerEl)
            .setName('Donate')
            .setDesc('If you like this Plugin, consider donating to support continued development:')
            .addButton((bt) => {
                bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/phibr0"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=phibr0&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>`;
            })
	}
}