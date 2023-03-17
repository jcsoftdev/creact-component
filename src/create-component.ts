import fs from 'fs'
import path from 'path'
import util from 'util'

const mkdir = util.promisify(fs.mkdir)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const createJSComponent = async (componentName: string, fn: FileNames) => {
  await Promise.all([
    writeFile(fn.index, `export { default } from './${componentName}';\n`),
    writeFile(
      fn.jsx,
      `import styles from './${componentName}.module.scss'

const ${componentName} = () => {
  return (
    <div>
      
    </div>
  )
}

export default ${componentName}
`
    ),
    writeFile(fn.style, `.${componentName} {\n  \n}\n`)
  ])
}

const getFileNames = async (componentName: string): Promise<FileNames> => {
  // check if exists in config file and use that
  const buff = await readFile(path.join(__dirname, 'config', 'config.json'))
  const config = JSON.parse(buff.toString())

  const { defaultPath, defaultLanguage, styles } = config

  const paths = {
    index: path.join('app/components', componentName, 'index.js'),
    jsx: path.join('app/components', componentName, `${componentName}.jsx`),
    style: path.join(
      'app/components',
      componentName,
      `${componentName}.module.scss`
    )
  }

  if (defaultPath) {
    paths.index = path.join(defaultPath, componentName, 'index.js')
    paths.jsx = path.join(defaultPath, componentName, `${componentName}.jsx`)
    paths.style = path.join(
      defaultPath,
      componentName,
      `${componentName}.module.scss`
    )
  }

  if (defaultLanguage === 'ts') {
    paths.jsx = paths.jsx.replace('.jsx', '.tsx')
  }
  if (styles === 'css') {
    paths.style = paths.style.replace('.scss', '.css')
  }
  if (styles === 'less') {
    paths.style = paths.style.replace('.scss', '.less')
  }
  return paths
}

async function createComponent(componentName: string, argv: any) {
  try {
    const fileNames = await getFileNames(componentName)
    const directory = [...fileNames.index.split('/')]
    directory.pop()
    const dir = directory.join('/')
    await mkdir(dir, {
      recursive: true
    })

    if (argv.typescript) {
      console.log('Creating TypeScript component')
    } else {
      await createJSComponent(componentName, fileNames)
    }

    console.log(`Component ${componentName} created successfully!`)
  } catch (err) {
    console.error(`Error creating component ${componentName}:`, err)
  }
}

export default createComponent
