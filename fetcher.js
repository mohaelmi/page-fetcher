const request = require("request")
const fs = require("fs")
//const readline  = require("readline");
//const rl = readline.createInterface(process.stdin, process.stdout)
const arguments = process.argv.slice(2)
const url = arguments[0]
const filePath = arguments[1]

request(url, (error, reponse, body) => {
  if(error){
    throw new error("error: ", error)
  }
  console.log(reponse.statusCode);

  //check if the file exists or not
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log('File does not exist.');
      // if not exist creat one
      fs.writeFile(filePath, body ,(error) => {
        if(error){
          console.log("eroor : ", error);
        }
        console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
        process.exit(0); // Exit with succeed status
      })

    } else {
      console.log('File exists.');
      process.exit(0); // Exit with succeed status
    }
  });
   
})















// if(fs.existsSync(filePath)){
  //   rl.question("do you want override", (answer) => {
  //     if(answer === "y") {
  //       fs.writeFile(arguments[1], body ,(error, data) => {
  //         if(error){
  //           console.log("eroor : ", error);
  //         } 
          
  //         // const stats = fs.Stats(arguments[1])
  //         console.log(`Downloaded and saved ${fs.Stats.size} bytes to ./index.html`);
  //       })
  //     }
  //   })
  // }else {