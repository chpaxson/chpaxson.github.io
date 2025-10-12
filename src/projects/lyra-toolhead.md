---
title: Lyra Toolhead Board
description: A custom PCB with an integrated force/torque sensor designed to control stepper motors and servos for the Lyra robot arm.
thumbnail: /assets/images/lyra-toolhead/3d-model.png
date: 2024-01-14
---

# Lyra Toolhead Board

I designed this board for the Hands-On PCB Engineering (HOPE) DeCal at UC Berkeley in Spring 2024, to be used as the end effector of the Lyra robot arm I was building simultaneously for my ME102B project.  David Gonzalez and I worked on this together.

## Overview
This custom PCB was designed to fit in the end effector of the Lyra robot arm, with an integrated 3-axis force/torque sensor.  It has:
- RP2040 microcontroller (2-core ARM processor, 133MHz)
- MCP25625 CAN controller with transceiver
- TMC2209 stepper motor driver
- BMI270 6-axis IMU
- PCA9685BS PWM driver driving:
  - 6x servo connectors
  - 4x 24V high-current outputs for heaters, solenoids, etc.
- 2x thermistor inputs
- 3x HX711 load cell amplifiers for force/torque sensor

## PCB Layers
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 50px;">
    <p style="text-align: center; font-style: italic; margin-bottom: -15px;">Front layer</p>
    <img src="/assets/images/lyra-toolhead/layer-front.png" alt="Front layer" style="width: 100%; border-radius: 8px;" />
  </div>
  <div style="flex: 1; min-width: 50px;">
    <p style="text-align: center; font-style: italic; margin-bottom: -15px;">Inner layer 1</p>
    <img src="/assets/images/lyra-toolhead/layer-in1.png" alt="Inner layer 1" style="width: 100%; border-radius: 8px;" />
  </div>
</div>
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 50px;">
    <img src="/assets/images/lyra-toolhead/layer-back.png" alt="Back layer" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: -15px;">Back layer</p>
  </div>
  <div style="flex: 1; min-width: 50px;">
    <img src="/assets/images/lyra-toolhead/layer-in2.png" alt="Inner layer 2" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: -15px;">Inner layer 2</p>
  </div>
</div>