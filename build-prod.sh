#!/bin/bash
rm -rf resources/public/js/$1*
lein cljsbuild once $1-prod
