import { FastifyRequest, FastifyReply } from "fastify";
import { CreateNutritionService } from "../services/CreateNutritionService";


export interface Dataprops {
    name : String;
    peso : String;
    altura: String;
    idade: String;
    sexo: String;
    objetivo: String;
    nivel: String;

}

class CreateNutritionController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { name, peso, altura, idade, sexo, objetivo, nivel } = request.body as Dataprops;

        const createNutrition = new CreateNutritionService();

        const nutrition = await createNutrition.execute({
            name,
            peso,
            altura,
            idade,
            sexo,
            objetivo,
            nivel
        });

        reply.send(nutrition);

    }
}

export { CreateNutritionController }