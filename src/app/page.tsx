"use client";
import { useEffect, useState } from "react";
import { fetchCars, addCar, deleteCar } from "../services/http";

export interface Car {
  _id?: string;
  model_name: string;
  plate_number: string;
  color: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Car>({ model_name: "", plate_number: "", color: "" });
  const [editCarId, setEditCarId] = useState<string | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      const carsData = await fetchCars();
      setCars(carsData);
    };
    loadCars();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // if (editCarId) {
    //   // Update Car logic
    //   await updateCar(editCarId, newCar);
    //   setCars(cars.map(car => car._id === editCarId ? { ...car, ...newCar } : car));
    //   setEditCarId(null);
    // } else {
    //   // Add New Car logic
    //   const result = await addCar(newCar);
    //   setCars([...cars, { ...newCar, _id: result.data.insertedId }]);
    // }
    const result = await addCar(newCar);
    setCars([...cars, { ...newCar, _id: result.data.insertedId }]);

    setNewCar({ model_name: "", plate_number: "", color: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteCar(id);
    setCars(cars.filter((car) => car._id !== id));
  };

  return (
    <div>
      <h1>Cars List</h1>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <strong>Model Name:</strong> {car.model_name} <br />
            <strong>Plate Number:</strong> {car.plate_number} <br />
            <strong>Color:</strong> {car.color} <br />
            <button onClick={() => handleDelete(car._id!)}>Delete</button>
            <br />
            <br />
          </li>
        ))}
      </ul>

      <h2>{editCarId ? "Edit Car" : "Add New Car"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Model Name:
            <input type="text" name="model_name" value={newCar.model_name} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Plate Number:
            <input type="text" name="plate_number" value={newCar.plate_number} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Color:
            <input type="text" name="color" value={newCar.color} onChange={handleInputChange} required />
          </label>
        </div>
        <button type="submit">{editCarId ? "Update Car" : "Add Car"}</button>
      </form>
    </div>
  );
}
