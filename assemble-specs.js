#!/usr/bin/env node


"use strict";

var _ = require("lodash");
var fs = require("fs");
var path = require("path");

// Manifest to build
var defaultOutput = path.join(__dirname, "spec", "BaconSpec.coffee");

// Boilerplate: *header* and *footer*
var header = fs.readFileSync(path.join(__dirname, "spec", "boilerplate", "SpecHeader.coffee"), "utf-8");

function readPiece(pieceName) {
  return fs.readFileSync(path.join(__dirname, "spec", "specs", pieceName + ".coffee"), "utf-8");
}

var main = function(options){
  var pieces = [readPiece("_"), readPiece("core"), readPiece("frompromise")]
  var output = [
    header,
    pieces.join("\n"),
  ].join("\n");

  if (options.output) {
    try {fs.mkdirSync("dist")} catch (e) {}
    fs.writeFileSync(options.output, output);
  } else {
    console.log(output);
  }
}

if (require.main === module) {
  main({
    verbose: true,
    output: defaultOutput,
  });
}

exports.main = main;