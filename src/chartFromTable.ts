import { Editor, Notice } from 'obsidian';
import { Extractor } from "markdown-tables-to-json";
import type { DataField } from 'src/constants/settingsConstants';

export async function chartFromTable(editor: Editor, layout: 'columns' | 'rows') {
    let fields: any;
    try {
        fields = Extractor.extractObject(editor.getSelection(), layout, false);
    } catch (error) {
        new Notice('Table malformed')
        throw error;
    }
    const labels = Object.keys(Object.values(fields)[0]);
    const dataFields: DataField[] = Object.keys(fields).map((key) => {
        return {
            dataTitle: key,
            data: Object.values(fields[key]).join(','),
        }
    });
    const chart = `\`\`\`chart
type: bar
labels: [${labels}]
series:
${dataFields
    .map((data) => `  - title: ${data.dataTitle}\n    data: [${data.data}]`)
    .join("\n")}
width: 80%
beginAtZero: true
\`\`\``;

    editor.replaceSelection(chart);
}