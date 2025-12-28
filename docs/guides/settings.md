# Recommended Settings

Please make sure to update the firmware on your device as you get started. The easiest way to do that is to use the [Web Flasher](https://flasher.meshtastic.org). The latest stable release, even if labeled Beta, is generally a very safe option.

Most importantly, make sure to keep all automatic beacons like telemetry and position (if used on a stationary node) to `6 hours+`. If you want to send position while moving, use *Smart Position*, with minimum `10 minutes` and distance trigger `100` to `130`. This helps keep the mesh network clean of background traffic that's of little use.


### LoRa

| Setting                           | Description   | Value         | Documentation                                                |
| --------------------------------- | ------------- | ------------- | ------------------------------------------------------------ |
| Region                            | `US` - 915 MHz | `US`          |[lora/#region](https://meshtastic.org/docs/configuration/radio/lora/#region)
| Preset                            | [View here](#lora-presets-by-location) to see available presets for areas in Tennessee | *Left intentionally blank* |[lora/#use-preset](https://meshtastic.org/docs/configuration/radio/lora/#use-preset)
| Max Hops (infrastructure nodes)   | Max hops recommended for infrastructure nodes | `4 (up to 5)` | [lora/#max-hops](https://meshtastic.org/docs/configuration/radio/lora/#max-hops)
| Max Hops (personal nodes)         | Max hops recommended for personal nodes       | `6 (up to 7)` |[lora/#max-hops](https://meshtastic.org/docs/configuration/radio/lora/#max-hops)
| Ignore MQTT (optional)            | Enable this to ignore traffic that may have been downlinked from MQTT (the internet) | `true` | [lora/#ignore-mqtt](https://meshtastic.org/docs/configuration/radio/lora/#ignore-mqtt)
| OK to MQTT (recommended)          | Enable this for your messages to be uploaded to MQTT (the internet). This is required for your messages to show up on the Discord logger, Malla, MeshInfo, or location on any maps. This helps us see where traffic flows, and troubleshoot issues | `true` | [lora/#ok-to-mqtt](https://meshtastic.org/docs/configuration/radio/lora/#ok-to-mqtt)

#### LoRa Presets by Location

In general, most of Tennessee uses the `Long_Fast` preset. Below is a table defining presets in different areas of Tennessee.

| Locations                         | Preset        |
| --------------------------------- | ------------- |
| Nashville (and surrounding areas) | `Long_Fast` ([switching to `Medium_Fast` on January 3rd, 2026](/events/2025/12/11/nashville-will-be-switching-to-medium_fast-on-january-3rd--beginning-stages-for-supporting-meshcore/)) |

### Channels

The primary channel is commonly used across the Mesh network. Below are configuration settings for the `0 Primary Channel`.

| Setting                           | Description   | Value         | Documentation                                                |
| --------------------------------- | ------------- | ------------- | ------------------------------------------------------------ |
| Name                              | The name of the channel. This can be left blank for the primary channel | *Left intentionally blank* |[channels/#name](https://meshtastic.org/docs/configuration/radio/channels/#name)
| PSK                               | The encryption key to use for the primary channel | `AQ==` |[channels/#psk](https://meshtastic.org/docs/configuration/radio/channels/#psk)
| Position Precision                | You may wish to turn off *Positions & Location* if you’re not interested in broadcasting your location. If you wish to enable a precise location you can do so via any client other than iOS | *Left intentionally blank* |[channels/#position-precision](https://meshtastic.org/docs/configuration/radio/channels/#position-precision)

### User

| Setting                           | Description   | Documentation                                                |
| --------------------------------- | ------------- | ------------------------------------------------------------ |
| Long Name                         | Something descriptive for your node. Example: Your name, discord handle, or Ham callsign. You can even include an email or website | [user/#long-name](https://meshtastic.org/docs/configuration/radio/user/#long-name)
| Short Name                        | Max of 4 characters, something unique for you and that particular radio. This will be what’s displayed in chat. You can even use emojis to spice things up | [user/#short-name](https://meshtastic.org/docs/configuration/radio/user/#short-name)
| Is Licensed (not recommended)     | Do not enable unless you are a licensed Amateur Radio operators. (You will not be able to communicate with people on any of the default channels if you enable this) | [user/#is-licensed-ham](https://meshtastic.org/docs/configuration/radio/user/#is-licensed-ham)

!!! info "Shoutout your local Mesh community"

    Feel free to add the website to your local mesh community in your *Long Name* to make others aware.

### Device Roles

Devices can be set to different roles depending on the purpose of the node. Below are recommended device roles to use. To view a list of all available roles, check out the [Meshtastic website](https://meshtastic.org/docs/configuration/radio/device/#roles).

| Role                  | Description   |
| --------------------- | ------------- |
| `CLIENT_MUTE`         | Best for vehicles and any time you have more than 2 nodes in the same place. It will receive messages from other nodes but will not relay any traffic. It will still transmit packets sent from itself
| `CLIENT`              | Recommended for a home “base stations” or your single primary node. It will relay messages it receives
| `ROUTER` / `REPEATER` | **DO NOT use this role**. There are a lot of considerations, and caveats, to using the official `ROUTER` & `REPEATER` roles. Remember: The `CLIENT` role relays messages just fine

### Module Configuration

#### MQTT

If you wish to setup MQTT, check out the [MQTT](/mqtt) configuration guide.

#### Telemetry

| Setting                           | Description   | Value         | Documentation                                                |
| --------------------------------- | ------------- | ------------- | ------------------------------------------------------------ |
| Environment Telemetry Enabled     | Enables the environment telemetry sensors | `true` | [telemetry/#environment-telemetry-enabled](https://meshtastic.org/docs/configuration/module/telemetry/#environment-telemetry-enabled)
| Device Metrics Update Interval    | How often to send Device Metrics over the mesh | 6 hour (iOS) / 21,600 seconds (Android) |[telemetry/#device-metrics-update-interval](https://meshtastic.org/docs/configuration/module/telemetry/#device-metrics-update-interval)
| Environment Metrics Update Intervall    | How often to send Device Metrics over the mesh | 6 hour (iOS) / 21,600 seconds (Android) |[telemetry/#environment-metrics-update-interval](https://meshtastic.org/docs/configuration/module/telemetry/#environment-metrics-update-interval)
