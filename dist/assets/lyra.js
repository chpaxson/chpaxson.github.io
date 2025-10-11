var e=`---\r
title: Lyra\r
description: A largely 3D-printed 6-axis robot arm with a 1-meter reach and large payload.\r
thumbnail: /assets/images/v2-spinning.gif\r
date: 2024-01-15\r
tags: [robotics, 3D printing, mechanical engineering]\r
---\r
\r
# Lyra\r
\r
A largely 3D-printed 6-axis robot arm with a 1-meter reach and large payload.\r
\r
![Lyra Robot Arm](/assets/images/v2-spinning.gif)\r
\r
## Overview\r
\r
This project demonstrates advanced robotic arm design with 3D-printed components. Lyra combines mechanical engineering, electronics, and software to create a capable and affordable robotic platform.\r
\r
## Features\r
\r
- 6-axis articulation for full range of motion\r
- 1-meter reach from base to end effector\r
- High payload capacity\r
- Cost-effective 3D-printed construction\r
- Custom control firmware\r
\r
## Design Images\r
\r
Here's the final assembly:\r
\r
![Final ISO View](/assets/images/v2-final-iso.png)\r
*Isometric view of the final Lyra design*\r
\r
## Technical Details\r
\r
The robot arm uses a combination of:\r
- **Materials**: PLA and PETG 3D printed parts\r
- **Motors**: NEMA 17 and NEMA 23 stepper motors\r
- **Controller**: Custom Arduino-based controller\r
- **Software**: Inverse kinematics solver for precise positioning\r
\r
### Control System\r
\r
The control system implements:\r
\`\`\`python\r
def inverse_kinematics(x, y, z):\r
    # Calculate joint angles for target position\r
    theta1 = math.atan2(y, x)\r
    r = math.sqrt(x**2 + y**2)\r
    # ... more calculations\r
    return [theta1, theta2, theta3, theta4, theta5, theta6]\r
\`\`\`\r
\r
## Build Process\r
\r
1. Design in CAD software (Fusion 360)\r
2. 3D print all structural components\r
3. Assemble joints and linkages  \r
4. Wire motors and electronics\r
5. Flash control firmware\r
6. Calibrate and test\r
\r
## Future Improvements\r
\r
- Add computer vision for object tracking\r
- Implement machine learning for path optimization\r
- Create web interface for remote control\r
- Design custom gripper end effectors\r
\r
- [Project Repository](https://github.com/chpaxson/lyra)`;export{e as default};