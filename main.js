import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

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
    // Kill the Python process when the Electron app is closed
    if (pythonProcess) {
      pythonProcess.kill();
    }
  });

  // Start the Python backend when Electron app is ready
  startPythonBackend();
}

function startPythonBackend() {
  // Replace 'python' with the path to your Python executable if needed
  const pythonProcess = spawn("python3", [
    path.join(__dirname, "backend", "main.py"),
  ]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // Keep the app running even if all windows are closed
  // Uncomment the lines below if you want to quit the app when all windows are closed
  // if (process.platform !== "darwin") {
  //   app.quit();
  // }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
