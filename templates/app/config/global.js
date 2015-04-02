// global config
module.exports = {
  style: {
    // always re-read this config, or work with cached values
    fresh: false,
    // stylus options
    stylus: {},
    // auto prefix borwsers
    browsers: ['last 3 versions'],
    // clean css options
    minify: {
      // - set to false to disable advanced optimizations - selector & property merging, reduction, etc.
      advanced: undefined,
      // - set to false to disable aggressive merging of properties.
      aggressiveMerging: undefined,
      // - turns on benchmarking mode measuring time spent on cleaning up (run npm run bench to see example)
      benchmark: undefined,
      // - enables compatibility mode, see below for more examples
      compatibility: undefined,
      // - set to true to get minification statistics under stats property (see test/custom-test.js for examples)
      debug: undefined,
      // - a hash of options for @import inliner, see test/protocol-imports-test.js for examples
      inliner: undefined,
      // - whether to keep line breaks (default is false)
      keepBreaks: undefined,
      // - * for keeping all (default), 1 for keeping first one only, 0 for removing all
      keepSpecialComments: undefined,
      // - whether to merge @media blocks (default is true)
      mediaMerging: undefined,
      // - whether to process @import rules
      processImport: undefined,
      // - set to false to skip URL rebasing
      rebase: undefined,
      // - path to resolve relative @import rules and URLs
      relativeTo: undefined,
      // - set to false to disable restructuring in advanced optimizations
      restructuring: undefined,
      // - path to resolve absolute @import rules and rebase relative URLs
      root: undefined,
      // - rounding precision; defaults to 2; -1 disables rounding
      roundingPrecision: undefined,
      // - set to false to skip shorthand compacting (default is true unless sourceMap is set when it's false)
      shorthandCompacting: undefined,
      // - exposes source map under sourceMap property, e.g. new CleanCSS().minify(source).sourceMap (default is false) If input styles are a product of CSS preprocessor (LESS, SASS) an input source map can be passed as a string.
      sourceMap: undefined,
      // - path to a folder or an output file to which rebase all URLs
      target: undefined
    }
  }
}