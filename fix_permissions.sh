#!/bin/bash
BASEDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

find $BASEDIR/site/ -type d -exec chmod 775 {} +
find $BASEDIR/site/ -type f -exec chmod 664 {} +

chmod 755 site/
chmod 755 unity/

chmod 644 unity/*.py
chmod 644 nxtv/*.py

chmod 755 vendor/
chmod 755 vendor.sh
chmod 644 vendor.lst

chmod 755 server.py
chmod 644 .gitignore
chmod 644 LICENSE
chmod 644 README.md
