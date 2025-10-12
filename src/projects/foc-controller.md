---
title: FOC Stepper Motor Controller
description: 6-layer RP2040 PCB with an MT6701 magnetic encoder and 2x DRV8251A motor drivers
thumbnail: /assets/images/foc-controller/front.jpg
date: 2025-05-20
---

# FOC Stepper Motor Controller

This was designed for my MECENG 235 project in Spring 2025 using KiCad.  It is a 6-layer PCB with:
- RP2040 microcontroller (2-core ARM processor, 133MHz)
- MT6701 14-bit magnetic encoder using I2C
- 2x DRV8251A 4.1A H-bridge motor drivers with integrated current sensors
- SN65HVD1050D CAN transceiver
- 2 input ports for easy daisy-chaining
- 48V input, 4A per motor phase
- Single-sided design for easy manufacturing (excepting magnetic encoder)

<img src="/assets/images/foc-controller/pcb-iso.png" alt="Front layer" style="width: 100%; border-radius: 8px;" />




<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 50px;">
    <p style="text-align: center; font-style: italic; margin-bottom: 5px;">Front layer</p>
    <img src="/assets/images/foc-controller/pcb-front.png" alt="Front layer" style="width: 100%; border-radius: 8px;" />
  </div>
  <div style="flex: 1; min-width: 50px;">
    <p style="text-align: center; font-style: italic; margin-bottom: 5px;">Inner layer 1</p>
    <img src="/assets/images/foc-controller/pcb-in1.png" alt="Inner layer 1" style="width: 100%; border-radius: 8px;" />
  </div>
  <div style="flex: 1; min-width: 50px;">
    <p style="text-align: center; font-style: italic; margin-bottom: 5px;">Inner layer 2</p>
    <img src="/assets/images/foc-controller/pcb-in2.png" alt="Inner layer 2" style="width: 100%; border-radius: 8px;" />
  </div>
</div>
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 50px;">
    <img src="/assets/images/foc-controller/pcb-back.png" alt="Back layer" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Back layer</p>
  </div>
  <div style="flex: 1; min-width: 50px;">
    <img src="/assets/images/foc-controller/pcb-in3.png" alt="Inner layer 3" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Inner layer 3</p>
  </div>
  <div style="flex: 1; min-width: 50px;">
    <img src="/assets/images/foc-controller/pcb-in4.png" alt="Inner layer 4" style="width: 100%; border-radius: 8px;" />
    <p style="text-align: center; font-style: italic; margin-top: 5px;">Inner layer 4</p>
  </div>
</div>


I designed this PCB with more than just the ME135 project in mind, as it can, in theory, turn any NEMA17 stepper motor into a powerful servo motor.

That's why I chose the DRV8251A motor drivers, even though most NEMA17 motors are rated at up to 2A per phase.  The DRV8251A can deliver up to 4.1A per phase, which allows for higher torque and better performance at the cost of more heat generation.


## Challenges and Lessons Learned
- The VMOT → 5V LDO LDO regulator was undersized, since I didn't realize they dissipate power proportional to their voltage drop.  Thus at 24V input, I could not power the two NeoPixel indicator LEDs I added without USB power supplementing the LDO.


## Links
- [Final project report](https://typst.app/project/rrGR7ovRXIC0UweLtR1TUi)
- [GitHub repository](https://github.com/chpaxson/Echo-Telepresence)
