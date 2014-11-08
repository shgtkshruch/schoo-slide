#!/usr/bin/env node

var schoo = require('./');
var classNum = process.argv[2];

process.env.NODE_ENV = "production";

schoo(classNum);
