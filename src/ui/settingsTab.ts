import {
  DEFAULT_SETTINGS,
  ImageOptions,
} from './../constants/settingsConstants';
import {
  App,
  MarkdownRenderer,
  Modal,
  Notice,
  PluginSettingTab,
  request,
  Setting,
} from 'obsidian';
import type ChartPlugin from '../main';
import Picker from 'vanilla-picker';

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

    containerEl.createEl('h2', { text: 'Settings - Charts' });

    containerEl.createEl('h3', { text: 'General' });

    new Setting(containerEl)
      .setName('Show Button in Context Menu')
      .setDesc(
        'If enabled, you will se a Button in your Editor Context Menu to open the Chart Creator.'
      )
      .addToggle((cb) => {
        cb.setValue(this.plugin.settings.contextMenu).onChange(
          async (value) => {
            plugin.settings.contextMenu = value;
            await plugin.saveSettings();
          }
        );
      });
    new Setting(containerEl)
      .setName('Donate')
      .setDesc(
        'If you like this Plugin, consider donating to support continued development:'
      )
      .addButton((bt) => {
        bt.buttonEl.outerHTML = `<a href="https://ko-fi.com/phibr0"><img src="https://uploads-ssl.webflow.com/5c14e387dab576fe667689cf/61e11e22d8ff4a5b4a1b3346_Supportbutton-1.png"></a>`;
      });

    containerEl.createEl('h3', {
      text: 'Colors',
      attr: {
        style: 'margin-bottom: 0',
      },
    });
    const desc = containerEl.createEl('p', { cls: 'setting-item-description' });
    desc.append(
      'Set the Colors for your Charts. This will set the border Color and the inner Color will be the same, but with less opacity. This ensures better compatibility with Dark and Light Mode. ',
      'You can use any ',
      desc.createEl('a', {
        href: 'https://www.w3schools.com/cssref/css_colors.asp',
        text: 'valid CSS Color.',
      })
    );

    new Setting(containerEl)
      .setName('Enable Theme Colors')
      .setDesc(
        'If your Obsidian Theme (or snippet) provides Colors you can use them instead.'
      )
      .addToggle((cb) => {
        cb.setValue(plugin.settings.themeable).onChange(async (value) => {
          plugin.settings.themeable = value;
          await plugin.saveSettings();
          this.display();
        });
      });

    if (!plugin.settings.themeable) {
      plugin.settings.colors.forEach((color, idx) => {
        const nameEl = document.createDocumentFragment();
        nameEl.createSpan({ text: '●', attr: { style: `color: ${color}` } });
        nameEl.appendText(` Color #${idx + 1}`);
        new Setting(containerEl)
          .setName(nameEl)
          .setDesc(
            'This will be the border Color used in the Charts you create.'
          )
          .addButton((btn) => {
            btn.setButtonText('Change Color');
            new Picker({
              parent: btn.buttonEl,
              onDone: async (color) => {
                this.plugin.settings.colors[idx] = color.hex;
                await this.plugin.saveSettings();
                this.display();
              },
              popup: 'left',
              color: color,
              alpha: false,
            });
          })
          .addExtraButton((btn) => {
            btn
              .setIcon('trash')
              .setTooltip('Remove')
              .onClick(async () => {
                this.plugin.settings.colors.remove(color);
                await this.plugin.saveSettings();
                this.display();
              });
            if (this.plugin.settings.colors.length === 1) {
              btn.setDisabled(true);
            }
          })
          .addExtraButton((btn) => {
            btn
              .setIcon('reset')
              .setTooltip('Reset to default')
              .onClick(async () => {
                this.plugin.settings.colors[idx] =
                  DEFAULT_SETTINGS.colors[idx] ?? '#ffffff';
                await this.plugin.saveSettings();
                this.display();
              });
          });
      });

      new Setting(containerEl).addButton((btn) => {
        btn.setButtonText('Add Color').onClick(async () => {
          this.plugin.settings.colors.push('#ffffff');
          await this.plugin.saveSettings();
          this.display();
        });
      });
    }

    containerEl.createEl('h3', { text: 'Chart to Image Converter' });

    const detailEl = containerEl.createEl('details');
    detailEl.createEl('summary', { text: 'How to use' });
    detailEl.createEl('img', {
      attr: {
        src: 'https://media.discordapp.net/attachments/855181471643861002/897811615037136966/charttoimage.gif',
      },
    });

    new Setting(containerEl)
      .setName('Image Format')
      .setDesc('The Format to be used, when generating a Image from a Chart.')
      .addDropdown((cb) => {
        cb.addOptions({
          'image/jpeg': 'jpeg',
          'image/png': 'png',
          'image/webp': 'webp',
        });
        cb.setValue(plugin.settings.imageSettings.format);
        cb.onChange(async (value) => {
          (plugin.settings.imageSettings.format as any) = value;
          await plugin.saveSettings();
        });
      });
    new Setting(containerEl)
      .setName('Image Quality')
      .setDesc('If using a lossy format, set the Image Quality.')
      .addSlider((cb) => {
        cb.setDynamicTooltip()
          .setLimits(0.01, 1, 0.01)
          .setValue(plugin.settings.imageSettings.quality)
          .onChange(async (value) => {
            plugin.settings.imageSettings.quality = value;
            await plugin.saveSettings();
          });
      });
  }
}
