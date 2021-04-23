import { App, MarkdownView, Modal } from "obsidian";
import type { ChartPluginSettings } from "../constants/settingsConstants";
import HelperModal from './HelperModal.svelte';

export class CreationHelperModal extends Modal {
	view: MarkdownView;
	settings: ChartPluginSettings;

	constructor(app: App, view: MarkdownView, settings: ChartPluginSettings) {
		super(app);
		this.settings = settings;
		this.view = view;
	}

	onOpen() {
		let { contentEl, view, settings} = this;
		contentEl.empty();
		const modal = new HelperModal({target: contentEl, props: {editor: view.editor, settings: settings}});
		modal.$on('close', () => this.close());
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}