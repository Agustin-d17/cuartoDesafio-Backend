const { Console } = require('console');
const fs = require('fs')


let newContent = [];

class Contenedor {
    constructor(file) {
        this.file = file;
    }

    async readFile(){
        try{
            const content = await fs.promises.readFile(this.file, 'utf8');
            const parsedContent = JSON.parse(content)
            return parsedContent
        }catch(err){
            console.log(err)
        }
    }

    async save(obj){
        obj.id = newContent.length + 1
        newContent.push(obj)

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(newContent), 'utf8') 
            // console.log(obj.id)
            return obj.id 
        }catch(err){
            console.log(err)
        }
    }

    // async getById(id){
    //     const content = await this.readFile()

    //     const element = content.find(el => el.id === id)
    //     return element
    // }

    // async getAll(){
    //     const content = await this.readFile()
    //     return content 
    // }
    
    // async deleteById(){
    //     const contenido = await this.readFile()
    // }
    
    // async deleteAll(){
        
    // }
}



const productos = new Contenedor("./productos.txt");
const obj = {
    title:"Calculator",
    price:"1.00"
}
const obj2 = {
    title:"mouse",
    price:"5.00"
}
const obj3 = {
    title:"keyboard",
    price:"7.00"
}

productos.save(obj)
productos.save(obj2)
productos.save(obj3)