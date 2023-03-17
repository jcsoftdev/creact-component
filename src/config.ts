import fs from 'fs'
import path from 'path'
import util from 'util'

const mkdir = util.promisify(fs.mkdir)
const writeFile = util.promisify(fs.writeFile)

const configCLI = async (argv: any) => {
  const configDir = path.join(__dirname, 'config')
  const configFile = path.join(configDir, 'config.json')
  await mkdir(configDir, {
    recursive: true
  })
  await writeFile(
    configFile,
    JSON.stringify(
      {
        defaultPath: argv.defaultPath,
        defaultLanguage: argv.defaultLanguage,
        styles: argv.styles
      },
      null,
      2
    )
  )
}

export default configCLI
