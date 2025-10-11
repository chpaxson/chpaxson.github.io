var e=`---\r
title: FOC Stepper Motor Controller\r
description: 6-layer RP2040 PCB with an MT6701 magnetic encoder and 2x DRV8251A motor drivers\r
thumbnail: /assets/images/foc-controller/front.jpg\r
date: 2024-06-20\r
tags: [KiCad, PCB design, embedded systems]\r
---\r
\r
# FOC Stepper Motor Controller\r
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
<img src="/assets/images/foc-controller/pcb-iso.png" alt="Front layer" style="width: 100%; border-radius: 8px;" />\r
\r
\r
\r
\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: 5px;">Front layer</p>\r
    <img src="/assets/images/foc-controller/pcb-front.png" alt="Front layer" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: 5px;">Inner layer 1</p>\r
    <img src="/assets/images/foc-controller/pcb-in1.png" alt="Inner layer 1" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: 5px;">Inner layer 2</p>\r
    <img src="/assets/images/foc-controller/pcb-in2.png" alt="Inner layer 2" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
</div>\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 50px;">\r
    <img src="/assets/images/foc-controller/pcb-back.png" alt="Back layer" style="width: 100%; border-radius: 8px;" />\r
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Back layer</p>\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <img src="/assets/images/foc-controller/pcb-in3.png" alt="Inner layer 3" style="width: 100%; border-radius: 8px;" />\r
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Inner layer 3</p>\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <img src="/assets/images/foc-controller/pcb-in4.png" alt="Inner layer 4" style="width: 100%; border-radius: 8px;" />\r
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Inner layer 4</p>\r
  </div>\r
</div>\r
\r
\r
I designed this PCB with more than just the ME135 project in mind, as it can, in theory, turn any NEMA17 stepper motor into a powerful servo motor.\r
\r
That's why I chose the DRV8251A motor drivers, even though most NEMA17 motors are rated at up to 2A per phase.  The DRV8251A can deliver up to 4.1A per phase, which allows for higher torque and better performance at the cost of more heat generation.\r
\r
\r
## Challenges and Lessons Learned\r
- The VMOT → 5V LDO LDO regulator was undersized, since I didn't realize they dissipate power proportional to their voltage drop.  Thus at 24V input, I could not power the two NeoPixel indicator LEDs I added without USB power supplementing the LDO.\r
\r
\r
## Links\r
- [Final project report](https://typst.app/project/rrGR7ovRXIC0UweLtR1TUi)\r
- [GitHub repository](https://github.com/chpaxson/Echo-Telepresence)\r
`;export{e as default};