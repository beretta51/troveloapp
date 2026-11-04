#!/bin/zsh
# setlang.sh SIM LANG : puts a simulator in one of the help's languages, the
# way an iPhone bought in that country is set up (language, region, keyboard,
# 12 or 24-hour time), with Trovelo's home currency to match, autocorrect and
# spell check off, and the status bar at 9:41. LANG is the help's slug (de,
# pt-br, zh-hant…); "en" puts it back as the English screens were taken.
#
#   ./setlang.sh C37F0ACC-8AC6-4375-91A6-6713CB0E7B1C de
set -e
SIM=${1:?simulator UDID}; LANG_=${2:?language slug}
APP=com.eduardopinillos.trovelo

# slug: languages | locale | keyboards | clock | home currency
case $LANG_ in
  en)      L=(en-US pt-PT es-PT); LOC=en_US@rg=ptzzzz; KB=("en_US@sw=QWERTY;hw=Automatic"); H=12; CUR=USD ;;
  es)      L=(es-ES); LOC=es_ES; KB=("es_ES@sw=QWERTY-Spanish;hw=Automatic"); H=24; CUR=EUR ;;
  de)      L=(de-DE); LOC=de_DE; KB=(de_DE); H=24; CUR=EUR ;;
  fr)      L=(fr-FR); LOC=fr_FR; KB=(fr_FR); H=24; CUR=EUR ;;
  it)      L=(it-IT); LOC=it_IT; KB=(it_IT); H=24; CUR=EUR ;;
  pt-br)   L=(pt-BR); LOC=pt_BR; KB=(pt_BR); H=24; CUR=BRL ;;
  ja)      L=(ja-JP); LOC=ja_JP; KB=(ja_JP-Romaji ja_JP-Kana); H=24; CUR=EUR ;;
  ko)      L=(ko-KR); LOC=ko_KR; KB=(ko_KR "en_US@sw=QWERTY;hw=Automatic"); H=12; CUR=KRW ;;  # Korean iPhones come with English too
  zh-hans) L=(zh-Hans-CN); LOC=zh_CN; KB=("zh_Hans-Pinyin@sw=Pinyin-Simplified" "en_US@sw=QWERTY;hw=Automatic"); H=24; CUR=CNY ;;
  zh-hant) L=(zh-Hant-HK); LOC=zh_HK; KB=("zh_Hant-Pinyin@sw=Pinyin-Traditional;hw=Automatic" "zh_Hant-Zhuyin@sw=Zhuyin;hw=Automatic" "en_US@sw=QWERTY;hw=Automatic"); H=12; CUR=HKD ;;
  nl)      L=(nl-NL); LOC=nl_NL; KB=(nl_NL); H=24; CUR=EUR ;;
  sv)      L=(sv-SE); LOC=sv_SE; KB=(sv_SE); H=24; CUR=SEK ;;
  da)      L=(da-DK); LOC=da_DK; KB=(da_DK); H=24; CUR=DKK ;;
  *) echo "unknown language $LANG_"; exit 1 ;;
esac

state=$(xcrun simctl list devices | grep $SIM | grep -o "(Booted)" || true)
[[ -n $state ]] || { xcrun simctl boot $SIM; xcrun simctl bootstatus $SIM -b >/dev/null; }
d() { xcrun simctl spawn $SIM defaults "$@"; }
d write -g AppleLanguages -array $L
d write -g AppleLocale $LOC
d write -g AppleKeyboards -array $KB "emoji@sw=Emoji"
for k in KeyboardAutocorrection KeyboardPrediction KeyboardAutocapitalization KeyboardCheckSpelling; do
  d write com.apple.Preferences $k -bool false
done
d write com.apple.keyboard.preferences KeyboardCheckSpelling -bool false
d write com.apple.keyboard.preferences KeyboardLastUsed "${KB[1]}"
# Boot in 12-hour time so the status bar override reads "9:41" and not
# "09:41"; switch to 24-hour afterwards: apps launched later read it.
d delete -g AppleICUForce24HourTime 2>/dev/null || true
d write -g AppleICUForce12HourTime -bool true

# Trovelo's home currency lives in its own defaults: written while it's off.
# A cloned simulator keeps using its source's app folder (only the trips are
# its own), so clones share these settings: run one currency at a time.
plist=$(xcrun simctl get_app_container $SIM $APP data)/Library/Preferences/$APP.plist
xcrun simctl terminate $SIM $APP 2>/dev/null || true
xcrun simctl shutdown $SIM
[[ -f $plist ]] && plutil -replace homeCurrency -string $CUR $plist

xcrun simctl boot $SIM; xcrun simctl bootstatus $SIM -b >/dev/null
xcrun simctl status_bar $SIM override --time "9:41" --dataNetwork wifi --wifiMode active --wifiBars 3 \
  --cellularMode active --cellularBars 4 --batteryState charged --batteryLevel 100
if [[ $H == 24 ]]; then
  d delete -g AppleICUForce12HourTime 2>/dev/null || true
  d write -g AppleICUForce24HourTime -bool true
fi
echo "$SIM: $LANG_ ($L, $LOC, ${H}h, $CUR)"
