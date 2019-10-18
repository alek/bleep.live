// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const electron = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let controllerWindow
let clientWindow

function createWindow () {

  var screenElectron = electron.screen;
  var screen = screenElectron.getAllDisplays()[0]
  
  // var screenWidth = screen["bounds"].width
  // var screenHeight = screen["bounds"].height

  var screenWidth = screen["bounds"].width/2
  var screenHeight = screen["bounds"].height/2


  // console.log(screen)
  console.log(screenWidth)

  // Create the controller browser window.
  controllerWindow = new BrowserWindow({
    width: screenWidth*0.8,
    height: screenHeight*1.0,
    x: 100,
    y: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  controllerWindow.loadFile('controller.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  controllerWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    controllerWindow = null
  })

  // Create the controller browser window.
  clientWindow = new BrowserWindow({
    width: screenWidth*0.8,
    height: screenHeight*1.0,
    x: screenWidth,
    y: 300,
    // frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  clientWindow.loadFile('client.html')
  clientWindow.showInactive()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  clientWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    clientWindow = null
  })


}

// just in case
if (process.argv[2] == 'controller') {
  console.log('bleep running in controller mode')
} else if (process.argv[2] == 'client') {
  console.log('bleep running in client mode')
} else {
  console.log('usage: npm run [controller|client]')
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (controllerWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
