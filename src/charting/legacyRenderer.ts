function legacyRenderer(yaml: any, el: HTMLElement) {
    const destination = document.createElement('div');

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
    else return;

    el.appendChild(destination);
    return;
}