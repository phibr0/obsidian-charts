# Obsidian-Charts [![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/phibr0/obsidian-charts)](https://github.com/phibr0/obsidian-charts/releases) [![Release Obsidian Plugin](https://github.com/phibr0/obsidian-charts/actions/workflows/release.yml/badge.svg)](https://github.com/phibr0/obsidian-charts/actions/workflows/release.yml) ![GitHub all releases](https://img.shields.io/github/downloads/phibr0/obsidian-charts/total)

This Plugin lets you create interactive Charts in [Obsidian](https://www.obsidian.md).

**[Documentation](charts.phibr0.de)**

## Usage

To create a Chart within Obsidian a Codeblock of the type `chart` is used. The Properties are set using YAML Syntax. Example:

```yaml
    ```chart
        type: ""
        labels: []
        series:
          - title: ""
            data: []
          - title: ""
            data: []

    ```
```

The `title` Property _can_ be omitted, but it is not advised to do so.

> You might **not** be able to copy the Examples directly into Obsidian, the Indentation is probably wrong and Obsidian tries to convert pasted Text to Markdown, which escapes a few important characters.

### Graphical Chart Creator

For simple Charts you can use the graphical Chart Creator, you can access it via the Command Palette or you can even set a Hotkey!

<details><summary>See it in Action!</summary><img src="https://cdn.buymeacoffee.com/uploads/project_updates/2021/04/b913e0cec14e6bad57ef0757ce29d288.gif"></details>

### Chart from Table

You can select a whole Markdown-Table and run the Command "Create Chart from Table" to replace it with a Chart.

<details>
<summary>See how it works</summary>
<img src="https://media.discordapp.net/attachments/855181471643861002/897811518022909982/tabletochart.gif" referrerpolicy="no-referrer">
</details>

### Chart Types

This Plugin provides 6 different Variants. The type of a Chart is set by the `type: {Type}` Property.

#### Line Chart

```yaml
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
```

The above example Code will render a _Line Chart_ with 3 individual traces, titled "Title 1", "Title 2" and "Title 3".

![Line Chart Example Image](images/linechart.png)

_See also: [Modifiers](#Modifiers)_

#### Bar Chart

```yaml
    ```chart
        type: bar
        labels: [Monday,Tuesday,Wednesday,Thursday,Friday, Saturday, Sunday, "next Week", "next Month"]
        series:
          - title: Title 1
            data: [1,2,3,4,5,6,7,8,9]
          - title: Title 2
            data: [5,4,3,2,1,0,-1,-2,-3]
    ```
```

The above example Code will render a _Bar Chart_.

![Bar Chart Example Image](images/barchart.png)

#### Radar Chart

```yaml
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
```

The above example Code will render a _Radar Chart_, a `width` Modifier is already added, since this Chart would be way to big otherwise.

![Radar Chart Example Image](images/radarchart.png)

#### Doughnut and Pie Chart

```yaml
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
```

The above example Code will render a _Pie Chart_, a `width` Modifier is already added, since this Chart would be way to big otherwise. The Property `labelColors` is also set to `true`, which is the desired behaviour most of the time.

![Pie Chart Example Image](images/piechart.png)

```yaml
    ```chart
        type: doughnut
        labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
        series:
          - title: Title 1
            data: [1,2,3,4,5]
          - title: Title 2
            data: [5,4,3,2,1]
        width: 40%
        labelColors: true
    ```
```

The above example Code will render a _Doughnut Chart_, a `width` Modifier is already added, since this Chart would be way to big otherwise. The Property `labelColors` is also set to `true`, which is the desired behaviour most of the time.

![Doughnut Chart Example Image](images/doughnutchart.png)

#### Polar Area Chart

```yaml
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
```

The above example Code will render a _Polar Area Chart_, a `width` Modifier is already added, since this Chart would be way to big otherwise. The Property `labelColors` is also set to `true`, which is the desired behaviour most of the time.

![Polar Area Chart Example Image](images/polarareachart.png)

### Modifiers

#### `width` Modifier

The `width` Modifier is used to set the width of **any** Chart. It is advised to use it for the following Charts:

- Pie Chart
- Doughnut Chart
- Radar Chart
- Polar Area Chart

The Values can be any valid CSS Property, for examples fixed Values (e.g. `400px`) or dynamic Values (e.g `40%`).

- Default: `100%`

##### Example

```yaml
    ```chart
    type: polarArea
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
    series:
      - title: Title 1
        data: [1,2,3,4,5]
      - title: Title 2
        data: [5,4,3,2,1]
    width: 40%
    ```
```

#### `fill` Modifier

The `fill` Modifier is used in Line Charts to fill the Area under the Traces.

- Expected: `boolean` (`true` or `false`)
- Default: `false`

##### Example

```yaml
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
        fill: true
    ```
```

#### `spanGaps` Modifier

The `spanGaps` Modifier is used to fill in missing Datapoints.

- Expected: `boolean` (`true` or `false`)
- Default: `false`

##### Example

```yaml
    ```chart
        type: line
        labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
        series:
          - title: Title 1
            data: [1,2,null,4,5]
          - title: Title 2
            data: [5,null,null,null,1]
          - title: Title 3
            data: [8,2,5,-1,4]
        spanGaps: true
    ```
```

#### `tension` Modifier

The `tension` Modifier is used in Line Charts to set the tension of the Traces to the given points. A Value of 0 means no smoothness at all, a value of 1 is maximum smoothness.

- Expected: Double (0-1)
- Default: 0

##### Example

```yaml
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
        tension: 0.5
    ```
```

#### `beginAtZero` Modifier

The `beginAtZero` Modifier is used to force set the Chart to begin at 0. Otherwise the Chart will cut out all unused space.

- Expected: `boolean` (`true` or `false`)
- Default: `false`

##### Example

```yaml
    ```chart
        type: line
        labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
        series:
          - title: Title 1
            data: [4,2,3,4,5]
          - title: Title 2
            data: [5,4,3,2,2]
          - title: Title 3
            data: [8,2,5,3,4]
        beginAtZero: true
    ```
```

#### `legend` Modifier

The `legend` modifier sets whether or not the legend will be displayed. 

- Expected: `boolean` (`true` or `false`)
- Default: `true`

##### Example 

```yaml
    ```chart
        type: line
        labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
        series:
          - title: Title 1
            data: [4,2,3,4,5]
          - title: Title 2
            data: [5,4,3,2,2]
          - title: Title 3
            data: [8,2,5,3,4]
        legend: false
    ```
```

#### `legendPosition` Modifier

Determines where the legend will be displayed.

- Expected `top`, `left`, `bottom`, `right`
- Default: `top`

#### Axes Modifiers

Valid for `bar` and `line` types only. 

##### `indexAxis` Modifier

Allows horizontal graphs.

- Expected: `x` or `y`
- Default: `x`

##### `stacked` Modifier

Will change the bar and line graphs to be stacked.

- Expected: `boolean` (`true` or `false`)
- Default: `false`

##### Modifiers by Axis

Prepend either the x or y axis to any of these to modify them. 

###### `Title` Modifier

Use either `xTitle: "Title here"` or `yTitle: "Title here"` to add a Title to any Axis. 

###### `Reverse` Modifier 

Can reverse the axis it is applied to 

- Expected: `boolean` (`true` or `false`) 
- Default: `false`

```yaml
    ```chart
        type: line
        labels: [Monday,Tuesday,Wednesday,Thursday,Friday]
        series:
          - title: Title 1
            data: [4,2,3,4,5]
          - title: Title 2
            data: [5,4,3,2,2]
          - title: Title 3
            data: [8,2,5,3,4]
        xReverse: true
    ```
```

##### `Min` and `Max` Modifiers

Can set the min and max of the respecitve axis. `Min` will override beginAtZero. 
Use `rMax` to set the max for radar and polar area charts.

- Expected: `int` 

##### `Display` and `TickDisplay` Modifiers

Determines whether the axis (`Display`) or the ticks of the axis (`TickDisplay`) are visible.

- Expected: `boolean` (`true` or `false`)
- Default: `true`

## Customization

### Changing Colors

You can add and edit Colors in the Settings of this Plugin **or** use CSS Variables to style your Chart!

To use CSS Variables, turn on Theming in this plugin's settings and add variables like so:

```css
:root {
    --chart-color-1: #ff00ff;
    --chart-color-x: rgb(255,255,255);
}
```

### Interactivity

**All** Charts are interactive.

- You can click the different Graphs inside the Legend to make them dissappear (and reappear)
- You can hover over the Chart to see more detailed information

## API (Dataview, etc.)

If you want to use this Plugin in combination with Plugins like Dataview, I recommend using the API. When this Plugin is enabled, you can render a Chart using the following:

```js
window.renderChart(data, element);
```

This is a full Example:

```md
test:: First Test
mark:: 6

\```dataviewjs
const data = dv.current()

const chartData = {
    type: 'bar',
    data: {
        labels: [data.test],
        datasets: [{
            label: 'Grades',
            data: [data.mark],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    }
}

window.renderChart(chartData, this.container);
\```
```

The data is the standard [Chart.js](https://www.chartjs.org/docs/latest/) data payload, you can use everything it supports in there.

**Please note, that you have to use dataviewjs for this!**

## Convert Charts to Images

Select the whole Chart Codeblock and run the Command "Create image from Chart" to replace it with a Image. You can choose the Quality and Format in the Settings of this Plugin.

<details>
<summary>See how it works</summary>
<img src="https://media.discordapp.net/attachments/855181471643861002/897811615037136966/charttoimage.gif" referrerpolicy="no-referrer">
</details>

## How to install

1. Go to **Community Plugins** in your [Obsidian](https://www.obsidian.md) Settings and **disable** Safe Mode
2. Click on **Browse** and search for "Obsidian Charts"
3. Click install
4. Toggle the Plugin on in the **Community Plugins** Tab

## Support me

If you find this Plugin helpful, consider supporting me:

<a href="https://www.buymeacoffee.com/phibr0"><img src="https://img.buymeacoffee.com/button-api/?slug=phibr0&font_family=Inter&button_colour=FFDD00"></a>
