import { App, MarkdownSourceView, MarkdownView, Modal } from "obsidian";

export class CreationHelperModal extends Modal {
	view: MarkdownView;
	constructor(app: App, view: MarkdownView) {
		super(app);
		this.view = view;
	}

	insertChart(editor: CodeMirror.Editor, type: string, labels: string, title: string, data: string, tension: number, width: number, labelColors: boolean, fill: boolean) {
		let doc = editor.getDoc();
		let cursor = doc.getCursor();

		let chart = `
\`\`\`chart
type: ${type}
labels: []
series:
  - title: ${title}
    data: []
tension: ${tension}
width: ${width}%
labelColors: ${labelColors}
fill: ${fill}
\`\`\`
		`;

		doc.replaceRange(chart, cursor);
	}

	onOpen() {
		let { contentEl, view, insertChart } = this;
		let editor = view.sourceMode.cmEditor;
		contentEl.empty();
		contentEl.createEl('h2', { text: 'Create a new Chart' });
		contentEl.innerHTML += `
		<label for="chart-types">Chart Type</label>
		<select name="Chart Types" id="chart-types" class="dropdown">
		  <option value="bar">Bar</option>
		  <option value="line">Line</option>
		  <option value="pie">Pie</option>
		  <option value="doughnut">Doughnut</option>
		  <option value="radar">Radar</option>
		  <option value="polarArea">Polar Area</option>
		</select><br>
		<label for="chart-tension">Tension</label><input type="range" min="0" max="100" value="50" class="slider" id="chart-tension"></div>
		<label for="chart-width">Width</label><input type="range" min="0" max="100" value="50" class="slider" id="chart-width"></div><br>
		<input type="checkbox" id="chart-fill" value="Fill" class="task-list-item-checkbox" style="width:16px; height:16px;"><label for="chart-fill">Fill</label>
		<input type="checkbox" id="chart-lc" value="LabelColors" class="task-list-item-checkbox" style="width:16px; height:16px;"><label for="chart-lc">Label Colors</label><br>
		`
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}