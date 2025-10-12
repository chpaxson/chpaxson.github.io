var e=`---\r
title: FishSense\r
description: Underwater handheld depth camera and processor enclosure for fish cataloguing\r
thumbnail: /assets/images/fishsense/fishsense.png\r
date: 2022-08-01\r
---\r
# FishSense\r
\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 250px;">\r
    <img src="/assets/images/fishsense/fishsense.png" alt="Image 1" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
  <div style="flex: 1; min-width: 250px;">\r
    <img src="/assets/images/fishsense/fishsense-irl.jpg" alt="Image 2" style="width: 100%; border-radius: 8px;" />\r
    \r
  </div>\r
</div>\r
\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 250px;">\r
    <img src="/assets/images/fishsense/fishsense-no-enclosure.png" alt="Image 2" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
  <div style="flex: 1; min-width: 250px;">\r
    <img src="/assets/images/fishsense/fishsense-irl-noenclosure.jpg" alt="Image 1" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
</div>\r
<p style="text-align: center; font-style: italic; margin-top: 0.5rem;">Enclosed and unenclosed units, CAD and first manufactured module</p>\r
\r
## Overview\r
The system uses an Intel RealSense D455 RGBD camera to capture color and depth images of fish in underwater environments. The camera is connected to a NVIDIA Jetson TX2, which processes the images using a custom deep learning model to identify and measure fish.\r
\r
Additionally, the system contained a BlueRobotics Fathom-X tether board, 2 6-cell 18650 Li-Ion battery packs, a 1TB USB SSD, a USB hub, and a custom power board to manage power distribution and charging.\r
\r
All of the components were integrated onto a shuttle that would slide into a 6 inch diameter BlueRobotics waterproof enclosure.\r
\r
## Construction\r
After several ideas, I settled on a laser-cut acrylic design held together with stainless steel "spine" rods.  These rods also provided the mounting points for the RealSense camera, which had a "gimbal" mechanism to allow it to press against the front acrylic window.\r
\r
The Jetson TX-2 is positioned at the back of the shuttle, so that when the enclosure is shut, the Jetson's heat spreader is pressed against the aluminum end cap, allowing it to dissipate heat into the surrounding water.\r
\r
The custom power board is mounted in front of the Jetson, and the battery packs take up most of the remaining space in the center of the enclosure.  The USB hub and SSD are mounted above and below the battery packs, and the Fathom-X board is mounted near the front of the enclosure.\r
\r
Finally, the enclosure has additional "rails" mounted inside to ensure that the shuttle is properly aligned when inserted, so the shuttle is in a consistent orientation relative to the enclosure.\r
\r
\r
<!-- There was a prototype of the system before I came on to the project that utilized a Raspberry Pi as the processor. It had issues with buoyancy, because the enclosure was mostly empty. My design switched it over to a NVIDIA Jetson TX-2 with a custom power board. -->\r
\r
<!-- My design improved a lot of major aspects, but I also made a lot of small mistakes throughout the design process, and unfortunately, a few with the final design. There are a few bolts that were too long, and we came up with a few more features to implement. Some would be done on a new version of the module, and some can be applied to the current ones. Also, since I designed the assembly from the bottom up, with in-place relations and many, many external references, it is difficult to modify certain parts. I'm working on making all mechanical interfaces defined by sketch blocks. -->\r
\r
\r
\r
## Links\r
- [Design Repository](https://github.com/chpaxson/FishSense-Mechanical)\r
- [FishSense: Underwater RGBD Imaging for Fish Measurement](https://ieeexplore.ieee.org/document/9705929)`;export{e as default};