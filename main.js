const { app, ipcMain, BrowserWindow, dialog, remote, webContents } = require("electron");
const fs = require("fs");

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1080,
        minHeight: 720,
        title: "Citadel",
        resizable: true,
        frame: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            // devTools: false
        }
    });
    
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

let projectPath;
let projectName;
let projectRes;
let charPath;
let orgPath;
let eventPath;

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

// Title Bar Controls
ipcMain.on("app/close", () => app.quit()); 
ipcMain.on("app/maximize", () => {
    if(!appWin.isMaximized()){
        appWin.maximize()
    }
    else {
        appWin.restore()
    }
});
ipcMain.on("app/hide", () => appWin.minimize());

// Project Menu Controls
ipcMain.on("projects/new", async () => { 
    console.log('NEW PROJECT');
    let newProject = await dialog.showOpenDialog( appWin, {properties: ['openDirectory', 'createDirectory', 'dontAddToRecent'], title: 'Select an empty folder...'} ) 
    if(!newProject.canceled) {
        console.log(newProject);
        if(fs.readdirSync(newProject.filePaths + '/').length === 0) {
            console.log('EMPTY PATH');
            appWin.webContents.send('projects/createNew', newProject.filePaths + '/');
            projectPath = newProject.filePaths + '/';
        }
        else {
            console.log('NOT EMPTY PATH');
            dialog.showMessageBoxSync(appWin, {title: 'Error', message: 'Selected directory is not empty.', type: 'error'});
        }
    }
})

ipcMain.on("projects/open", async () => {
    console.log('OPEN PROJECT');
    let project = await dialog.showOpenDialog( appWin, {filters: [{name: 'Citadel Project File', extensions: ["ctd"]}]} )
    if(!project.canceled) {
        console.log(project);
        appWin.webContents.send('projects/load', project.filePaths + '/');
        projectPath = project.filePaths + '/';
    }
})

// Project Creation
ipcMain.on("projects/create", (event, args) => {
    console.log(args);
    fs.writeFileSync(args.file, `{\n    projectName: '${args.projectName}',\n    projectResume: '${args.projectResume}',\n    charactersPath: './Characters/',\n    eventsPath: './Events',\n    organizationsPath: './Organizations'\n}`);
    fs.mkdirSync(args.path + 'Characters');
    fs.mkdirSync(args.path + 'Organizations');
    fs.mkdirSync(args.path + 'Events');
    projectName = args.projectName;
})

// Characters Control
ipcMain.on("characters/new", () => {

})