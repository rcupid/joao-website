const { component, view } = require('../config/materialType')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const cwd = process.cwd()

const COMPONENT_PATH_SECTION = '/material/generate_components'

/**
 * add component
 * @param {*} list
 */
function addComponent(list) {
  console.log(chalk.blue('Add component starting...'))
  let existComponents = getComponents()
  console.log(existComponents)

  //没有物料
  if (!existComponents || !existComponents.length) {
    console.log(
      chalk.yellow(
        'the component of material is empty.\n' +
          'Please exec \n' +
          'myth update'
      )
    )
    return
  }

  list.forEach(item => {
    let component = item.indexOf('.vue') > -1 ? item : `${item}.vue`
    console.log(component)
    if (existComponents.indexOf(component) > -1) {
      //文件存在，转移到项目目录下面
      let filePath = path.join(
        __dirname,
        '..',
        COMPONENT_PATH_SECTION,
        component
      )

      console.log(filePath)
      let data = fs.readFileSync(filePath, { encoding: 'utf-8' })
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.log(chalk.red(`Add ${item}.vue failed`))
          process.exit(1)
        }
        let targetDir = path.join(cwd, '/src/component/', component) //fs.writeFile()
        fs.writeFile(targetDir, data, err => {
          if (err) {
            console.log(chalk.red(`Add ${item}.vue failed`))
            process.exit(1)
          } else {
            console.log(chalk.yellow(`Add ${item}.vue success!`))
          }
        })
        console.log(targetDir)
      })
    } else {
      console.log(
        chalk.red(
          `${component} is not exist in materials \n;` +
            'You can commmad \n' +
            ' myth update \n' +
            'Then,try again'
        )
      )
    }
  })
}
//add view
function addView(list) {
  console.log(chalk.blue('Add view starting...'))
}

/**
 * 查询所有组件
 */
function getComponents() {
  return getFiles(COMPONENT_PATH_SECTION)
}

/**
 * 在对应的文件中添加components
 **/

/**
 * 扫描文件列表
 * @param {*} url
 */
function getFiles(url) {
  let fileDir = path.join(__dirname, '..', url)
  return fs.readdirSync(fileDir)
}
module.exports = function(materialType, list) {
  switch (materialType) {
    case component:
      addComponent(list)
      break
    case view:
      addView(list)
      break
  }
}
