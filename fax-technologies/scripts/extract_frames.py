import cv2
import os

video_path = os.path.join("public", "videos", "fabx_cine.mp4")
output_dir = os.path.join("public", "frames")

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Total video frames: {total_frames}")

count = 0
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    count += 1
    frame_name = f"frame_{count:04d}.jpg"
    out_path = os.path.join(output_dir, frame_name)
    cv2.imwrite(out_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 92])

cap.release()
print(f"Successfully extracted {count} frames from video to {output_dir}")
