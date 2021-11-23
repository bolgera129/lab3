var selectedCity;

function create_scatter(euro_cities){
	d3.select('.city-count').text(euro_cities.length)
	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')		
		.append('svg')
    	.attr('width', width)
    	.attr('height', height)
	svg
		.selectAll("circle")
		.data(euro_cities)
		.enter()
		.append("circle")
		.attr('cx', function(d) { return d.x; })
		.attr('cy', function(d) { return d.y; })
		.attr('r', function(d) { return d.population  > 1000000 ? 8 : 4})
		.attr("fill", function(d) {return "#3274ad"})


	svg
		.selectAll("text")
		.data(euro_cities)
		.enter()
		.append("text")
		.attr("text-anchor", "middle")
		.attr("dx", function(d) {return d.x})
		.attr("dy", function(d) {return d.y - 10})
		.text(function(d) {return d.city})
		.attr("font-size", "11px")
		.style('opacity', function(d){return d.population  > 1000000 ? 1.0 : 0})
}

function create_barchart(buildings){
	const width = 500;
	const height = 500;
	const svg = d3.select('.barchart')		
		.append('svg')
    	.attr('width', width)
    	.attr('height', height)
	svg
		.selectAll("rect")
		.data(buildings)
		.enter()
	    .append("rect")
    	.attr("class", "bar")
    	.attr("x", function(d) {
      		return (175);
    	})
		.attr("y", function(d,i) {
			return (i*40);
		})
		.attr("width", function(d) {
			return d.height_px;
		})
		.attr("height", 35)
		.attr("fill", function(d) {return "#ff9238"})
		.on("click", function(event, d) {
			setCity(d)
		})
		.attr()


	svg
		.selectAll("text")
		.data(buildings)
		.enter()
		.append("text")
		.attr("dx", function(d) {return 0})
		.attr("dy", function(d,i) {return i*40 + 20})
		.text(function(d) {return d.building})
		.attr("font-size", "11px")

	svg
		.selectAll("text_2")
		.data(buildings)
		.enter()
		.append("text")
		.attr("text-anchor", "end")
		.attr("dx", function(d) {return d.height_px+170})
		.attr("dy", function(d,i) {return i*40 + 20})
		.text(function(d) {return `${d.height_ft} ft`})
		.attr("font-size", "11px")
		.attr("fill", "white")

}


async function main(){
	data = await d3.csv('cities.csv', d3.autoType)
	euro_cities = data.filter(d => d.eu)
	create_scatter(euro_cities)
	data = await d3.csv('buildings.csv', d3.autoType)
	console.log(data)
	buildings = data.sort(function(a,b){
		return a.height_m > b.height_m ? -1: 1
	})
	setCity(buildings[0])
	create_barchart(buildings) 
}

function setCity(d){
	d3.select(".building-name").text(d.building)
	d3.select(".height").text(d.height_m)
	d3.select(".city").text(d.city)
	d3.select(".country").text(d.country)
	d3.select(".floors").text(d.floors)
	d3.select(".completed").text(d.completed)
	let img = d3.select('.image')
		.attr("src", `./img/${d.image}`)
}


main();
