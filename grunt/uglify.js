'use strict';

// Optimize JS not handled by usemin and useminPrepare
module.exports = {
  templates: {
    files: {
      '<%= paths.dist.tld %>/scripts/ngtemplates.js' : '<%= paths.dist.tld %>/scripts/ngtemplates.js'
    }
  }
};