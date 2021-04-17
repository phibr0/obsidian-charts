<script lang="ts">
import type { parse } from 'node:path';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let editor: CodeMirror.Editor;

	let chartType: string = 'bar'
  let tension: number = 20;
  let width: number = 80;
  let fill: boolean = false;
  let labelColors: boolean = false;
  let labels: string = "";
  let dataTitle: string = "";
  let data: string = "";

  function insertChart() {
		let doc = editor.getDoc();
		let cursor = doc.getCursor();

		let chart = `\`\`\`chart
type: ${chartType}
labels: [${labels}]
series:
  - title: ${dataTitle}
    data: [${data}]
tension: ${tension/100}
width: ${width}%
labelColors: ${labelColors}
fill: ${fill}
\`\`\``;

		doc.replaceRange(chart, cursor);
    dispatch('close');
	}
</script>

<style>
  .subDesc{
    font-size: smaller;
    opacity: 0.5;
    margin: 0;
  }
  .settings table{
    text-align: left;
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
  /* .overflowbox{
    width: fit-content;
    overflow: auto;
    max-height: 6rem;
  } */
</style>

<div>
<h3>Create a new Chart</h3>
      <div class="settings">
        <!-- svelte-ignore component-name-lowercase -->
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
            <td class="desc"><p class="mainDesc">Tension</p><p class="subDesc">Changes the smoothness of the Chart</p></td><td class="controlElement"><input type="range" min="0" max="100" class="slider" bind:value={tension}></td>
          </tr>
          <tr>
            <td class="desc"><p class="mainDesc">Width</p><p class="subDesc">Changes the horizontal width</p></td><td class="controlElement"><input type="range" min="0" max="100" class="slider" bind:value={width}></td>
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
  <hr>
  <!-- <details>
    <summary>Advanced</summary>
    <textarea></textarea>
  </details> -->
  <div style="display: flex; justify-content: center; align-items: center;"><button class="mod-cta" on:click={insertChart}>Insert Chart</button></div>
</div>