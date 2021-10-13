import { App, MarkdownView, Modal } from "obsidian";
import type Renderer from "../chartRenderer"
import type { ChartPluginSettings } from "../constants/settingsConstants";
import HelperModal from './HelperModal.svelte';

export class CreationHelperModal extends Modal {
	view: MarkdownView;
	settings: ChartPluginSettings;
	renderer: Renderer;

	constructor(app: App, view: MarkdownView, settings: ChartPluginSettings, renderer: Renderer) {
		super(app);
		this.settings = settings;
		this.view = view;
		this.renderer = renderer;
	}

	onOpen() {
		let { contentEl, view, settings, renderer} = this;
		contentEl.empty();
		const modal = new HelperModal({target: contentEl, props: {editor: view.editor, renderer}});
		modal.$on('close', () => this.close());
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}