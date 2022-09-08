const fs = require('fs');

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
        const content = await this.readFile();
        
            if (content.length !== 0){
                let newId = content[content.length - 1].id + 1
                await fs.promises.writeFile(this.file, JSON.stringify([...content, {...obj, id: newId}]), 'utf8');
                console.log(`id del elemento agregado: ${newId}`)
            }else{
                await fs.promises.writeFile(this.file, JSON.stringify([{...obj, id: 1}]), 'utf8');
                console.log(`id del elemento agregado: ${1}`)
            }

    }

    async getById(id){
        const content = await this.readFile()

        const element = content.find(el => el.id === id)
        // return element
        console.log(element)
    }

    async getAll(){
        const content = await this.readFile()
        // return content
        console.log(content) 
    }
    
    async deleteById(id) {
        try {
          const content = await this.readFile()
          newContent = content.filter((product) => product.id !== id)
          await fs.promises.writeFile(this.file, JSON.stringify(newContent), 'utf-8')
          console.log(`Se elimino correctamente el elemento de id: ${id}`)
        } catch (error) {
          console.log(error);
        }
      }
    
    async deleteAll(){
        newContent = []

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(newContent), 'utf8') 
            console.log("Productos eliminados")
        }catch(err){
            console.log(err)
        }
    }
}

let newContent = [];

const item = {
    title: "headphone",
    price: "15.00",
    thumbnail: "https://www.example.com/images/keyboard.jpg"
}

const productos = new Contenedor("./productos.txt");


productos.save(item)

setTimeout(() => {
    productos.getAll()
    productos.getById(2)
    productos.deleteById(1)
    setTimeout(() => {
        productos.deleteAll()
    }, 500)
}, 1000)
