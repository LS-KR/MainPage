#!/bin/bash

sed -i 's/"\/assets\/"/"\/MainPage\/assets\/"/g' ./dist/index.html
sed -i 's/"\/assets\/"/"\/MainPage\/assets\/"/g' ./dist/**/*.js
sed -i 's/"\/assets\/"/"\/MainPage\/assets\/"/g' ./dist/**/*.css