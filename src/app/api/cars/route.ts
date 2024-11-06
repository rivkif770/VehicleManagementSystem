"use server";
import { NextResponse } from "next/server";
<<<<<<< HEAD
import { connectDatabase, getAllDocuments, insertDocument, deleteDocuments } from "@/services/mongo";
import { ObjectId } from "mongodb";

=======
import { connectDatabase, getAllDocuments, insertDocument } from "@/services/mongo";
>>>>>>> 13ef3c17a319df743cf16a5e12787f6a1ac086d4

export async function GET(request: Request) {
  const client = await connectDatabase();
  const cars = await getAllDocuments(client, 'cars');
  client.close();
  return NextResponse.json({
    data: cars,
  });
}

export async function POST(request: Request) {
  const client = await connectDatabase();
<<<<<<< HEAD
  const newCar = await request.json();
  const result = await insertDocument(client, 'cars', newCar); 
=======
  const newCar = await request.json(); // Parse the JSON body
  const result = await insertDocument(client, 'cars', newCar); // Insert the new document
>>>>>>> 13ef3c17a319df743cf16a5e12787f6a1ac086d4
  client.close();

  return NextResponse.json({
    message: "Car added successfully",
    data: result,
  });
}
<<<<<<< HEAD


export async function DELETE(request: Request, _id: string) {
  const client = await connectDatabase();
  const { id } = await request.json();

  const db = client.db('db01');
  const result = await db.collection('cars').deleteOne({ _id: new ObjectId(id) });

  client.close();
  return NextResponse.json({ message: "Car deleted successfully", data: result });
}
=======
>>>>>>> 13ef3c17a319df743cf16a5e12787f6a1ac086d4
