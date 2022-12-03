#!/usr/bin/env bash

set -e

git add . && git commit -m "fix all" && git push origin-2 develop && git push origin develop


# Keep Container Running
tail -f /dev/null
