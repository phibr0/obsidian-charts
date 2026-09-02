---
name: obsidian-charts-reference
description: Create and configure Charts codeblocks in Obsidian notes.
version: 0.1.0
author: AlexRadch
license: AGPL-3.0
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [obsidian, charts, chartjs, visualization, dataview]
    related_skills: []
---

# Obsidian Charts Reference Skill

Creates interactive Chart.js charts inside Obsidian via `chart` codeblocks (phibr0/obsidian-charts). Covers block anatomy, all chart types, every documented modifier, table-linked charts, Dataview API, and theming. Does not cover Chart.js outside Obsidian or unlisted chart types — only what `docusaurus/docs` documents.

Source: `https://github.com/phibr0/obsidian-charts` `docusaurus/docs` (`*.md`, `*.mdx`) cloned to `.temp/obsidian-charts` (2026-09-02 snapshot). No README or code inference — docs only.

## When to Use

- Need to insert or fix a `chart` codeblock in an Obsidian vault note.
- Need to pick correct `type` and modifiers (`width`, `tension`, `beginAtZero`, etc.).
- Need to link a markdown table to a chart via block ID (`^table` + `id:`).
- Need to feed Dataview/DataviewJS data into a chart (`window.renderChart` or `dv.paragraph` with chart block).
- Need to convert a chart block to an image or theme colors via CSS variables.

Don't use for: generic web Chart.js apps, Obsidian Bases, or analytics outside Obsidian notes.

## Prerequisites

- Plugin installed. Preferred: Obsidian > Settings > Community plugins > Browse > search "Charts" > Install > Enable. Manual fallback: download latest release from `https://github.com/phibr0/obsidian-charts/releases/latest`, copy `manifest.json` + `main.js` to `<vault>/.obsidian/plugins/obsidian-charts`, reload Obsidian (`Ctrl+R`), enable in settings.
- Enable Community Plugins (disable Safe mode) before install.
- Dataview integration requires `Dataview` plugin and `dataviewjs` blocks (not `dataview`).
- Write target is a vault file under `kb/` — use `write_file` or `patch`, not `terminal` echo.

## Chart Block Anatomy

Every chart is a fenced block with language `chart` and YAML body:

````yaml
```chart
    type: bar
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
    series:
        - title: Title 1
          data: [1,2,3,4,5]
        - title: Title 2
          data: [5,4,3,2,1]
```
````

Rules:

- `type` and `labels` are top-level. `labels: []` defines X-axis/category labels.
- `series` is a list of datasets: each has `title:` (string, may be omitted but not advised) and `data:` (array of numbers/`null`). Multiple series render multiple traces.
- Indentation is YAML-sensitive — two spaces recommended. Copy-paste from rendered markdown can escape characters and break indentation; prefer `write_file` templates below.
- Graphical creator alternative: Command Palette > "Create Chart" (or hotkey) builds simple charts without hand-writing YAML.

## Quick Reference — Chart Types

| Type key | Doc file | Notes | Minimal block |
|---|---|---|---|
| `bar` | `Chart Types/Bar.mdx` | Vertical by default; see `indexAxis`, `stacked` | `type: bar` + `labels` + `series` |
| `line` | `Chart Types/Line.mdx` | Supports `fill`, `tension`, `spanGaps`, `bestFit` | `type: line` + `labels` + `series` |
| `pie` | `Chart Types/Doughnut.mdx` | Pie variant of doughnut | `type: pie` + `labels` + `series` + `width: 40%` + `labelColors: true` |
| `doughnut` | `Chart Types/Doughnut.mdx` | Same API as `pie` | `type: doughnut` + as above |
| `polarArea` | `Chart Types/Polar Area.mdx` | Prefer `width` + `labelColors` | `type: polarArea` + `labels` + `series` + `width: 40%` + `labelColors: true` |
| `radar` | `Chart Types/Radar.mdx` | Prefer `width` | `type: radar` + `labels` + `series` + `width: 40%` |
| `sankey` | `Chart Types/Sankey.mdx` | Node-flow, different `series` shape (see below) | `type: sankey` + `labels` + `series` with `data: [[from,val,to],...]` |

Index page `Chart Types/index.mdx` lists bar/line/radar/doughnut/pie/polarArea; Sankey is an extra documented type with its own page.

### Type Examples (from docs)

Bar:

````yaml
```chart
    type: bar
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday, Saturday, Sunday, "next Week", "next Month"]
    series:
        - title: Title 1
          data: [1,2,3,4,5,6,7,8,9]
        - title: Title 2
          data: [5,4,3,2,1,0,-1,-2,-3]
```
````

Line:

````yaml
```chart
    type: line
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
    series:
        - title: Title 1
          data: [1,2,3,4,5]
        - title: Title 2
          data: [5,4,3,2,1]
        - title: Title 3
          data: [8,2,5,-1,4]
```
````

Pie / Doughnut:

````yaml
```chart
    type: pie
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
    series:
        - title: Title 1
          data: [1,2,3,4,5]
        - title: Title 2
          data: [5,4,3,2,1]
    width: 40%
    labelColors: true
```
````

Replace `type: pie` with `type: doughnut` for doughnut variant.

PolarArea:

````yaml
```chart
type: polarArea
labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
series:
    - title: Title 1
      data: [1,2,3,4,5]
    - title: Title 2
      data: [5,4,3,2,1]
labelColors: true
width: 40%
```
````

Radar:

````yaml
```chart
    type: radar
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
    series:
        - title: Title 1
          data: [1,2,3,4,5]
        - title: Title 2
          data: [5,4,3,2,1]
    width: 40%
```
````

Sankey (node flow):

````yaml
```chart
type: sankey
labels: [Oil, "Natural Gas", Coal, "Fossil Fuel", Electricity, Energy]
series:
  - data:
      - [Oil, 15, "Fossil Fuels"]
      - ["Natural Gas", 20, "Fossil Fuels"]
      - ["Coal", 25, "Fossil Fuels"]
      - ["Coal", 25, "Electricity"]
      - ["Fossil Fuels", 60, "Energy"]
      - ["Electricity", 25, "Energy"]
    priority:
      Oil: 1
      Natural Gas: 2
      Coal: 3
      Fossil Fuels: 1
      Electricity: 2
      Energy: 1
    colorFrom:
      Oil: "black"
      Coal: "gray"
      "Fossil Fuels": "slategray"
      Electricity: "blue"
      Energy: "orange"
    colorTo:
      Oil: "black"
      Coal: "gray"
      "Fossil Fuels": "slategray"
      Electricity: "blue"
      Energy: "orange"
```
````

- `labels`: all node names.
- `series[0].data`: triplets `[from, value, to]`.
- Optional maps `priority`, `colorFrom`, `colorTo` keyed by label.

## Quick Reference — Modifiers

All modifiers are top-level keys in the `chart` block. From `Modifiers.mdx`.

| Modifier | Applies to | Expected | Default | Purpose |
|---|---|---|---|---|
| `width` | any | CSS value (`40%`, `400px`) | `100%` | Container width. Recommended for pie/doughnut/radar/polarArea. |
| `fill` | line | boolean | `false` | Fill area under line. |
| `bestFit` | line | boolean | `false` | Add linear best-fit line. |
| `bestFitTitle` | line + bestFit | string | `Line of Best Fit` | Title for best-fit line. |
| `bestFitNumber` | line + bestFit | integer (series index) | `0` | Which series to fit. |
| `spanGaps` | any (useful line) | boolean | `false` | Connect over `null` values. |
| `tension` | line | float 0–1 | `0` | Curve smoothness (0 straight, 1 max). |
| `beginAtZero` | any | boolean | `false` | Force Y at 0; overridden by `yMin`/`xMin`. |
| `legend` | any | boolean | `true` | Show legend. |
| `legendPosition` | any | `top`\|`left`\|`bottom`\|`right` | `top` | Legend placement. |
| `indexAxis` | bar, line | `x`\|`y` | `x` | `y` = horizontal bars. |
| `stacked` | bar, line | boolean | `false` | Stack datasets. |
| `xTitle` / `yTitle` | bar, line | string | — | Axis title. |
| `xReverse` / `yReverse` | bar, line | boolean | `false` | Reverse axis direction. |
| `xMin` / `xMax` / `yMin` / `yMax` / `rMax` | bar,line / radar,polarArea | int | — | Axis limits. `rMax` for radar/polarArea. `Min` overrides `beginAtZero`. |
| `xDisplay` / `yDisplay` | bar, line | boolean | `true` | Show axis line. |
| `xTickDisplay` / `yTickDisplay` | bar, line | boolean | `true` | Show axis ticks. |
| `time` | any (X with dates) | `day`\|`week`\|`month`\|`year`… | — | Auto-format date axis. |
| `transparency` | any | float 0.0–1.0 | `0.25` | Inner fill opacity. |
| `labelColors` | pie/doughnut/polarArea (docs use) | boolean | — (examples set `true`) | Color slices by label. |

Modifier examples from docs:

```yaml
# width
width: 40%
# fill + tension + bestFit
fill: true
tension: 0.5
bestFit: true
bestFitTitle: "Best Fit Title!"
bestFitNumber: 1
# gaps
spanGaps: true
# axes
beginAtZero: true
legend: false
indexAxis: y
stacked: true
xTitle: "Days"
yTitle: "Score"
xReverse: true
yMin: 0
yMax: 100
rMax: 10
xDisplay: false
yTickDisplay: false
time: month
transparency: 0.25
labelColors: true
```

## Procedure — Create or Fix a Chart Note

1. **Choose type and data** — pick from Quick Reference table; draft `labels` and `series` arrays. Completion: type key valid, arrays same length or sankey triplet shape satisfied.
2. **Write the block** — use `write_file` or `patch` to insert ````chart` YAML into `kb/notes/<name>.md` or `kb/journals/...`. Completion: file exists, block parses as YAML, no stray Markdown escaping.
3. **Add modifiers if needed** — set `width` for pie/doughnut/radar/polarArea, `tension`/`fill`/`beginAtZero` for line/bar. Completion: every modifier from request present with documented type, no invented keys.
4. **Verify in Obsidian** — open vault, note renders chart without YAML error banner; legend/axes behave as configured. Completion: chart visible, or error inspected and YAML fixed (indentation, missing comma, unquoted label with space).
5. **Optional: link table or Dataview** — if table-driven, add `id:`/`file:`/`layout:`/`select:` (next section); if Dataview, use `window.renderChart` pattern (Dataview Integration). Completion: linked source updates chart or DataviewJS renders without console error.

## Table-linked Charts

From `Chart from Table.mdx` (since 3.3.0):

1. Add block ID to table in markdown:
   ```md
   |       | Test1 | Test2 | Test3 |
   | ----- | ----- | ----- | ----- |
   | Data1 | 1     | 2     | 3.33  |
   | Data2 | 3     | 2     | 1     |
   | Data3 | 6.7   | 4     | 2     |
   ^table
   ```
2. Chart block with matching `id`:
   ````md
   ```chart
   type: bar
   id: table
   layout: rows
   width: 80%
   beginAtZero: true
   ```
   ````
3. Cross-file: add `file: <Filename>` (filename without path prefix as docs show).
4. `layout: rows` vs `layout: columns` chooses orientation.
5. Filter: `select: [Data2]` shows only that row (or selected columns for `columns` layout).

Replace-table command: select entire markdown table > Command Palette > "Create Chart from Table" > replaces table with chart block.

## Dataview Integration

From `Dataview Integration.mdx` — plugin exposes `window.renderChart(data, element)` when enabled. Payload is standard Chart.js `data` + `type`. Must use `dataviewjs`.

### Pattern A — `window.renderChart` with current-page data

````md
test:: First Test
mark:: 6

```dataviewjs
const data = dv.current()
const chartData = {
    type: 'bar',
    data: {
        labels: [data.test],
        datasets: [{
            label: 'Grades',
            data: [data.mark],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    }
}
window.renderChart(chartData, this.container);
```
````

### Pattern B — `dataviewjs` emitting a `chart` block (alternative)

````md
test:: First Test
mark:: 6

```dataviewjs
const data = dv.current()
dv.paragraph(`\`\`\`chart
    type: bar
    labels: [${data.test}]
    series:
    - title: Grades
      data: [${data.mark}]
\`\`\``)
```
````

### Pattern C — multi-page aggregation

```js
const pages = dv.pages('#test')
const testNames = pages.map(p => p.file.name).values
const testMarks = pages.map(p => p.mark).values
const chartData = {
    type: 'bar',
    data: {
        labels: testNames,
        datasets: [{
            label: 'Mark',
            data: testMarks,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        }]
    }
}
window.renderChart(chartData, this.container)
```

Docs note: `window.renderChart` payload is full Chart.js payload — any Chart.js option works beyond the simple examples.

## Advanced Chart — Raw Chart.js (scatter/bubble, numeric X, dual Y, annotations)

Plugin also supports ````advanced-chart` — raw Chart.js JSON, not `chart` YAML. Use when `chart` cannot express needed scale/logic (generic, not task-specific):

- **Numeric X** (honest distance, not equal categories): `scales.x: {type: "linear", min: 0, max: 100, title: {display:true, text:"..."}}` — points as `{"x": number, "y": number}`, not `labels: []`. `chart` with `labels: ["A","B"]` is categorical and distorts numeric gaps.
- **Dual Y** (third dimension on same chart): second scale `scales.y1: {type:"linear", position:"right", grid:{drawOnChartArea:false}, title:{display:true, text:"..."}}`, dataset binds via `"yAxisID": "y1"`.
- **Connected scatter**: `data.datasets[]: {type:"scatter", showLine:true, fill:false, tension:0.2, pointRadius:5, borderColor, backgroundColor}` — `showLine` turns points into line, `tension` curves, `borderDash:[6,3]` for dashed third dimension.
- **No auto palette**: `advanced-chart` does not auto-color — set `borderColor`/`backgroundColor` per dataset explicitly (e.g. `rgba(255,99,132,1)` / `0.2`), otherwise grey.
- **Annotations** (plugin `chartjs-plugin-annotation` bundled): `options.plugins.annotation.annotations: {"name": {"type":"line", "scaleID":"x", "value": number, "borderColor":"rgba(...,0.35)", "borderWidth":1, "borderDash":[4,4], "label":{"display":true,"content":"...","position":"start|end","yAdjust":14|-14}}}` — inspection: `main.js` has `annotation 21` but `datalabels 0`, so use `line` annotations, not `datalabels`. Alternate `position` + `yAdjust` to avoid overlap; `color` per line for matching palette.
- **When to use**: `chart` covers `bar/line/pie/doughnut/radar/polarArea/sankey`; `advanced-chart` when you need `scatter/bubble`, true numeric `x`, or `y1`/`annotation`.

Generic example (not bound to any model set):

````json
```advanced-chart
{
  "type": "scatter",
  "data": {"datasets": [
    {"label":"Series A","data":[{"x":0.1,"y":10},{"x":0.5,"y":20},{"x":1.2,"y":15}],"showLine":true,"fill":false,"tension":0.2,"pointRadius":5,"borderColor":"rgba(255,99,132,1)","backgroundColor":"rgba(255,99,132,0.2)"},
    {"label":"Right axis","data":[{"x":0.1,"y":30},{"x":0.5,"y":80},{"x":1.2,"y":50}],"showLine":true,"borderDash":[6,3],"yAxisID":"y1","borderColor":"rgba(75,192,192,1)","backgroundColor":"rgba(75,192,192,0.2)"}
  ]},
  "options":{"scales":{"x":{"type":"linear","min":0,"max":1.5,"title":{"display":true,"text":"X →"}},"y":{"title":{"display":true,"text":"Left →"}},"y1":{"type":"linear","position":"right","title":{"display":true,"text":"Right →"},"grid":{"drawOnChartArea":false}}},"plugins":{"annotation":{"annotations":{"line_1":{"type":"line","scaleID":"x","value":0.5,"borderColor":"rgba(120,120,120,0.35)","borderWidth":1,"borderDash":[4,4],"label":{"display":true,"content":"Marker","position":"start","yAdjust":14}}}}}}
}
```

## Customization & Utilities

**Colors — Settings vs CSS variables** (`Customization.md`):

- Settings: plugin settings expose color list to edit/add.
- Theming via CSS: enable Theming in plugin settings, then define variables:
  ```css
  :root {
      --chart-color-1: #ff00ff;
      --chart-color-x: rgb(255,255,255);
  }
  ```

**Convert chart to image** (`Convert Charts to Images.md`):

- Select entire `chart` codeblock in editor > Command Palette > "Create image from Chart" > replaces block with rendered image. Quality/format chosen in plugin settings.

**Graphical Chart Creator** (`Basic Usage.mdx`):

- Command Palette > "Create Chart" (or assign hotkey) opens GUI for simple charts — avoids hand-writing YAML.

**More Resources** (`More Resources.md`):

- `Mulfok's Periodic Note Templates` — `https://github.com/mulfok/periodic-note-templates` (community examples). Contributions via docs edit button.

## Pitfalls

- **YAML indentation is fragile.** Use two-space indent under `series:` and `data:`. Pasted examples often arrive with Markdown-escaped characters or wrong indent — rewrite via `write_file` instead of pasting rendered text.
- **`labelColors` + `width` for circular charts.** Without `width: 40%` pie/doughnut/radar/polarArea render huge; `labelColors: true` is usually desired for those types per docs.
- **`labels` with spaces or special chars must be quoted.** Example: `"next Week"`, `"Natural Gas"`, `"Fossil Fuel"` — unquoted labels break YAML.
- **`beginAtZero` vs `yMin`.** Setting `yMin`/`xMin` overrides `beginAtZero`; don't set both expecting additive behavior.
- **`bestFit*` only with `bestFit: true`.** `bestFitTitle`/`bestFitNumber` alone do nothing.
- **`time` requires date-like labels.** String `"2026-01-01"` works; plain `"Monday"` does not gain formatting.
- **`spanGaps` only matters with `null` in `data`.** No effect if data has no gaps.
- **Table linking needs matching block ID and `layout`.** Forget `layout: rows|columns` or mistype `id` (without `^`) and chart stays empty. Cross-file also needs `file:`.
- **Dataview must be `dataviewjs`.** Plain `dataview` blocks cannot call `window.renderChart`; docs caution explicitly.
- **`transparency` is 0.0–1.0.** Values outside clamp; docs default `0.25`.
- **`indexAxis`/`stacked`/`xTitle` etc. only for `bar`/`line`.** No effect on pie/doughnut/radar/polarArea/sankey.
- **Sankey `labels` must enumerate every node** appearing in `data` triplets; `priority`/`colorFrom`/`colorTo` keys must match label strings exactly (quoted if they contain spaces).

## Verification

- `read_file` on created note shows a single ````chart` block with valid YAML and no stray escaping.
- Obsidian preview renders chart; browser console (if debugging Dataview) shows no `renderChart is not a function` — means Charts plugin disabled or `dataviewjs` typed incorrectly.
- Table-linked chart updates when source table cells change (and respects `select` filter if set).
- `width`/`legend`/`tension` etc. changes visually reflected after save (width shrinks circular charts, legend disappears when `legend: false`).
- CSS variable override: define `--chart-color-1` in snippet, reload, chart palette changes (theming enabled).
- Image conversion: after "Create image from Chart" command, block replaced by `![...](...)` image link; settings control format/quality.
