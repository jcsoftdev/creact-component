#!/usr/bin/env node

import yargs from 'yargs'
import configCLI from './config'
import createComponent from './create-component'

yargs.version('1.0.0')
yargs.command({
  command: 'create <component-name>',
  describe: 'Create a new component',
  builder: {
    typescript: {
      describe: 'Your name',
      alias: 't',
      type: 'boolean',
      default: false
    },
    path: {
      describe: 'Path to create component',
      alias: 'p',
      type: 'string',
      default: '.'
    }
  },
  handler: async argv => {
    const componentName = argv['component-name']
    await createComponent(componentName, argv)
  }
})

// TODO: Add delete command
yargs.command({
  command: 'delete <component-name>',
  describe: 'Delete a component',
  handler: async argv => {
    const componentName = argv['component-name']
    console.log(`Deleting component ${componentName}`)
  }
})

yargs.command({
  command: 'config',
  describe: 'Configure the CLI',
  builder: {
    defaultPath: {
      describe: 'Default path to create components',
      alias: 'p',
      type: 'string',
      default: 'app/components'
    },
    // todo : add default language
    defaultLanguage: {
      describe: 'Default language to create components',
      alias: 'l',
      type: 'string',
      default: 'js'
    },
    // todo: add default styles
    styles: {
      describe: 'Default styles to create components',
      alias: 's',
      type: 'string',
      default: 'scss'
    }
  },
  handler: async argv => {
    console.log('Configuring CLI')
    configCLI(argv)
  }
})

yargs.parse()
