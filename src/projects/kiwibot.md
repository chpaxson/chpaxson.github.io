---
title: KiwiBot
description: 3-wheeled omnidirectional robot with computer vision and autonomous navigation.
thumbnail: /assets/images/kiwibot/taildragger.jpg
date: 2023-12-20
---

# Overview

Built for my ME 100 (Electronics for Internet of Things) class in Fall 2023, with Ian Zhang and David Gonzalez.

It's controlled by a Raspberry Pi Zero W, that connects wirelessly through a TCP socket to a base station laptop running ROS.  Simultaneously, the Raspberry Pi runs a RTSP server to stream the video from the onboard camera back to the base station.


## Design

<div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
  <img src="/assets/images/kiwibot/cad-iso.png" alt="Front layer" style="width: 80%; min-width: 300px; border-radius: 8px;" />
</div>

We were designing this robot for our ME 100 class, which provided us a "microkit" for lab, including the 12V gear motors we used.

Taking those motors and a 12V battery that I had from my FTC days, we connected it with two L298N motor driver breakouts to drive all three motors.

The motor drivers were connected to the Raspberry Pi's GPIO, and the camera I found in an ewaste bin was connected through a USB OTG hub (since the Pi Zero only has micro USB ports)

All of the electronics were integrated into a hexagonal chassis with an integrated power switch and battery voltage monitor.


## Links
- [Design Repository](https://github.com/chpaxson/ME100-Project)