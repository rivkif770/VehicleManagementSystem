"use server";
import { MongoClient } from "mongodb";


export async function connectDatabase() {
   const dbConnection: any = process.env.PUBLIC_DB_CONNECTION;
   return await MongoClient.connect(dbConnection);
}


export async function insertDocument(client: any, collection: string, document: object) {
   const db = client.db('db01');
   const result = await db.collection(collection).insertOne(document);
   return result;
}


export async function getAllDocuments(client: any, collection: string) {
   const db = client.db('db01');
   const documents = await db.collection(collection).find().toArray();
   return documents;
}

export async function deleteDocuments(client: any, collection: string, plateNumber: number) {
   const db = client.db('db01');
   const result = await db.collection(collection).deleteDocuments(plateNumber);
   return result;

}









