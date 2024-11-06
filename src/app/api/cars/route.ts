"use server";
import { NextResponse } from "next/server";
import { connectDatabase, getAllDocuments, insertDocument } from "@/services/mongo";

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
  const newCar = await request.json(); // Parse the JSON body
  const result = await insertDocument(client, 'cars', newCar); // Insert the new document
  client.close();

  return NextResponse.json({
    message: "Car added successfully",
    data: result,
  });
}
