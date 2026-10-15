#!/bin/bash
# Export every 3rd train frame as WebP for the scroll-scrubbed ride (272 frames from 816).
T="$1"; FF="$HOME/bin/ffmpeg"
for OUT in "$HOME/Websites/moore-covenant-productions/public/train" "$HOME/Desktop/Desktop - Elijah’s MacBook Air/Websites/moore-covenant-productions/public/train"; do
  mkdir -p "$OUT"
  "$FF" -y -v error -framerate 24 -i "$T/metro/t_%04d.png" -vf "select='not(mod(n,3))',scale=1280:720" -vsync vfr -c:v libwebp -quality 72 -compression_level 6 "$OUT/t_%04d.webp" && echo "webp -> $OUT ($(ls "$OUT" | wc -l) files, $(du -sh "$OUT" | cut -f1))"
  "$FF" -y -v error -i "$T/metro/t_0090.png" -vf scale=1280:720 -q:v 3 "$OUT/poster.jpg"
done
# also a plain mp4 of the full ride for reference / social
"$FF" -y -v error -framerate 24 -i "$T/metro/t_%04d.png" -vf format=yuv420p -c:v libx264 -preset slow -crf 22 -movflags +faststart -an "$HOME/Desktop/Desktop - Elijah’s MacBook Air/Websites/moore-covenant-productions/design/metro-ride-v1.mp4" && echo "ride mp4 ok"
echo FRAMES_DONE
