#!/bin/bash

# Exit on any error
set -e
export OPENAI_TEMPERATURE=0.7

python3 .github/scripts/toc/independence_info.py
