# Help screenshots

How the iPhone screens in `images/trovelo/help/` (English) and
`images/trovelo/help/<lang>/` are made. Every screen is the real app in the
iOS Simulator; nothing is drawn by hand.

## 1. The demo trips

```sh
python3 make_seed.py es /path/help-tokio-es.trovelo          # Tokyo & Kyoto, 9 to 15 Nov 2026
python3 make_porto.py es /path/help-oporto-es.trovelo 120    # a live trip whose flight leaves in 2 h
```

`seed_words.py` holds what a traveller would have typed in each language:
card titles, notes, the trip's name, the home currency. Places keep their real
names. A new language is a new entry there.

## 2. The simulator in that language

The test iPhone (iPhone 17, iOS 27) is `AA71A69A-98D6-4F19-8F2E-0FC5BE7191E1`.

```sh
A=AA71A69A-98D6-4F19-8F2E-0FC5BE7191E1
xcrun simctl spawn $A defaults write -g AppleLanguages -array es-ES
xcrun simctl spawn $A defaults write -g AppleLocale es_ES
xcrun simctl spawn $A defaults write -g AppleKeyboards -array "es_ES@sw=QWERTY-Spanish;hw=Automatic" "emoji@sw=Emoji"
xcrun simctl spawn $A defaults write -g AppleICUForce24HourTime -bool true   # what that country's iPhones show
xcrun simctl shutdown $A && xcrun simctl boot $A && xcrun simctl bootstatus $A -b
xcrun simctl status_bar $A override --time "9:41" --dataNetwork wifi --wifiMode active --wifiBars 3 \
  --cellularMode active --cellularBars 4 --batteryState charged --batteryLevel 100
xcrun simctl launch --terminate-running-process $A com.eduardopinillos.trovelo \
  -seedTripFile /path/help-tokio-es.trovelo -isProUser YES
```

`-seedTripFile` imports a trip once (a debug-build flag, see TripFileSeed.swift
in the app). English used `en-US`, `en_US` and 12-hour time. Put the
simulator back to English when done.

## 3. Shoot, export, mark

```sh
export CAP=/some/folder              # full-size captures and 402-wide previews
./shot.sh NAME                       # $CAP/NAME.png and $CAP/p/NAME.png (1 px = 1 pt)
python3 export.py --lang es NAME i-overview [x,y,w,h …]   # the site's JPG, with optional blurred boxes
python3 marks.py --lang es check.jpg "i-overview:24,262,52,62;82,262,52,62"   # draw marks to check them
python3 sheet.py --lang es sheet.jpg i-overview i-day-kyoto                   # contact sheet
```

Marks are measured into `$CAP/marks-<lang>.json`, keyed `slug/ios/step/phone`
(or `start-here/slug`), in points on the 402 × 874 screen. Then:

```sh
python3 merge_marks.py --lang es --missing   # what's left, and any count or class that differs from English
python3 merge_marks.py --lang es --write     # into scripts/help_es.py (MARKS)
```

`recipes-es.md` says how each Spanish screen was reached, tap by tap, to
rebuild it in the next language.
