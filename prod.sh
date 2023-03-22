#!/bin/bash
PORT=9020 pm2 start src/index.ts --name cities-api --interpreter="deno" --interpreter-args="run --allow-read --allow-env --allow-net"
