"use client";
import { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======

export default function Home() {
  interface Car {
    model_name: string;
    plate_number: string;
    color: string;
  }

  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Car>({
    model_name: "",
    plate_number: "",
    color: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
        const response = await fetch('/api/cars', {
          method: 'GET',
          headers: {
            'Cache-Control': 'max-age=1',
            'Content-Type': 'application/json',
          },
        });


        const data = await response.json();
        setCars(data.data);
    };

    fetchCars();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });


      const result = await response.json();
      console.log(result.message); 

      setCars((prevCars) => [...prevCars, newCar]);

      // Clear the form
      setNewCar({ model_name: "", plate_number: "", color: "" });

>>>>>>> 13ef3c17a319df743cf16a5e12787f6a1ac086d4
  };

  return (
    <div>
      <h1>Cars List</h1>
      <ul>
<<<<<<< HEAD
        {cars.map((car) => (
          <li key={car._id}>
            <strong>Model Name:</strong> {car.model_name} <br />
            <strong>Plate Number:</strong> {car.plate_number} <br />
            <strong>Color:</strong> {car.color} <br />
            <button onClick={() => handleDelete(car._id!)}>Delete</button>
            <br />
            <br />
=======
        {cars.map((car, index) => (
          <li key={index}>
            <strong>Model Name:</strong> {car.model_name} <br />
            <strong>Plate Number:</strong> {car.plate_number} <br />
            <strong>Color:</strong> {car.color} <br />
            <br/>
>>>>>>> 13ef3c17a319df743cf16a5e12787f6a1ac086d4
          </li>
        ))}
      </ul>

<<<<<<< HEAD
      <h2>{editCarId ? "Edit Car" : "Add New Car"}</h2>
=======
      <h2>Add New Car</h2>
>>>>>>> 13ef3c17a319df743cf16a5e12787f6a1ac086d4
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Model Name:
<<<<<<< HEAD
            <input type="text" name="model_name" value={newCar.model_name} onChange={handleInputChange} required />
=======
            <input
              type="text"
              name="model_name"
              value={newCar.model_name}
              onChange={handleInputChange}
              required
            />
>>>>>>> 13ef3c17a319df743cf16a5e12787f6a1ac086d4
          </label>
        </div>
        <div>
          <label>
            Plate Number:
<<<<<<< HEAD
            <input type="text" name="plate_number" value={newCar.plate_number} onChange={handleInputChange} required />
=======
            <input
              type="text"
              name="plate_number"
              value={newCar.plate_number}
              onChange={handleInputChange}
              required
            />
>>>>>>> 13ef3c17a319df743cf16a5e12787f6a1ac086d4
          </label>
        </div>
        <div>
          <label>
            Color:
<<<<<<< HEAD
            <input type="text" name="color" value={newCar.color} onChange={handleInputChange} required />
          </label>
        </div>
        <button type="submit">{editCarId ? "Update Car" : "Add Car"}</button>
=======
            <input
              type="text"
              name="color"
              value={newCar.color}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Car</button>
>>>>>>> 13ef3c17a319df743cf16a5e12787f6a1ac086d4
      </form>
    </div>
  );
}
