---
title: Lyra
description: A largely 3D-printed 6-axis robot arm with a 1-meter reach and large payload.
thumbnail: /assets/images/lyra/thumbnail.png
date: 2024-01-15
---

# Lyra

A largely 3D-printed 6-axis robot arm with a 1-meter reach and large payload.

## Overview

I built this for my ME102B class at Berkeley in Spring 2024, with Angel Garnica, David Gonzalez, and Daniel Morales.

This project demonstrates advanced robotic arm design with 3D-printed components. Lyra combines mechanical engineering, electronics, and software to create a capable and affordable robotic platform.

The arm has 1 planetary gear reduction and 5 cycloidal drives (3 distinct designs).  It has a total reach of about 1 meter and a theoretical payload capacity of 5kg at full extension.




## Technical Details
<div style="display: flex; gap: 0rem; flex-wrap: wrap; justify-content: center;">
  <img src="/assets/images/lyra/cad-iso.png" alt="Isometric view of CAD" style="width: 80%; min-width: 300px; border-radius: 8px;" />
</div>

The arm has 6 degrees of freedom, with the first three driven by NEMA23 stepper motors and the last three by NEMA17 stepper motors.  We have MKS-SERVO57D and MKS-SERVO42D closed-loop stepper drivers controlling the motors.



### Cycloidal Drives

<div style="display: flex; gap: 0rem; flex-wrap: wrap; justify-content: center;">
  <img src="/assets/images/lyra/j2-reducer-animation.gif" alt="Animation of joint 2 cycloidal reducer" style="width: 80%; min-width: 300px; border-radius: 8px;" />
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Joint 2 cycloidal reducer - center gray component is the input, the 6 rods immediately around it capture the output rotation</p>
</div>

Joint 2 has a 24:1 3-disk cycloidal drive as it sees the highest torque, and joint 3 has a 19:1 3-disk cycloidal drive with about half the torque applied.  The motor sizes holding torques are amplified to 72Nm and 36Nm on each joint, equating to 7.3kg capacity at full extension, before any efficiency losses.

Joints 4, 5, and 6 used the same 9:1 2-disk cycloidal drive design, that is ever so 

<div style="display: flex; gap: 0rem; flex-wrap: wrap; justify-content: center;">
  <img src="/assets/images/lyra/nema17-gearbox.png" alt="Screenshot of NEMA 17 gearbox" style="width: 80%; min-width: 300px; border-radius: 8px;" />
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Joint 2 cycloidal reducer - center gray component is the input, the 6 rods immediately around it capture the output rotation</p>
</div>

All of the drives are designed with ABS  cycloidal disks, with steel pins for the housing pins and output pins to minimize friction.




## Build Process


## Future Improvements


## Links

- [Project Repository](https://github.com/chpaxson/lyra)