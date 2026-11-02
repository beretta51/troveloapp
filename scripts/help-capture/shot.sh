#!/bin/zsh
# shot.sh NAME : the simulator's screen as $CAP/NAME.png (full size) plus a
# 402-wide preview in $CAP/p/NAME.png, where 1 pixel is 1 point: read tap
# spots and mark boxes straight from it. SIM picks the simulator.
CAP=${CAP:?set CAP to the capture folder}
SIM=${SIM:-AA71A69A-98D6-4F19-8F2E-0FC5BE7191E1}
mkdir -p $CAP/p
xcrun simctl io $SIM screenshot $CAP/$1.png >/dev/null 2>&1
sips -Z 874 $CAP/$1.png --out $CAP/p/$1.png >/dev/null 2>&1
echo $CAP/p/$1.png
