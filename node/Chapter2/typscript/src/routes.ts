import {Request, Response} from 'express';
import CreateCourseService from './CreateCourseService';

export function createCourse(request:Request, response:Response){
/*
     Dessa forma passamos os parametros para o createCoruserServer porem somente para maneira 1 e 2
    CreateCourseService.execute("nodejs",10 ,"Carlos");*/
//Para a 3º maneira criamos um objeto contendo as informações que iremos mandar para nossa função
    CreateCourseService.execute({
        name:"nodejs", 
        educator:"Carlos",
        duration:10
});

    return response.send();
}