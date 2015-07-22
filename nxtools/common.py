import sys

if sys.version_info[:2] >= (3, 0):
    decode_if_py3 = lambda x: x.decode("utf8")
else:
    decode_if_py3 = lambda x: x  