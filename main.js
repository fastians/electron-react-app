import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
let mainWindow;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the built index.html file
  mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  //   if (process.platform !== "darwin") {
  //     app.quit();
  //   }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
