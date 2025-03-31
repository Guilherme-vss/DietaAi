import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply,
} from 'fastify'
import { CreateNutritionController } from './controllers/CreateNutritionController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get('/teste', (request: FastifyRequest, reply: FastifyReply) => {

        let responseText = "```json\n{\n  \"nome\": \"Guilherme\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 22,\n  \"altura\": 1.78,\n  \"peso\": 61,\n  \"objetivo\": \"Ganhar peso\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"7:00\",\n      \"nome\": \"Cafe da manha\",\n      \"alimentos\": [\n        \"3 ovos inteiros\",\n        \"2 fatias de pao integral\",\n        \"1 colher de sopa de pasta de amendoim\",\n        \"1 banana\",\n        \"200ml de leite integral\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Lanche da manha\",\n        \"alimentos\": [\n        \"1 copo de iogurte grego com granola\",\n        \"1 fruta (maca ou pera)\"\n      ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoco\",\n      \"alimentos\": [\n        \"200g de carne vermelha (frango ou peixe)\",\n        \"1 concha de arroz integral\",\n        \"1 concha de feijao\",\n        \"Salada de folhas verdes a vontade\",\n        \"1 colher de sopa de azeite\"\n      ]\n    },\n    {\n      \"horario\": \"16:00\",\n      \"nome\": \"Lanche da tarde\",\n      \"alimentos\": [\n        \"Sanduiche natural com peito de peru e queijo\",\n        \"1 fruta (laranja ou manga)\"\n      ]\n    },\n    {\n      \"horario\": \"19:00\",\n      \"nome\": \"Jantar\",\n      \"alimentos\": [\n        \"150g de carne branca (frango ou peixe)\",\n        \"Batata doce cozida (1 unidade media)\",\n        \"Salada de folhas verdes a vontade\"\n      ]\n    },\n    {\n      \"horario\": \"21:00\",\n      \"nome\": \"Lanche antes de dormir\",\n      \"alimentos\": [\n        \"Leite com 1 colher de sopa de cacau em po\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Creatina\",\n    \"Whey protein\",\n    \"Maltodextrina\"\n  ]\n}\n```"

        try{

            //extrair o JSON
            let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

            let jsonObject = JSON.parse(jsonString)

            return reply.send({ data : jsonObject });


        }catch(err){
            console.log(err)
        }


        reply.send({ ok: true })
    })

    fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateNutritionController().handle(request, reply)
    })

}
