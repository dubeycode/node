import fs from "fs/promises"
import fsn from "fs"
import path from "path"

const basepath= "D:\\Node\\Ex-15_clear_cluter"

let files = await fs.readdir(basepath)
// console.log(files)

let extension =[]
for (const items of files) {
  let ext =items.split(".")[items.split(".").length-1]
  // console.log(ext)
  if(ext !="js" && ext !="json" && items.split(".").length>1){
    if(fsn.existsSync(path.join(basepath,ext))) {
    // mover the file to the directory if it not ajs or json file
    fs.rename(path.join(basepath,items),path.join(basepath,ext,items))
  }else{
    fs.mkdir(ext)
  }
  // console.log(items);
  }
  
}