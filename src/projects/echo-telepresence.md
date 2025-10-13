---
title: Echo Telepresence
description: A pair of linked parallel SCARA arms demonstrating telepresence and remote manipulation.
thumbnail: /assets/images/echo/robot-photo.jpg
date: 2025-05-21
---

# Echo Telepresence

Designed and built for my ME235 project in Spring 2025, with Ishaan Gupta, David Soto Gonzalez, and Luz Torralba.

## Overview

The prompt for this project was to develop a real-time microprocessor-based control system with a GUI.  I had wanted to develop my own FOC motor controller for a while, so I proposed building a pair of robots that could demonstrate force feedback, which led us to the idea of telepresence.

We then settled on the parallel SCARA kinematics, as it only requires two motors per arm, and has a decent workspace for manipulation.

I designed the motor controller PCBs, the robot itself, the main controller hardware and firmware, and the GUI software.  Ishaan focused on the FOC motor controller firmware (based on SimpleFOC, ported to the Raspberry Pi Pico SDK).  David and Luz worked on previous iterations of the robot design, fabrication, and testing.

## FOC Motor Controller

I have a more detailed post about the FOC motor controller[here](./foc-controller)!

It is a six-layer PCB designed in KiCad powered by an RP2040 microcontroller, with an MT6701 magnetic encoder and two DRV8251A motor drivers.  It is designed to mount directly to the back of the NEMA17 stepper motors we used for the robot arms.

<div style="display: block; text-align: center;">
  <img src="/assets/images/echo-foc-controller/pcb-iso.png" alt="Motor controller" style="width: 80%; border-radius: 8px;" />
  <p style="text-align: center; font-style: italic; margin-top: 5px;">FOC Motor Controller PCB</p>
</div>

## Main Controller
Initially we were planning to have two robots, each with their own ESP32-based controller, communicating over the ESP-NOW protocol.  However, due to time constraints, we switched to using a single ESP32-S3 to control both arms, communicating over CAN bus to the four total motor controllers.

The main controller acts as a web server, serving the GUI over HTTP to a connected computer over WiFi, and handles communication with the motor controllers over CAN bus.

The GUI sends position commands to the controller over a WebSocket connection, and the controller sends back position data to be displayed in the GUI.

The HTTP server also allows the GUI to configure motor parameters like PID gains, max velocity, and max acceleration.

The ESP32-S3 dev board is mounted onto a protoboard with a CAN transceiver, and a 24V power supply with a pair of buck converters power the motors and the ESP32.

<img src="/assets/images/echo/robot-controller.jpg" alt="Robot Controller" style="width: 100%; border-radius: 8px;" />

## GUI Software

I have a live demo of the GUI on my website: https://chpaxson.github.io/data/webgui.html#/

The GUI is a web application built with the Vue.js framework and the Sakai Vue UI theme.

I build a custom component to control and visualize the robot, including doing inverse kinematics and projection to keep the end effector within the reachable workspace.  The GUI also displays the current position of both arms, and allows for configuring motor parameters.

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 50px;">
    <img src="/assets/images/echo/gui-dashboard.png" alt="Main Dashboard" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Main Dashboard</p>
  </div>
  <div style="flex: 1; min-width: 50px;">
    <img src="/assets/images/echo/gui-robot-dashboard.png" alt="Robot Dashboard" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Robot Dashboard</p>
  </div>
  <div style="flex: 1; min-width: 50px;">
    <img src="/assets/images/echo/gui-motor-params.png" alt="Motor Parameters" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Motor Parameters</p>
  </div>
</div>

## Mechanical Design

The robot itself is extremely simple, with a small belt reduction between each motor and corresponding arm, and 3D printed arms meeting at a common end effector.  The end was designed with a hollow shaft with the idea of adding a pen holder for drawing, but we didn't get around to it before the end of the semester.

<div style="display: block; text-align: center;">
  <img src="/assets/images/echo/robot-v4.png" alt="Final robot design" style="width: 100%; border-radius: 8px;" />
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Final robot design</p>
</div>

One of my group members, Ishaan Gupta, who mainly focused on the FOC motor controller firmware, added a pen holder to the end effector and presented the robot at Open Sauce 2025.

I modified the GUI to allow control through keyboard input, so people could draw with the robot.

<div style="display: block; text-align: center;">
  <img src="/assets/images/echo/opensauce-exhibit.jpg" alt="Open Sauce Exhibit" style="width: 100%; border-radius: 8px;" />
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Ishaan's exhibit at Open Sauce with a drawing by a few people!</p>
</div>


# Links
- [Final project report](https://typst.app/project/rrGR7ovRXIC0UweLtR1TUi)
- [GitHub repository](https://github.com/chpaxson/Echo-Telepresence)
