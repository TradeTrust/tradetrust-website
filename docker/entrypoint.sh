#!/usr/bin/env bash

case "${CONTAINER_MODE,,}" in
  server)
    npm run dev
  container)
    echo "Container started"
    tail -f /dev/null
    ;;
  *)
    echo "No mode specified" && exit 1
esac
