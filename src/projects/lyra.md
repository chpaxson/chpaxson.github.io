---
title: Lyra
description: A largely 3D-printed 6-axis robot arm with a 1-meter reach and large payload.
thumbnail: /assets/images/v2-spinning.gif
date: 2024-01-15
tags: [robotics, 3D printing, mechanical engineering]
---

# Lyra

A largely 3D-printed 6-axis robot arm with a 1-meter reach and large payload.

![Lyra Robot Arm](/assets/images/v2-spinning.gif)

## Overview

This project demonstrates advanced robotic arm design with 3D-printed components. Lyra combines mechanical engineering, electronics, and software to create a capable and affordable robotic platform.

## Features

- 6-axis articulation for full range of motion
- 1-meter reach from base to end effector
- High payload capacity
- Cost-effective 3D-printed construction
- Custom control firmware

## Design Images

Here's the final assembly:

![Final ISO View](/assets/images/v2-final-iso.png)
*Isometric view of the final Lyra design*

## Technical Details

The robot arm uses a combination of:
- **Materials**: PLA and PETG 3D printed parts
- **Motors**: NEMA 17 and NEMA 23 stepper motors
- **Controller**: Custom Arduino-based controller
- **Software**: Inverse kinematics solver for precise positioning

### Control System

The control system implements:
```python
def inverse_kinematics(x, y, z):
    # Calculate joint angles for target position
    theta1 = math.atan2(y, x)
    r = math.sqrt(x**2 + y**2)
    # ... more calculations
    return [theta1, theta2, theta3, theta4, theta5, theta6]
```

## Build Process

1. Design in CAD software (Fusion 360)
2. 3D print all structural components
3. Assemble joints and linkages  
4. Wire motors and electronics
5. Flash control firmware
6. Calibrate and test

## Future Improvements

- Add computer vision for object tracking
- Implement machine learning for path optimization
- Create web interface for remote control
- Design custom gripper end effectors

- [Project Repository](https://github.com/chpaxson/lyra)