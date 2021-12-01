/**
 * name - string
 * duração - number
 * educator - string
 */
/** 
 * Criando a interface podemos definir o que esperamos receber mas caso tenhamos um 
 * Atributo que seja opcional precisamos definir com um ponto de ? antes dos dois pontos dos itens 
 * da nossa interface 
*/

interface Course {
    name: string;
    duration?: number;
    educator: string;
}


class CreateCourseService {
    /* Uma das maneiras de passar os tipos 
  Manaira 1   execute(name:string,duration:number,educator:string){
        console.log(name, duration,educator);
    }*/
    /*
    Outra forma de passar as informações da nossa interface 
     Maneira 2   execute(data:Course) {
            console.log(data.name,data.duration, data.educator);
        }
    */
    // outra forma de realizar o processo seria desistruturando o data assim não é necessario seguir uma ordem 
    // Maneira 3   
    //para definir um valor padrão basta colocar o = seguido do valor   
    execute({ duration = 8, educator, name }: Course) {
        console.log(name, duration, educator);
    }
}

export default new CreateCourseService();