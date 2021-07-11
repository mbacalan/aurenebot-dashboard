// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  // **optional** default: `{}`
  // override vscode settings
  // Notice: It only affects the settings used by Vetur.
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true,
    'vetur.validation.interpolation': false
  },
  // **optional** default: `[{ root: './' }]`
  // support monorepos
  projects: [
    './' // shorthand for only root.
  ]
}
