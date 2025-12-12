const url = "https://malla.tnmesh.org";
const infrastructureNodeIds = {
    "middle-tennessee": [
        2688094916, // Music Mountain Tower / tnmesh.org
        2230048818, // SPEEDWAY / DUB2
        1649278252, // Repeater_ShortMtn
        2635746484, // Max Tree Node
        3778153872, // Todd Knob
        2688094804, // MX_1
        3623035579, // MX_2
        2354535109, // MX_3
        1491704133, // MX_4
        2653852284, // MX_L
        2605745954, // Cannon 911
        2733365860, // Green Hill
        1734367387, // Rosehill
        2732916580, // iGG2
        2732685048, // DUB1
        2732685076, // DUB3
        2732697980 // DUB4
    ]
};


async function fetchDataForId(id) {
    const response = await fetch(`${url}/api/node/${id}/info`);
    if (!response.ok) throw new Error(`Failed to load ID ${id}`);

    const data = await response.json();

    let dateString = data.node.last_packet_str;

    if (!dateString.endsWith('Z') && !dateString.includes('+')) {
        dateString += 'Z';
    }

    const lastUpdate = new Date(dateString);
    const timeAgo = convertTimestampToText(lastUpdate);
    const node = data['node'];

    return { ...node, timeAgo: timeAgo, timeSinceLastUpdate: new Date().getTime() - lastUpdate.getTime() };
}

async function fetchNetworkGraph() {
    const response = await fetch(`${url}/api/traceroute/graph?hours=24&min_snr=-20`);
    if (!response.ok) throw new Error(`Failed to load network graph`);
    const data = await response.json();
    const nodes = data['nodes']

    // set to descending order based on the connections column
    nodes.sort((a, b) => b.connections - a.connections);

    return nodes;
}

function convertTimestampToText(time) {
    const lastUpdate = new Date(time);
    const now = new Date();

    const diffMs = now - lastUpdate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let timeAgo;

    if (diffMins < 1) {
        timeAgo = 'just now';
    } else if (diffMins < 60) {
        timeAgo = `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        timeAgo = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
        timeAgo = `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }

    return timeAgo;
}

async function buildHighSNRNodeConnectionsTable() {
    const container = document.getElementById("table-high-snr-node-connections");
    if (!container) return;

    container.innerHTML = "<em>Loading…</em>";

    try {
        const results = await fetchNetworkGraph();

        let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Connections</th>
                    <th>Packet Count</th>
                    <th>Average SNR</th>
                    <th>Last Seen</th>
                </tr>
            </thead>
            <tbody>
        `;

        results.forEach((item, index) => {
            html += `
            <tr>
                <td><a href="https://malla.tnmesh.org/node/${item.id}">${item.name}</a></td>
                <td>${item.connections}</td>
                <td>${item.packet_count}</td>
                <td>${item.avg_snr ? `${item.avg_snr}dB` : 'Unknown'}</td>
                <td>${convertTimestampToText(item.last_seen * 1000)}</td>
            </tr>
        `;
        });

        html += `
            </tbody>
        </table>
    `;

        container.innerHTML = html;
    } catch (err) {
        container.innerHTML = `<p style="color:red;">${err}</p>`;
    }
}

async function buildInfrastructureNodesTable(index) {
    const container = document.getElementById(`table-infrastructure-node-status-${index}`);
    if (!container) return;

    container.innerHTML = "<em>Loading…</em>";

    try {
        const nodes = infrastructureNodeIds[index] ?? [];

        if (nodes.length === 0) {
            container.innerHTML = "<em>Empty</em>";
            return;
        }

        const results = await Promise.all(nodes.map(fetchDataForId));
        results.sort((a, b) => a.timeSinceLastUpdate - b.timeSinceLastUpdate)

        let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Last Seen</th>
                    <th>24hr Packet Count</th>
                </tr>
            </thead>
            <tbody>
        `;

        results.forEach((item, index) => {
            let status = '✅';
            // 12 hours without being seen
            if (item.timeSinceLastUpdate > 1000 * 60 * 60 * 12) {
                status = '❌';
            // 6 hours without being seen
            } else if(item.timeSinceLastUpdate > 1000 * 60 * 60 * 6) {
                status = '⚠️';
            }

            html += `
            <tr>
                <td><a href="https://malla.tnmesh.org/node/${item.node_id}">${item.long_name} (${item.short_name})</a></td>
                <td>${status} ${item.timeAgo}</td>
                <td>${item.packet_count_24h}</td>
            </tr>
        `;
        });

        html += `
            </tbody>
        </table>
        `;

        container.innerHTML = html;

    } catch (err) {
        container.innerHTML = `<p style="color:red;">${err}</p>`;
    }
}


document$.subscribe(() => {
    buildHighSNRNodeConnectionsTable();
    buildInfrastructureNodesTable('west-tennessee');
    buildInfrastructureNodesTable('east-tennessee');
    buildInfrastructureNodesTable('middle-tennessee');
});
