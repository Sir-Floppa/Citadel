const { app, ipcMain, BrowserWindow, dialog, remote, webContents } = require("electron");
const fs = require("fs");
const path = require("path");

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
        projectPath = path.dirname(project.filePaths[0]);
        projectName = project.filePaths[0].split(/(\\|\/)/).pop();
        console.log(projectPath);
    }
})

// Project Creation
ipcMain.on("projects/create", (event, args) => {
    console.log(args);
    fs.writeFileSync(args.file, `{\n   "projectName": "${args.projectName}",\n   "projectResume": "${args.projectResume}",\n   "charactersPath": "./Characters/",\n   "eventsPath": "./Events",\n   "organizationsPath": "./Organizations"\n}`);
    fs.mkdirSync(args.path + 'Characters');
    fs.mkdirSync(args.path + 'Organizations');
    fs.mkdirSync(args.path + 'Events');
    projectName = args.projectName + '/';
})

// Characters Control
ipcMain.on("characters/new", (event, args) => {
    console.log(args);
    console.log(projectPath);
    console.log(`${projectPath}/${projectName}`);
    let jsonFile = fs.readFileSync(`${projectPath}/${projectName}`);
    let projectFile = JSON.parse(jsonFile);
    console.log(projectFile);
    let newFileContent = `{\n   "name": "${args.name}",\n   "birth": "${args.birth}",\n   "origin": "${args.origin}",\n   "resume": "${args.resume}"\n}`
    fs.writeFileSync(`${projectPath}/${projectFile.charactersPath}/${args.name}.json`, newFileContent);
    appWin.webContents.send('characters/created')
})

ipcMain.on("characters/load", () => {
    let parsedFiles = [];
    let jsonFile = fs.readFileSync(`${projectPath}/${projectName}`);
    let projectFile = JSON.parse(jsonFile);
    charPath = `${projectPath}/${projectFile.charactersPath}`
    let files = fs.readdirSync(charPath);
    console.log(files);
    files.forEach(file => {
        console.log('CHAR PATH', `${charPath}/${file}`);
        let content = fs.readFileSync(`${charPath}/${file}`);
        parsedFiles.push(JSON.parse(content));
    })
    console.log(parsedFiles);
    appWin.webContents.send('characters/send', parsedFiles);
})

// Events Control
ipcMain.on("events/new", (event, args) => {
    console.log(args);
    console.log(projectPath);
    console.log(`${projectPath}/${projectName}`);
    let jsonFile = fs.readFileSync(`${projectPath}/${projectName}`);
    let projectFile = JSON.parse(jsonFile);
    console.log(projectFile);
    let newFileContent = `{\n   "name": "${args.name}",\n   "begin": "${args.begin}",\n   "finish": "${args.finish}",\n   "resume": "${args.resume}"\n}`
    fs.writeFileSync(`${projectPath}/${projectFile.eventsPath}/${args.name}.json`, newFileContent);
    appWin.webContents.send('events/created')
})

ipcMain.on("events/load", () => {
    let parsedFiles = [];
    let jsonFile = fs.readFileSync(`${projectPath}/${projectName}`);
    let projectFile = JSON.parse(jsonFile);
    eventsPath = `${projectPath}/${projectFile.eventsPath}`
    let files = fs.readdirSync(eventsPath);
    console.log(files);
    files.forEach(file => {
        console.log('EVENT PATH', `${eventsPath}/${file}`);
        let content = fs.readFileSync(`${eventsPath}/${file}`);
        parsedFiles.push(JSON.parse(content));
    })
    console.log(parsedFiles);
    appWin.webContents.send('events/send', parsedFiles);
})

// Organizations Control
ipcMain.on("organizations/new", (event, args) => {
    console.log(args);
    console.log(projectPath);
    console.log(`${projectPath}/${projectName}`);
    let jsonFile = fs.readFileSync(`${projectPath}/${projectName}`);
    let projectFile = JSON.parse(jsonFile);
    console.log(projectFile);
    let newFileContent = `{\n   "name": "${args.name}",\n   "location": "${args.location}",\n   "resume": "${args.members}"\n}`
    fs.writeFileSync(`${projectPath}/${projectFile.organizationsPath}/${args.name}.json`, newFileContent);
    appWin.webContents.send('organizations/created')
})

ipcMain.on("organizations/load", () => {
    let parsedFiles = [];
    let jsonFile = fs.readFileSync(`${projectPath}/${projectName}`);
    let projectFile = JSON.parse(jsonFile);
    organizationsPath = `${projectPath}/${projectFile.organizationsPath}`
    let files = fs.readdirSync(organizationsPath);
    console.log(files);
    files.forEach(file => {
        console.log('EVENT PATH', `${organizationsPath}/${file}`);
        let content = fs.readFileSync(`${organizationsPath}/${file}`);
        parsedFiles.push(JSON.parse(content));
    })
    console.log(parsedFiles);
    appWin.webContents.send('organizations/send', parsedFiles);
})