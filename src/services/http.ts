import api from './axios';
import { Car } from '../app/page';

export async function fetchCars() {
  const response = await api.get('/cars');
  return response.data.data;
}

export async function addCar(newCar: Car) {
  const response = await api.post('/cars', newCar);
  return response.data;
}

export async function updateCar(carId: string, updatedCar: Car) {
  const response = await api.put(`/cars/${carId}`, updatedCar);
  return response.data;
}

export async function deleteCar(id: string) {
  const response = await api.delete('/cars', { data: { id } });
  return response.data;
}
