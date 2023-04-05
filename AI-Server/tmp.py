import subprocess
import time
import logging
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
#
#
# class ConsoleOutputEventHandler(FileSystemEventHandler):
#     def __init__(self, expected_output):
#         super().__init__()
#         self.expected_output = expected_output
#         self.prev_output = ""
#
#     def on_modified(self, event):
#         with open(event.src_path) as f:
#             output = f.read()
#             if self.expected_output in output and self.expected_output != self.prev_output:
#                 logging.info(f"{self.expected_output}가 출력됩니다")
#                 self.prev_output = self.expected_output
#
#
# def monitor_console_output(command, expected_output):
#     logging.info(f"{command} 명령어를 실행합니다")
#     with open("output.txt", "w") as f:
#         subprocess.call(command, stdout=f, shell=True)
#
#     logging.info(f"{expected_output} 출력을 모니터링합니다")
#     event_handler = ConsoleOutputEventHandler(expected_output)
#     observer = Observer()
#     observer.schedule(event_handler, ".", recursive=False)
#     observer.start()
#
#     try:
#         while True:
#             time.sleep(1)
#     except KeyboardInterrupt:
#         observer.stop()
#     observer.join()
#
#
# logging.basicConfig(level=logging.INFO)
# monitor_console_output("python www.py", "2")
import subprocess

cmd = "python www.py"
process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, encoding='utf-8')
while True:
    output = process.stdout.readline()
    if output == '' and process.poll() is not None:
        break
    if output:
        print(output.strip())

