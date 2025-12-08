# Connections
Below are nodes that have an average SNR of ≥ 0dB or more, or at least for what is stored in Malla. Data for this table is pulled from [here](https://malla.tnmesh.org/traceroute-graph).

Note: Times are in CST.

## SNR ≥ 0dB

<table>
    <tr>
        <th>Name</th>
        <th>Last Seen</th>
        <th>Connections</th>
        <th>Packet Count</th>
        <th>Average SNR</th>
    </tr>
    {% for item in get_direct_connections() %}
        <tr>
        <td><a href="https://malla.tnmesh.org/node/{{ item.id }}" >{{ item.name }}</a></td>
        <td>{{ convert_timestamp(item.last_seen) }}</td>
        <td>{{ item.connections }}</td>
        <td>{{ item.packet_count }}</td>
        {% if item.avg_snr %}
            <td>{{ item.avg_snr }}dB</td>
        {% else %}
            <td>UNK</td>
        {% endif %}
        </tr>
    {% endfor %}
</table>

