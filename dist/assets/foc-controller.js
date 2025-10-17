var e=`---\r
title: FOC Stepper Motor Controller\r
description: 6-layer RP2040 PCB with an MT6701 magnetic encoder and 2x DRV8251A motor drivers\r
thumbnail: /assets/images/echo-foc-controller/front.jpg\r
date: 2025-05-20\r
---\r
\r
# FOC Stepper Motor Controller\r
\r
## Overview\r
\r
This was designed for my MECENG 235 project in Spring 2025 using KiCad.  It is a 6-layer PCB with:\r
- RP2040 microcontroller (2-core ARM processor, 133MHz)\r
- MT6701 14-bit magnetic encoder using I2C\r
- 2x DRV8251A 4.1A H-bridge motor drivers with integrated current sensors\r
- SN65HVD1050D CAN transceiver\r
- 2 input ports for easy daisy-chaining\r
- 48V input, 4A per motor phase\r
- Single-sided design for easy manufacturing (excepting magnetic encoder)\r
\r
<img src="/assets/images/echo-foc-controller/pcb-iso.png" alt="Front layer" style="width: 100%; border-radius: 8px;" />\r
\r
\r
## PCB Layers\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: 5px;">Front layer</p>\r
    <img src="/assets/images/echo-foc-controller/pcb-front.png" alt="Front layer" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: 5px;">Inner layer 1</p>\r
    <img src="/assets/images/echo-foc-controller/pcb-in1.png" alt="Inner layer 1" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: 5px;">Inner layer 2</p>\r
    <img src="/assets/images/echo-foc-controller/pcb-in2.png" alt="Inner layer 2" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
</div>\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 50px;">\r
    <img src="/assets/images/echo-foc-controller/pcb-back.png" alt="Back layer" style="width: 100%; border-radius: 8px;" />\r
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Back layer</p>\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <img src="/assets/images/echo-foc-controller/pcb-in3.png" alt="Inner layer 3" style="width: 100%; border-radius: 8px;" />\r
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Inner layer 3</p>\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <img src="/assets/images/echo-foc-controller/pcb-in4.png" alt="Inner layer 4" style="width: 100%; border-radius: 8px;" />\r
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Inner layer 4</p>\r
  </div>\r
</div>\r
\r
\r
<div style="background-color: #fff; border-radius: 8px; padding: 1rem;">\r
  <img src="/assets/images/echo-foc-controller/schematic.svg" alt="Schematic" style="width: 100%; border-radius: 8px;" />\r
</div>\r
\r
\r
## Design Considerations\r
I designed this PCB with more than just the ME135 project in mind, as it can, in theory, turn any NEMA17 stepper motor into a powerful servo motor.\r
\r
That's why I chose the DRV8251A motor drivers, even though most NEMA17 motors are rated at up to 2A per phase.  The DRV8251A can deliver up to 4.1A per phase, which allows for higher torque and better performance at the cost of more heat generation.\r
\r
\r
## Challenges and Lessons Learned\r
- The VMOT → 5V LDO LDO regulator was undersized, since I didn't realize they dissipate power proportional to their voltage drop.  Thus at 24V input, I could not power the two NeoPixel indicator LEDs I added without USB power supplementing the LDO.  It was still able to run at 24V without the LEDs, but the next revision will have a switching regulator instead.\r
- There was an error in the MT6701 schematic that put it in quadrature output mode instead of I2C mode, which took us hours to debug.  We assmembled 5 boards, and 4 of them just refused to output any data over I2C.  The last board worked perfectly, because there happened to be a bad solder joint on the MODE pin that left it floating, defaulting to I2C mode.  Because the one board worked fine, we ruled out a schematic issue early-on and wasted a lot of time debugging the I2C bus, including swapping sensors, the RP2040 itself, oscillator load capacitors, and more - before realizing we just had to lift one pin on the sensor!\r
\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">\r
  <img src="/assets/images/echo-foc-controller/bad-solder-joint.jpg" alt="Bad Solder Joint" style="width: 50%; border-radius: 8px;" />\r
</div>\r
\r
\r
# Links\r
- [Final project report](https://typst.app/project/rrGR7ovRXIC0UweLtR1TUi)\r
- [GitHub repository](https://github.com/chpaxson/Echo-Telepresence)\r
`;export{e as default};