"use client";
import { useEffect, useState } from "react";

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

  };

  return (
    <div>
      <h1>Cars List</h1>
      <ul>
        {cars.map((car, index) => (
          <li key={index}>
            <strong>Model Name:</strong> {car.model_name} <br />
            <strong>Plate Number:</strong> {car.plate_number} <br />
            <strong>Color:</strong> {car.color} <br />
            <br/>
          </li>
        ))}
      </ul>

      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Model Name:
            <input
              type="text"
              name="model_name"
              value={newCar.model_name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Plate Number:
            <input
              type="text"
              name="plate_number"
              value={newCar.plate_number}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Color:
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
      </form>
    </div>
  );
}
