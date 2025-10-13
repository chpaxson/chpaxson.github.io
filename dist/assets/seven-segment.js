var e=`---\r
title: Mechanical Seven-Segment Display\r
description: A single-input cam driven mechanical seven-segment display\r
thumbnail: /assets/images/seven-segment/1.jpg\r
date: 2022-12-01\r
---\r
# Mechanical Seven-Segment Display\r
\r
This is a mechanical seven-segment display that I designed and built for my ME130 class at UC Berkeley in Fall 2022.  It is driven by a single input shaft that drives 7 cams, each of which controls one segment of the display.\r
\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 250px;">\r
    <div style="position: relative; width: 100%; padding-bottom: 100%;">\r
      <img\r
        src="/assets/images/seven-segment/sevenSegmentAnimation.gif"\r
        alt="Animation of mechanical seven-segment display"\r
        style="position: absolute; width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"\r
      />\r
    </div>\r
    <p style="text-align: center; font-style: italic; margin-top: 1rem;">Animation of operation</p>\r
  </div>\r
  <div style="flex: 1; min-width: 250px;">\r
    <div style="position: relative; width: 100%; padding-bottom: 100%;">\r
      <img\r
        src="/assets/images/seven-segment/1.jpg"\r
        alt="Physical prototype"\r
        style="position: absolute; width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"\r
      />\r
    </div>\r
    <p style="text-align: center; font-style: italic; margin-top: 1rem;">Physical prototype</p>\r
  </div>\r
</div>\r
\r
\r
Each cam has a groove on its bottom that drives a slider that rotates a segment of the display via a rack-and-pinion mechanism as the cam rotates.  The groove means that the cam can both push and pull the slider, allowing for a spring-less design.\r
\r
All the cams are driven through a sequence of 3D-printed bevel gears, which are in turn driven by a single input shaft.  This did not work particularly well as we didn't have the budget to add bearings to the gear shafts, so there was a lot of friction in the system.  However, it was still able to function well enough to demonstrate the concept.\r
\r
\r
## V1 Design\r
\r
ME130 is "Design of Planar Machinery", so our initial concept was to rotate and hide away the segments with a 4-bar linkage.  Using nails as pivots, we built a quick prototype that worked quite well:\r
\r
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: -15px;">Closed/hidden segment</p>\r
    <img src="/assets/images/seven-segment/4.jpg" alt="Closed/hidden segment" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
  <div style="flex: 1; min-width: 50px;">\r
    <p style="text-align: center; font-style: italic; margin-bottom: -15px;">Open/shown segment</p>\r
    <img src="/assets/images/seven-segment/5.jpg" alt="Open/shown segment" style="width: 100%; border-radius: 8px;" />\r
  </div>\r
</div>\r
\r
However, lever that actuated the 4-bar linkage from the cam was not very reliable and would often get stuck.\r
\r
So, we switched to a simpler design with a slider that pushed the segment up and down via a rack-and-pinion mechanism.  This was much more reliable, easier to print, and far easier to assemble.`;export{e as default};