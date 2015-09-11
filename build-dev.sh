#!/bin/bash
rm -rf resources/public/js/$1*
lein cljsbuild auto $1-dev
