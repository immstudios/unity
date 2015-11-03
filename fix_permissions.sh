#!/bin/bash
BASEDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

chmod 755 unity
chmod 644 unity/*.py

chmod 755 vendor/
chmod 755 vendor.sh
chmod 644 vendor.lst



chmod 755 server.py
chmod 644 .gitignore
chmod 644 LICENSE
chmod 644 README.md
