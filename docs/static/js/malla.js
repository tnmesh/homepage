const url = "https://malla.tnmesh.org";

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

async function buildTable() {
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

document$.subscribe(() => {
    buildTable();
});