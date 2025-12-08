import requests
import datetime

MALLA_API_URL = "https://malla.tnmesh.org/api"

def define_env(env):
    @env.macro
    def get_direct_connections():
        response = requests.get(f"{MALLA_API_URL}/traceroute/graph?hours=24&min_snr=0")
        fields = response.json()

        nodes = fields['nodes']
        nodes.sort(key=lambda item: item["connections"], reverse=True)

        return nodes

    @env.macro
    def convert_timestamp(timestamp):
        return datetime.datetime.fromtimestamp(timestamp)