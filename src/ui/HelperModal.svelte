<script lang="ts" defer>
  import { debounce, parseYaml } from 'obsidian';
  import { createEventDispatcher } from 'svelte';
  import { renderChart } from '../charting/chartRenderer'
  import type { ChartPluginSettings } from "../constants/settingsConstants";

  export let editor: CodeMirror.Editor;
  export let settings: ChartPluginSettings;

  const dispatch = createEventDispatcher();

	let chartType: string = 'bar'
  let tension: number = 20;
  let width: number = 80;
  let fill: boolean = false;
  let labelColors: boolean = false;
  let labels: string = "";
  let dataTitle: string = "";
  let data: string = "";
  let chart: string ;
  let previewElement: HTMLDivElement = null;
  const debouncedRenderChart = debounce((yaml: any, el: HTMLElement, settings: ChartPluginSettings) => renderChart(yaml, el, settings), 100, true);

  $: chart = `type: ${chartType}
labels: [${labels}]
series:
  - title: ${dataTitle}
    data: [${data}]
tension: ${tension/100}
width: ${width}%
labelColors: ${labelColors}
fill: ${fill}`;

  $: {
    if(previewElement){
      try {
        debouncedRenderChart(parseYaml(chart), previewElement, settings);
        
      } catch (error) {
        previewElement.innerHTML = "<p>Couldn't preview Chart:</p><br><code style=\"color:crimson\">" + error + "</code>";
      }
    }
  }

  function insertChart() {
		let doc = editor.getDoc();
		let cursor = doc.getCursor();

		doc.replaceRange('```chart\n' + chart + '\n```', cursor);
    dispatch('close');
	}
</script>

<style>
  .subDesc{
    font-size: smaller;
    opacity: 0.5;
    margin: 0;
  }
  .desc{
    padding-right: 1em;
  }
  .mainDesc{
    margin: 0;
  }
  table{
    margin: auto;
  }
  .controlElement{
    text-align: center;
  }
  .chart-modal{
    max-height: 80vh;
    overflow-y: auto;
  }
  .modalColumn{
    display: flex;
    gap: 2em;
  }
  .chartPreview{
    width: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="chart-modal">
<h3>Create a new Chart</h3>
<div class="modalColumn">
      <div>
        <table style="width:100%">
          <tr>
            <td class="desc"><p class="mainDesc">Chart Type</p><p class="subDesc">Choose a Chart Type</p></td><td class="controlElement"><select name="Chart Types" id="chart-types" class="dropdown" bind:value={chartType}>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
              <option value="doughnut">Doughnut</option>
              <option value="radar">Radar</option>
              <option value="polarArea">Polar Area</option>
            </select></td>
          </tr>
          <tr>
            <td class="desc"><p class="mainDesc">Smoothness</p><p class="subDesc">Changes the smoothness of the Chart</p></td><td class="controlElement"><input type="range" min="0" max="100" class="slider" bind:value={tension}></td>
          </tr>
          <tr>
            <td class="desc"><p class="mainDesc">Width</p><p class="subDesc">Changes the horizontal width</p></td><td class="controlElement"><input type="range" min="20" max="100" class="slider" bind:value={width}></td>
          </tr>
          <tr>
            <td class="desc"><p class="mainDesc">Fill</p><p class="subDesc">Fill the underside of the Chart</p></td><td class="controlElement"><input type=checkbox class="task-list-item-checkbox" style="width: 16px; height: 16px" bind:checked={fill}></td>
          </tr>
          <tr>
            <td class="desc"><p class="mainDesc">Distinct Colors</p><p class="subDesc">Use distinct Colors for each Label</p></td><td class="controlElement"><input type=checkbox class="task-list-item-checkbox" style="width: 16px; height: 16px" bind:checked={labelColors}></td>
          </tr>
        </table>
        <hr>
        <table style="width:100%">
          <tr>
            <td class="desc"><p class="mainDesc">X Axis</p><p class="subDesc">Set Labels (Comma seperated)</p></td>
            <td class="controlElement">
              <input type="text" placeholder="Monday, Tuesday, ..." bind:value={labels}><br>
            </td>
          </tr>
        </table>
        <hr>
        <table style="width:100%">
          <tr>
            <td class="desc"><p class="mainDesc">Y Axis</p><p class="subDesc">Set Data Fields (Comma seperated)</p></td>
            <td class="controlElement">
              <input type="text" placeholder="Name" bind:value={dataTitle}>
              <br>
              <input type="text" placeholder="1, -2, 11, 5" style="margin-top: 3px;" bind:value={data}>
            </td>
          </tr>
        </table>
      </div>
      <div class="chartPreview">
        <div id="preview" bind:this={previewElement}></div>
      </div>
    </div>
  <div>
  <hr>
  <details>
    <summary>Advanced</summary>
    <pre>
      <code>{chart}</code>
    </pre>
  </details>
  </div>
</div>
<div style="display: flex; justify-content: center; align-items: center;">
  <button class="mod-cta" on:click={insertChart}>Insert Chart</button>
</div>

