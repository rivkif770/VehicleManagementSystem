"use server";
import { NextResponse } from "next/server";
import { connectDatabase, getAllDocuments, insertDocument, deleteDocuments } from "@/services/mongo";
import { ObjectId } from "mongodb";


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
  const newCar = await request.json();
  const result = await insertDocument(client, 'cars', newCar); 
  client.close();

  return NextResponse.json({
    message: "Car added successfully",
    data: result,
  });
}


export async function DELETE(request: Request) {
  const client = await connectDatabase();
  const { id } = await request.json(); 

  const db = client.db('db01');
  const result = await db.collection('cars').deleteOne({ _id: new ObjectId(id) });

  client.close();
  return NextResponse.json({ message: "Car deleted successfully", data: result });
}
