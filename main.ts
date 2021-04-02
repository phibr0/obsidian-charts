import { MarkdownPostProcessor, MarkdownPostProcessorContext, MarkdownPreviewRenderer, Plugin } from 'obsidian';
import * as Chartist from 'chartist';
import * as Yaml from 'yaml';

export default class ChartPlugin extends Plugin {

	static postprocessor = async (content: string, el: HTMLElement, _: MarkdownPostProcessorContext) => {

		// Parse the Yaml content of the codeblock, if the labels or series is missing return too
		const yaml = await Yaml.parse(content)
		if (!yaml || !yaml.labels || !yaml.series) return
		console.log(yaml)

		//create the new element
		const destination = document.createElement('div')

		if (yaml.type.toLowerCase() === 'line') new Chartist.Line(destination, {
			labels: yaml.labels,
			series: yaml.series
		}, {
			lineSmooth: Chartist.Interpolation.cardinal({
				fillHoles: yaml.fillGaps ?? false,
			}),
			low: yaml.low,
			showArea: yaml.showArea ?? false,
		});
		else if (yaml.type.toLowerCase() === 'bar') new Chartist.Bar(destination, {
			labels: yaml.labels,
			series: yaml.series
		}, {
			low: yaml.low,
			stackBars: yaml.stacked ?? false,
			horizontalBars: yaml.horizontal ?? false
		});
		else if (yaml.type.toLowerCase() === 'pie') new Chartist.Pie(destination, {
			labels: yaml.labels,
			series: yaml.series
		}, {
			labelDirection: 'explode',
		});
		else return

		el.appendChild(destination)
		return
	}

	onload() {
		console.log('loading plugin: chartist');
		this.registerMarkdownCodeBlockProcessor('chart', ChartPlugin.postprocessor)
	}

	onunload() {
		console.log('unloading plugin: chartist');
	}

}
