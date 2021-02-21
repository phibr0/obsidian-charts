import {MarkdownPostProcessor, MarkdownPostProcessorContext, MarkdownPreviewRenderer, Plugin} from 'obsidian';
import * as Chartist from 'chartist';
import * as Yaml from 'yaml';

export default class PlotPlugin extends Plugin {

	static postprocessor: MarkdownPostProcessor = (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		// Assumption: One section always contains only the code block

		//Which Block should be replaced? -> Codeblocks
		const blockToReplace = el.querySelector('pre')
		if (!blockToReplace) return

		//Only Codeblocks with the Language "chart" should be replaced
		const plotBlock = blockToReplace.querySelector('code.language-chart')
		if (!plotBlock) return

		// Parse the Yaml content of the codeblock, if the labels or series is missing return too
		const yaml = Yaml.parse(plotBlock.textContent)
		if (!yaml || !yaml.labels || !yaml.series) return
		console.log(yaml)

		//create the new element
		const destination = document.createElement('div')

		if (yaml.type === 'line') new Chartist.Line(destination, {
			labels: yaml.labels,
			series: yaml.series
		}, {
			lineSmooth: Chartist.Interpolation.cardinal({
				fillHoles: yaml.fillGaps ?? false,
			  }),
			  low: yaml.low,
			  showArea: yaml.showArea ?? false
		});
		else if (yaml.type === 'bar') new Chartist.Bar(destination, {
			labels: yaml.labels,
			series: yaml.series
		}, {		
			  low: yaml.low,
			  stackBars: yaml.stacked ?? false,
			  horizontalBars: yaml.horizontal ?? false
		});
		else return

		el.replaceChild(destination, blockToReplace)
	}

	onload() {
		console.log('loading plugin: chartist');
		MarkdownPreviewRenderer.registerPostProcessor(PlotPlugin.postprocessor)
	}

	onunload() {
		console.log('unloading plugin: chartist');
		MarkdownPreviewRenderer.unregisterPostProcessor(PlotPlugin.postprocessor)
	}

}
