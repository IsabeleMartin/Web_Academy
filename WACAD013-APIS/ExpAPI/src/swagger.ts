import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();
const doc = {
  info: {
    title: "API da Loja virtual",
    description: "Documentação da API",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,

  "definitions": {
    "CreateProductDto": {
      "type": "object",
      "properties": {
        "name": { "type": "string", "example": "Modern Soft Sausages" },
        "price": { "type": "number", "example": 2699.0 },
        "stockQuantity": { "type": "integer", "example": 9 }
      }
    },
    "Product": {
      "type": "object",
      "properties": {
        "id": { "type": "string", "example": "8a2053de-5d92-4c43-97c0-c9b2b0d56703" },
        "name": { "type": "string", "example": "Modern Soft Sausages" },
        "price": { "type": "number", "example": 2699.0 },
        "stockQuantity": { "type": "integer", "example": 9 },
        "createdAt": { "type": "string", "format": "date-time", "example": "2023-11-07T19:27:15.645Z" },
        "updatedAt": { "type": "string", "format": "date-time", "example": "2023-11-07T19:27:15.645Z" }
      }
    },
    "User": {
      "type": "object",
      "properties": {
        "id": { "type": "string", "example": "1a2b3c4d" },
        "email": { "type": "string", "example": "user@example.com" },
        "name": { "type": "string", "example": "John Doe" },
        "userTypeId": { "type": "string", "example": "client" }
      }
    },
    "Language": {
      "type": "object",
      "properties": {
        "lang": { "type": "string", "example": "en" }
      }
    }
  }

};
const outputFile = "./swagger-output.json";
const routes = ["../router/v1Router.ts"];
swaggerAutogen()(outputFile, routes, doc);