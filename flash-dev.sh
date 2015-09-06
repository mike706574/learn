#!/bin/bash
rm -rf resources/public/js/flash*
lein cljsbuild auto flash-dev
