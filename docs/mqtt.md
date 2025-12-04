# Connecting to MQTT

## What is MQTT?

MQTT is a message-broker application that Meshtastic nodes can connect to. By connecting to an MQTT server, all LoRa traffic your node sees is sent over to our MQTT server where applications can pull and use.

We use MQTT for collecting data from nodes across the state. From this data, we are able to populate applications such as [Malla](https://malla.tnmesh.org) to provide access to packets, metrics, maps and more.

!!! note "How to help without connecting to MQTT"
    If you would like to still help with contributing your nodes data but do not want to connect to MQTT, please set `OK to MQTT` to enabled.

    This allows any MQTT gateway (a node connected to MQTT) to submit your data to our MQTT server. For more information on enabling `OK to MQTT`, check out [Meshtastic's website](https://meshtastic.org/docs/configuration/radio/lora/#ok-to-mqtt).


## MQTT Host and Credentials
To make it easier to connect to our MQTT server, you only need to change the `Host` in your MQTT module as we use the default username and password.

|              |                  |
| ------------ | ---------------- |
| Host       | `mqtt.tnmesh.org`  |
| Username   | `meshdev`          |
| Password   | `large4cats`       |

## Selecting a Topic
When selecting a root topic, use the topic that matches closely to the region your radio is located in.

For example, a radio that is located in <b>Nashville, TN</b> may wish to use the topic `msh/US/TN/Middle` since Nashville is located in middle Tennessee.

| Region           | Topic             |
| ------------     | ----------------- |
| East Tennessee   | `msh/US/TN/East`  |
| Middle Tennessee | `msh/US/TN/Middle`|
| West Tennessee   | `msh/US/TN/West`  |

## MQTT Tools
