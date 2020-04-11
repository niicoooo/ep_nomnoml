#! /usr/bin/env node

/*
Copyright (c) 2014 Daniel Kallin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var fs = require('fs')
var path = require('path');
var nomnoml = require('./nomnoml.js')

var args = process.argv

if (args[2] == '--help' || args.length == 2){
  console.log(`
  Nomnoml command line utility for generating SVG diagrams.

  Load source file and send rendered svg to stdout:

  > node nomnoml-cli.js <source_file>

  Load source file and save rendered svg to <output_file>:
  
  > node nomnoml-cli.js <source_file> <output_file>

  Third parameter overrides the import depth limit
  that protects us from recursive imports:

  > node nomnoml-cli.js <source_file> <output_file> <max_import_chain_length>`)
  return
}

var maxImportChainLength = args[4] || 10

var svg = nomnoml.renderSvg(preprocessFile(args[2], 0))
if (args[3]){
  fs.writeFileSync(args[3], svg)
}
else {
  console.log(svg)
}

function preprocessFile(filepath, depth){
  if (depth > maxImportChainLength)
    throw Error('max_import_chain_length exceeded')
  var source = fs.readFileSync(filepath, {encoding:'utf8'})
  return source.replace(/#import: *(.*)/g, function (a, file) {
    return preprocessFile(path.dirname(filepath) + '/' + file, depth+1)
  })
}