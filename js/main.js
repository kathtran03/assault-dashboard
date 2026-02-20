mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0aHRyYW4wMyIsImEiOiJjbWxzenNza3MwMHNoM2dvN3U1NmhvbXAyIn0.8ppser-oBGv8FhmDZvC4_g';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-122.3321, 47.6170],
    zoom: 10.9
});

    let aggravatedData = null

    const grades = ['1', '2-9', '10+', '50+'],
        colors = ['#cb181d', '#ffebb5','#82b1df','#b96295'],
        radii = [5, 7, 9, 12];

    const legend = document.getElementById('legend');       
    let labels = ['<strong># of Aggravated Assaults</strong>'],
        vbreak; 
            for (var i = 0; i < grades.length; i++) {
                vbreak = grades[i];
                dot_radii = 2 * radii[i];
                labels.push(
                    '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
        'px; height: ' +
        dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
        '</span></p>');
            }
            const source = '<p style="text-align: right; font-size:10pt">Source: <a href="https://data.seattle.gov/Public-Safety/SPD-Crime-Data-2008-Present/tazs-3rd5/data_preview" target="_blank" style="color: #0066cc; text-decoration: none;">Seattle Police Data</a></p>';
            legend.innerHTML = labels.join('') + source;
      
const chart = c3.generate({
    data: {
        columns: [],
        x: 'x',
        type: 'bar',
        colors: { 'Assaults': '#268acdcf' }
    },
    axis: {
        x: { label: 'Neighborhood', type: 'category' },
        y: { label: 'Number of Assaults' }
    },
    legend: { show: false },
    bindto: '#chart',
});


async function geojsonFetch() {
    let response;
    response = await fetch('assets/seattle_assaults.geojson');
    aggravatedData = await response.json();

    map.on('load', () => {
        map.addSource('assaults', {
            type: 'geojson',
            data: aggravatedData,
            cluster: true,
            clusterMaxZoom: 14,                
            clusterRadius: 50
            });

            map.addLayer({
                id: 'assault-layer',
                type: 'circle',
                source: 'assaults',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#cb181d',
                    'circle-radius': 5,
                    'circle-opacity': 0.6,
                    'circle-stroke-color': '#ffffff',
                    'circle-stroke-width': 1
                }
            });

            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'assaults',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-opacity': 0.7,
                    'circle-stroke-color': '#ffffff',
                    'circle-stroke-width': 1,
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#ffebb5',
                        5,
                        '#82b1df',
                        10,
                        '#b96295'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        12,
                        5,
                        20,
                        10,
                        35
                    ]
                }
            });

            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'assaults',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            map.on('click', 'assault-layer', (e) => {
                const props = e.features[0].properties;
                new mapboxgl.Popup()
                    .setLngLat(e.features[0].geometry.coordinates)
                    .setHTML(`<strong>Aggravated Assault</strong><br>
                        <strong>Area:</strong> ${props["MCPP"]}<br>
                        <strong>Report #:</strong> ${props["Report Number"]}`)
                    .addTo(map);
            });

        ['assault-layer','clusters'].forEach(layer => {
            map.on('mouseenter', layer, () => map.getCanvas().style.cursor = 'pointer');
            map.on('mouseleave', layer, () => map.getCanvas().style.cursor = '');
        });

        updateDashboard();
    });

    map.on('idle', () => updateDashboard());
}

function updateDashboard() {
    if (!aggravatedData) return;

    const bounds = map.getBounds();
    let totalAssaults = 0;
    let neighborhoodCounts = {};

    aggravatedData.features.forEach(f => {
        const coords = f.geometry.coordinates;
        if (bounds.contains(coords)) {
            totalAssaults++;
            const neighborhood = f.properties["MCPP"] || "Unknown";
            neighborhoodCounts[neighborhood] = (neighborhoodCounts[neighborhood] || 0) + 1;
        }
    });

    document.getElementById("assault-count").innerText = totalAssaults;

    const topNeighborhoods = Object.entries(neighborhoodCounts)
        .sort((a,b) => b[1]-a[1])
        .slice(0,5);

    const columns = [
        ['x', ...topNeighborhoods.map(d => d[0])],  // x-axis categories
        ['Assaults', ...topNeighborhoods.map(d => d[1])]
    ];

    chart.load({ columns });
}


    const reset = document.getElementById('reset');
    reset.addEventListener('click', event => {

    map.flyTo({ center: [-122.3321, 47.6170], zoom: 10.9 });
    chart.load({ columns: [] });
});
geojsonFetch();
