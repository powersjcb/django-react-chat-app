#!/usr/bin/env bash

test -d venv || virtualenv --python=python3.6 venv

. venv/bin/activate

pip install -r ./requirements.txt