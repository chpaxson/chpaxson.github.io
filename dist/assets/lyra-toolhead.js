var e=`---\r
title: Lyra Toolhead Board\r
description: A custom PCB with an integrated force/torque sensor designed to control stepper motors and servos for the Lyra robot arm.\r
thumbnail: /assets/images/lyra-toolhead/3d-model.png\r
date: 2024-01-14\r
---\r
\r
# Lyra Toolhead Board\r
\r
I designed this board with David Scott Gonzalez for the Hands-On PCB Engineering (HOPE) DeCal at UC Berkeley in Spring 2024, to be used as the end effector of the Lyra robot arm I was building simultaneously for my ME102B project.\r
\r
## Overview\r
This 4-layer custom PCB was designed with KiCad to fit in the end effector of the Lyra robot arm, with an integrated 3-axis force/torque sensor.  It has:\r
- RP2040 microcontroller (2-core ARM processor, 133MHz)\r
- MCP25625 CAN controller with transceiver\r
- TMC2209 stepper motor driver\r
- BMI270 6-axis IMU\r
- PCA9685BS PWM driver driving:\r
  - 6x servo connectors\r
  - 4x 24V high-current outputs for heaters, solenoids, etc.\r
- 2x thermistor inputs\r
- 3x HX711 load cell amplifiers for force/torque sensor\r
\r
All of the outputs were wired into the center puck of the board, which mated with a breakout board that allowed for easy connection to servos, motors, and sensors.\r
\r
## Challenges\r
- The integrated force/torque sensor meant there was very limited space for routing traces to the center puck.  Pours were not as efficient as traces, so every single signal was routed as a trace.\r
- The 3-way symmetry of the load cell arrangement was difficult to route in KiCad as the tools are meant for routing at multiples of 45°.  There are also many arc-shaped traces running along the edge of the board to minimize space used.\r
- We were limited to the standard-precision 4-layer process at JLCPCB, which meant the minimum trace width, spacing, and via size was relatively large, further complicating the routing.\r
- We neglected to order a stencil for solder paste application, so we attempted to laser-cut a stencil out of a thin sheet of mylar sheet with the help of a HOPE instructor.  The results were not great, and our assembled board had a few shorts that we did not have time to resolve before the end of the semester.\r
\r
## PCB Layers\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: -15px;">Front layer</p>\r
    <img src="/assets/images/lyra-toolhead/layer-front.png" alt="Front layer" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: -15px;">Inner layer 1</p>\r
    <img src="/assets/images/lyra-toolhead/layer-in1.png" alt="Inner layer 1" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
</div>\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 50px;">\r
    <img src="/assets/images/lyra-toolhead/layer-back.png" alt="Back layer" style="width: 100%; border-radius: 8px;" />\r
    <p style="text-align: center; font-style: italic; margin-top: -15px;">Back layer</p>\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <img src="/assets/images/lyra-toolhead/layer-in2.png" alt="Inner layer 2" style="width: 100%; border-radius: 8px;" />\r
    <p style="text-align: center; font-style: italic; margin-top: -15px;">Inner layer 2</p>\r
  </div>\r
</div>\r
\r
## Schematic\r
<div style="background-color: #fff; border-radius: 8px; padding: 1rem;">\r
<img src="/assets/images/lyra-toolhead/schematic/Toolhead Board.svg" alt="Root Schematic" style="width: 100%; border-radius: 0px;" />\r
  <img src="/assets/images/lyra-toolhead/schematic/Toolhead Board-Microcontroller.svg" alt="Microcontroller Schematic" style="width: 100%; border-radius: 0px;" />\r
  <img src="/assets/images/lyra-toolhead/schematic/Toolhead Board-Load Cell Amplifiers.svg" alt="Load Cell Amplifiers Schematic" style="width: 100%; border-radius: 0px;" />\r
  <img src="/assets/images/lyra-toolhead/schematic/Toolhead Board-Accelerometer.svg" alt="Accelerometer Schematic" style="width: 100%; border-radius: 0px;" />\r
  <img src="/assets/images/lyra-toolhead/schematic/Toolhead Board-PWM.svg" alt="PWM Driver Schematic" style="width: 100%; border-radius: 0px;" />\r
  <img src="/assets/images/lyra-toolhead/schematic/Toolhead Board-Stepper Driver.svg" alt="Stepper Driver Schematic" style="width: 100%; border-radius: 0px;" />\r
  <img src="/assets/images/lyra-toolhead/schematic/Toolhead Board-CAN IO.svg" alt="CAN Controller Schematic" style="width: 100%; border-radius: 0px;" />\r
</div>\r
\r
## Links\r
- [Project Repository](https://github.com/chpaxson/lyra/tree/main/Hardware/Electronics/Custom%20PCBs/Toolhead%20Board)`;export{e as default};