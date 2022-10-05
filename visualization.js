const leftbox = parseInt(localStorage.getItem('left'))
const rightbox = parseInt(localStorage.getItem('right'))
const upbox = parseInt(localStorage.getItem('up'))
const downbox = parseInt(localStorage.getItem('down'))

console.log(leftbox)
console.log(rightbox)
console.log(upbox)
console.log(downbox)


// data describing the points awarded at each round to f1 drivers in the 2007 championship (in alphabetical order)
// the idea is to scale the visualization one round at a time, describing in the svg only the top ten scorers
const data = [
    {
        name: 'Press Left',
        points: [leftbox],
    },
    {
        name: 'Press Right',
        points: [rightbox],
    },
    {
        name: 'Press Up',
        points: [upbox],
    },
    {
        name: 'Press Down',
        points: [downbox],
    },
];


// target the prescribed root node and add an svg element
const margin = {
    top: 20,
    right: 20,
    bottom: 25,
    left: 100, // add more white space on the left side of the visualization to display the rider's names
};

const width = 800 - (margin.left + margin.right);
const height = 550 - (margin.top + margin.bottom);

const svg = d3
    .select('.viz')
    .append('svg')
    .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`);

// include a clip to crop the shapes when they move outside of the group element
const clipPath = svg
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip');

clipPath
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height);

const group = svg
    .append('g')
    .attr('transform', `translate(${margin.left} ${margin.top})`);

// include a group in which to include the rectangles
// clip the group to crop the rectangles as they move outside of the clip
const racers = group
    .append('g')
    .attr('clip-path', 'url(#clip)');

// describe a quantitative scale for the x axis, for the racers' points
// ! include the domain when the data is bound, and the axis relates the maximum number of points which can be awarded (a multiple of maxPoints)
const maxPoints = d3.max(data, ({ points }) => d3.max(points));
const xScale = d3
    .scaleLinear()
    .range([0, width])
    .nice();

// describe a qualitative scale for the y axis, for the racers' names
// ! include the domain when the data is bound, and the axis shows the name of the top ten scorers only
const yScale = d3
    .scaleBand()
    .range([0, height])
    // padding allows to separate the shapes making use of the scale and the value returned by the yScale.bandwidth() function
    // 0.3 means 0% is dedicated to white space around the band
    .padding(0.3);

// add axes describing the values
const xAxis = d3
    .axisBottom(xScale)
    .ticks(6)
    // show only multiples of 10
    .tickFormat(d => (d % 10 === 0 && d > 0 ? d : ''));

const yAxis = d3
    .axisLeft(yScale)
// show only the last name
// .tickFormat(d => d.split(' ')[1]);

group
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', `translate(0 ${height})`)
// .call(xAxis);

group
    .append('g')
    .attr('class', 'axis y-axis')
// .call(yAxis);


// function called recursively to update the visualization
// use the update-enter-exit loop to plot the bar charts, update their position and remove them if necessary
function updateChampionship(round = 1) {
    const duration = 2000;

    // compute a subset of the data considering the top ten scorers at the specified round
    const partialData = data
        .map(({ name, points }) => ({
            name,
            // compute the total number of points up to the prescribed round
            points: points.slice(0, round).reduce((acc, curr) => acc + curr, 0),
        }))
        .sort(({ points: pointsA }, { points: pointsB }) => d3.descending(pointsA, pointsB))
        // consider only the first ten racers (in the first round this includes two racers with 0 points, as points in 2007 were awarded to the first eight only)
        .slice(0, 10);

    // update the domain of the scales to consider the maximum number of point and the top ten racers
    xScale
        .domain([0, maxPoints * round]);

    yScale
        .domain(partialData.map(({ name }) => name));

    // update the axes to show the maximum number of points and racers' names
    xAxis
        .scale(xScale);

    d3
        .select('.x-axis')
        .transition()
        .ease(d3.easeLinear)
        .duration(duration)
        .call(xAxis);

    yAxis
        .scale(yScale);

    d3
        .select('.y-axis')
        .transition()
        .ease(d3.easeLinear)
        .duration(duration)
        .call(yAxis);

    // add one group element for each data point in the mapped/sorted/sliced array
    // update selection
    const update = racers
        .selectAll('g.racer')
        .data(partialData, ({ name }) => name);

    // enter selection
    const enter = update
        .enter();

    // exit selection
    const exit = update
        .exit();

    // for the new elements add a group element
    const enterGroup = enter
        .append('g')
        .attr('class', 'racer')
        // translate the group vertically according to the racer's name
        .attr('transform', ({ name }) => `translate(0 ${yScale(name)})`);

    // in the newly created group add a rectangle
    // set the shape's width according to the racer's points
    enterGroup
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', yScale.bandwidth())
        .attr('fill', 'currentColor')
        // transition the car into view
        .transition()
        .ease(d3.easeLinear)
        .duration(duration)
        .attr('width', ({ points }) => xScale(points));

    // for the existing elements update the translation of the group
    update
        .transition()
        .ease(d3.easeLinear)
        .duration(duration)
        .attr('transform', ({ name }) => `translate(0 ${yScale(name)})`);

    // update the size of the nested rectangle to match the new tally
    update
        .select('rect')
        .transition()
        .ease(d3.easeLinear)
        .duration(duration)
        .attr('width', ({ points }) => xScale(points));

    // for the no-longer-existing elements remove the selection after translating the elements below the x axis
    exit
        .transition()
        .ease(d3.easeLinear)
        .duration(duration)
        .attr('transform', `translate(0 ${height})`)
        .remove();

    // after a timeout equal to the duration of the different transitions call the function for the subsequent round
    // ! if such round exist
    if (data[0].points[round] !== undefined) {
        const timeoutID = setTimeout(() => {
            updateChampionship(round + 1);
            clearTimeout(timeoutID);
        }, duration);
    }
}

// immediately call the function to trigger the visualization
updateChampionship();
