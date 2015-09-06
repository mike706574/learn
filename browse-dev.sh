#!/bin/bash
rm -rf resources/public/js/browse*
lein cljsbuild auto browse-dev
