const electron = require("electron")
const { app, BrowserWindow, Menu, ipcMain } = electron

let MainWindow

app.on("ready", function(){
    MainWindow = new BrowserWindow({
        width: 1600,
        minWidth: 1000,
        height: 900,
        minHeight: 600,
        center: true,
        darkTheme: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    MainWindow.loadFile("index.html")

    Menu.setApplicationMenu(Menu.buildFromTemplate(MenuBarTemplate))
})

const MenuBarTemplate = [
    {
        label: "Utils",
        submenu: [
            {
                label: "Quit",
                accelerator: "Ctrl+Q",
                click(){
                    app.quit()
                }
            },
            {
                label: "DevTools",
                accelerator: "Ctrl+D",
                click(){
                    MainWindow.toggleDevTools()
                }
            }
        ]
    }
]

ipcMain.on("app:controls", (event, arg) => {
    if(arg == "close"){
        app.quit()
    }
    else if(arg == "maximize"){
        MainWindow.maximize()
    }
    else if(arg == "minimize"){
        MainWindow.minimize()
    }
})