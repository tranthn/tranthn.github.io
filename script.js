// helper functions
var generateNodes = function() {
	var letters = 'abcdefghijklmnopqrstuvwxyz',
		nodes = [];

	for (var i = 0; i < letters.length; i++) {
		nodes.push({data: {id: letters[i]}});
	}

	for (var j = 0; j < 26; j++) {
		var idx1 = Math.floor(Math.random() * letters.length),
			idx2 = Math.floor(Math.random() * letters.length);

		nodes.push({data: {id: letters[idx1] + letters[idx2]}});
	}

	return nodes;
};

var generateEdges = function(nodes) {
	var numEdges = 78,
		edges = [],
		src,
		trg,
		tempEdge;

	for (var j = 0; j < numEdges; j++) {
		src = nodes[Math.floor(Math.random() * nodes.length)];
		trg = nodes[Math.floor(Math.random() * nodes.length)];
		tempEdge = {
			data: {
				id: src.data.id + trg.data.id,
				source: src.data.id,
				target: trg.data.id
			}
		};

		edges.push(tempEdge);
	}

	return edges;
};

var resetUI = function () {
	document.getElementsByClassName('output-body')[0].innerHTML = '';
	cy.edges().removeClass('highlight');
	cy.nodes().removeClass('highlight');
};

var checkForPath = function(event) {
	resetUI();

	var input1 = document.getElementsByClassName('input1')[0].value,
		input2 = document.getElementsByClassName('input2')[0].value,
		resultText = '';

	var dijkstra = cy.elements().dijkstra('#' + input1, undefined, true);
		pathTo = dijkstra.pathTo(cy.$('#' + input2));

	if (pathTo.length === 1) {
		resultText = 'No path found between ' + input1 + ' and ' + input2;
	} else {
		for (var i = 0; i < pathTo.length; i++) {
			var el = pathTo[i];
			el.addClass('highlight');
				
			// nodes === 0 or even number elements
			if (i === 0 || (i % 2) === 0) {
				resultText += el.data('id');
				if (i + 1 !== pathTo.length) {
					resultText += '-';
				}
			}
		}
	}

	document.getElementsByClassName('output-body')[0].innerHTML = resultText;

};

// init
var nodes = generateNodes();
var edges = generateEdges(nodes);

var cy = cytoscape({
	container: document.getElementById('cy'), // container to render in

	elements: {
		nodes: nodes,
		edges: edges
	},
	style: [
		{
			selector: 'node',
			style: {
				'background-color': '#9EB6B8',
				'label': 'data(id)',
				'font-size': '2em'
			}
		},
		{
			selector: 'edge',
			style: {
				'width': 2,
				'line-color': '#BAC1B8',
				'target-arrow-color': '#BAC1B8',
				'target-arrow-shape': 'triangle',
				'curve-style': 'unbundled-bezier'
			}
		},
		{
			selector: '.highlight',
			style: {
				'background-color': '#FCBA04',
				'line-color': '#15284B',
				'target-arrow-color': '#15284B',
				'transition-property': 'line-color, target-arrow-color',
        		'transition-duration': '1s'
			}
		}
	],
	layout: {
		name: 'breadthfirst',
		directed: true
	}
});

var checkBtn = document.getElementsByClassName('checkBtn')[0];
checkBtn.addEventListener('click', checkForPath);
