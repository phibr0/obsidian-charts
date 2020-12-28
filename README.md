# Obsidian-Charts

This Plugin lets you create Line and Bar Charts in Obsidian

## Usage

To create a Chart simply create a fenced Codeblock using 'chart' as the language. Inside of it you need to specify the `labels` (X-Axis), the `series` (Y-Axis / Data) and the `type`, either bar or line, in valid YAML.

**`series` always needs to be a nested list even if you only need one!**

### Examples

```yaml
    ```chart
    type: bar
    labels: [Monday, Tuesday, Wednesday, Thursday, Friday]
    series: [[12, 5, 8, 8 , 5], [5, 8, 7, 9, 12]]
    ```
```
![Barchart](https://raw.githubusercontent.com/phibr0/obsidian-charts/master/images/barChart.png)

```yaml
    ```chart
    type: line
    labels: [Monday, Tuesday, Wednesday, Thursday, Friday]
    series: [[12, 5, 8, 8 , 5], [5, 8, 7, 9, 12]]
    ```
```
![Linechart](https://raw.githubusercontent.com/phibr0/obsidian-charts/master/images/lineChart.png)
## Modificators

You can omit Data by typing for example 'null'. This will create a Gap inside the Chart.

```yaml
    ```chart
    type: line
    labels: [Monday, Tuesday, Wednesday, Thursday, Friday]
    series: [[12, 5, null, 8 , 5], [null, 8, 7, 9, 12]]
    ```
```

![Linechart with Gaps](https://raw.githubusercontent.com/phibr0/obsidian-charts/master/images/lineChartGap.png)

- To fill these Gaps you can add the Modifier `fillGaps: true`.
- To show the Area under the Line you can add the Modifier `showArea: true`
- To cut some Area under the Chart you can add the Modifier `low: n`, while n represents the y value (works with both Line and Bar Chart)

__Full example:__

```yaml
    ```chart
    type: line
    labels: [Monday, Tuesday, Simon, Thursday, Friday]
    series: [[12, 6, null, null, 5], [6, 8, 7, 9, 12]]
    low: 5
    fillGaps: true
    showArea: true
    ```
```
## Roadmap

- [ ] Animations
- [ ] Create Chart from Table
- [ ] Change Colors (Settings Page)
- [ ] Autoresize
- [x] More Modificators (Area under Line, Fill Gaps, etc.)
