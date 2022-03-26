import { Editor, Notice } from 'obsidian';
import { Extractor } from "markdown-tables-to-json";
import type { DataField } from 'src/constants/settingsConstants';

export async function chartFromTable(editor: Editor, layout: 'columns' | 'rows') {
    const {labels, dataFields} = generateTableData(editor.getSelection(), layout);
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

export function generateTableData(table: string, layout: 'columns' | 'rows', selected?: string[]) {
    let fields: any;
    try {
        fields = Extractor.extractObject(table, layout, false);
    } catch (error) {
        new Notice('Table malformed')
        throw error;
    }
    const labels = Object.keys(Object.values(fields)[0]);
    let dataFields: DataField[] = Object.keys(fields).map((key) => {
        return {
            dataTitle: key,
            data: Object.values(fields[key]) as string[]
        }
    });

    if(selected) {
        dataFields = dataFields.filter(value => selected.contains(value.dataTitle));
    }

    return {labels, dataFields};
}