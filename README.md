# CECS 448 Project 2 UI Prototype - Melotune

## How to build and run

1. Open a terminal emulator (Terminal on Windows, Terminal.app on macOS, applicable terminal emulator under Linux.)

2. Install Node.js and the npm, if you do not have both installed already.
    - For Windows, install using msys2, docker, fnm, or nvm, with npm. More details on the Node.js website: https://nodejs.org/en/download
    - For macOS, it is recommended to use Homebrew to install Node.js and npm via `brew install node npm`. With MacPorts the install command is similar. If you do not want to use Homebrew or MacPorts, then go to website linked for Windows install.
    - For Linux, install via your applicable package manager or deploy via docker container.

3. Test node and npm. If they do not work, restart your terminal emulator of choice. You may need to add the path for node and npm to your PATH environment variable in ~/.zshrc for macOS or Windows advanced system settings.

4. Clone this repository.

5. Go to the repository directory in the terminal emulator, and run `npm run dev`. npm should be installing all the required dependencies that the web app needs before running, if not, run `npm install` and then `npm run dev`.

6. If everything is working, the website should be working on the localhost address that the web app gives you.
