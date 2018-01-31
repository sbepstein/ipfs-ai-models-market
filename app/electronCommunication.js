const {ipcMain, ipcRenderer, remote} = require('electron');
//var main = remote.require("./main.js");


var fs = require('fs');
function saveFile(filepath, data) {
  fs.writeFile(filepath, data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
}
function readFile(filepath) {
  var contents = fs.readFileSync(filepath).toString();
  return(contents);
}

ipcMain.on('getuser', (event, arg) => {
  //on app start, gets the user
    var content = readFile("./keys/user.txt");
    var user = JSON.parse(content);
    console.log(user);
    //send the user to the view
    //TODO get the user from view
    event.sender.send('user', user);
});

ipcMain.on('newuser', (event, arg) => {
    console.log(arg);
    var user = arg;
    var userString = JSON.stringify(user);
    saveFile("./keys/user.txt", userString);
});

ipcMain.on('newmodel', (event, arg) => {
    console.log(arg);
    //save model data


    // Reply on async message from renderer process
    event.sender.send('newmodel-reply', arg);
});

ipcMain.on('newmodel-reply', (event, arg) => {
    console.log(arg);
});
