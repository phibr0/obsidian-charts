import { App, MarkdownView, Modal } from "obsidian";
import HelperModal from './HelperModal.svelte';

export class CreationHelperModal extends Modal {
	view: MarkdownView;
	constructor(app: App, view: MarkdownView) {
		super(app);
		this.view = view;
	}

	onOpen() {
		let { contentEl, view } = this;
		let editor = view.sourceMode.cmEditor;
		contentEl.empty();
		const modal = new HelperModal({target: contentEl, props: {editor: editor}});
		modal.$on('close', () => this.close());
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}