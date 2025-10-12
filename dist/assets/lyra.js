var e=`---\r
title: Lyra\r
description: A largely 3D-printed 6-axis robot arm with a 1-meter reach and large payload.\r
thumbnail: /assets/images/lyra/thumbnail.png\r
date: 2024-01-15\r
---\r
\r
# Lyra\r
\r
A largely 3D-printed 6-axis robot arm with a 1-meter reach and large payload.\r
\r
## Overview\r
\r
I built this for my ME102B class at Berkeley in Spring 2024, with Angel Garnica, David Gonzalez, and Daniel Morales.\r
\r
The arm has 1 planetary gear reduction and 5 cycloidal drives (3 distinct designs).  It has a total reach of about 1 meter and a theoretical payload capacity of 5kg at full extension.\r
\r
The name comes from the Lyra constellation, with 6 main stars representing the 6 joints of the arm.\r
\r
\r
\r
## Technical Details\r
<div style="display: flex; gap: 1rem;">\r
  <img src="/assets/images/lyra/cad-iso.png" alt="Isometric view of CAD" style="width: 85%; min-width: 300px; border-radius: 8px;" />\r
  <img src="/assets/images/lyra/no-joint56.jpg" alt="Animation of joint 2 cycloidal reducer" style="width: 85%; min-width: 300px; border-radius: 8px;" />\r
</div>\r
<p style="text-align: center; font-style: italic; margin-top: 5px;">Isometric CAD view, and physical robot without Joints 5 and 6</p>\r
\r
The arm has 6 degrees of freedom, with the first three driven by NEMA23 stepper motors and the last three by NEMA17 stepper motors.  We have MKS-SERVO57D and MKS-SERVO42D closed-loop stepper drivers controlling the motors.  All the drivers were connected to an Arduino Mega with a custom shield to power everything from a single 24V input.\r
\r
### Cycloidal Drives\r
\r
<div style="display: block; text-align: center;">\r
  <img src="/assets/images/lyra/j2-reducer-animation.gif" alt="Animation of joint 2 cycloidal reducer" style="width: 65%; min-width: 300px; border-radius: 8px;" />\r
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Joint 2 cycloidal reducer - center gray component is the input, the 6 rods immediately around it capture the output rotation</p>\r
</div>\r
\r
Joint 2 has a 24:1 3-disk cycloidal drive as it sees the highest torque, and joint 3 has a 19:1 3-disk cycloidal drive with about half the torque applied.  The motor sizes holding torques are amplified to 72Nm and 36Nm on each joint, equating to 7.3kg capacity at full extension, before any efficiency losses.\r
\r
Joints 4, 5, and 6 used the same 9:1 2-disk cycloidal drive design, that is ever so \r
\r
<div style="display: block; text-align: center;">\r
  <img src="/assets/images/lyra/nema17-gearbox.png" alt="Screenshot of NEMA 17 gearbox" style="width: 65%; min-width: 300px; border-radius: 8px;" />\r
  <p style="text-align: center; font-style: italic; margin-top: 5px;">NEMA 17 gearbox used in joints 4, 5, and 6</p>\r
</div>\r
\r
All of the drives are designed with ABS cycloidal disks, then steel pins for the housing and output rollers to minimize friction.\r
\r
### Joint 1\r
Joint 1 is the base rotation joint, with a spur gear reduction (3.7:1) connected to a planetary gearbox (4.3:1) totalling a 16:1 reduction.\r
\r
We used the spur gear reduction to allow the motor to be mounted offset from the center of rotation, leaving space to add a slip ring through a hollow shaft.  The slip ring allows for continuous rotation of the base joint without worrying about cable management.\r
\r
Joint 1 is then mounted to a pair of 2020 aluminum extrusions, to act as a large base to prevent the arm from tipping.  It wasn't the sturdiest base, but I had to carry the arm between my dorm and various workspaces, so it needed to be lightweight enough to lug around.\r
\r
<div style="display: block; text-align: center;">\r
  <img src="/assets/images/lyra/joint1.png" alt="Screenshot of Joint 1" style="width: 65%; min-width: 300px; border-radius: 8px;" />\r
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Robot base, power supply and Joint 1</p>\r
</div>\r
\r
To handle the massive moment loads on the base joint, we integrated a 3D-printed thrust bearing into the top of the base.\r
\r
<div style="display: block; text-align: center;">\r
  <img src="/assets/images/lyra/thrust-bearing.jpg" alt="Joint 1 thrust bearing top race" style="width: 65%; min-width: 300px; border-radius: 8px;" />\r
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Joint 1 thrust bearing top race</p>\r
</div>\r
\r
\r
### Joint 2 and 3\r
Joints 2 and 3 are fairly simple, with the motor connected directly to the output of the big cycloidal drives.\r
\r
To save weight and filament (and in no small part improve aesthetics), I designed the arm from joint 2 to joint 3 to have a section removed from the middle, supported by aluminum extrusions.\r
\r
<div style="display: block; text-align: center;">\r
  <img src="/assets/images/lyra/joint2-3.png" alt="Joint 2-3 arm" style="width: 65%; min-width: 300px; border-radius: 8px;" />\r
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Joint 2-3 arm</p>\r
</div>\r
\r
This is one of the places where 3D printed parts failed us, as the output disk of Joint 2 (4 wall perimeters, 40% infill) fully sheared off during testing:\r
\r
<div style="display: block; text-align: center;">\r
  <img src="/assets/images/lyra/sheared-output-disk.jpg" alt="Joint 2 failure" style="width: 65%; min-width: 300px; border-radius: 8px;" />\r
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Joint 2 output disk failure during testing</p>\r
</div>\r
\r
The fascinating part is that it didn't even shear across a layer, it broke multiple layers!  We reprinted it with 100% infill and it helped up fine, but this is one of the parts that really should be metal on the next iteration.  \r
\r
### Joint 4\r
Joint 4 is a roll joint on the forearm, again using a NEMA17 with a 9:1 cycloidal drive.  I wanted it to be able to rotate continuously, so I integrated a 24-pin slip ring, but this added the challenge of how to route the wiring through the joint with the motor sweeping through all angles.\r
\r
My solution was to integrate a ring gear into the housing of the joint, and have the motor offset to the side where it could mesh with the ring gear and drive the joint while leaving space for the bundle of wires to pass by the motor.\r
\r
<div style="display: block; text-align: center;">\r
  <img src="/assets/images/lyra/joint4-transparent.png" alt="Screenshot of joint 4" style="width: 65%; min-width: 300px; border-radius: 8px;" />\r
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Joint 4 with the internally meshing gears and slip ring output wires passing by the motor </p>\r
</div>\r
\r
### Joint 5/6\r
\r
Joints 5 and 6 are the wrist pitch and roll joints, powered through a differential joint.  The differential is driven by a pair of the same NEMA17 motors with 9:1 cycloidal drives by a sequence of a bevel gear and timing belt.\r
\r
We were not able to get a proper loop belt in time for our presentation, so we attempted to splice an open belt together with superglue and a half-lap joint, but it ended up being too weak and slipping under load, especially without a good tensioner.\r
\r
<div style="display: block; text-align: center;">\r
  <img src="/assets/images/lyra/joint5-6.png" alt="Screenshot of joints 5 and 6" style="width: 100%; min-width: 300px; border-radius: 8px;" />\r
  <p style="text-align: center; font-style: italic; margin-top: 5px;">Joint 5 and 6</p>\r
</div>\r
\r
## Future Improvements\r
\r
Through Summer 2024, I built a Milo V1.5 desktop CNC machine, so after I graduate I plan to machine a new set of aluminum cycloidal disks and housings for the first three joints, and redesign the wrist joints.\r
\r
I also want to use my own motor controllers I designed for my FOC Stepper Motor Controller project to replace the MKS drivers, as I have much more control over their operation and can implement more advanced control algorithms.\r
\r
## Links\r
\r
- [Project Repository](https://github.com/chpaxson/lyra)`;export{e as default};