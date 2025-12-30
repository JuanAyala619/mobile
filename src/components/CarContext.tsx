import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Car {
    id: number;
    marca: string;
    modelo: string;
    placa: string;
    kilometraje: number;
    ultimoAceite: number;
    ultimaBateria: number;
    limiteAceite: number;
    limiteBateria: number;
}

interface CarContextType {
    cars: Car[];
    addCar: (car: Omit<Car, 'id'>) => void;
    updateCarKm: (carId: number, km: number) => void;
    changeOil: (carId: number) => void;
    changeBattery: (carId: number) => void;
    deleteCar: (carId: number) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const useCarContext = () => {
    const context = useContext(CarContext);
    if (!context) {
        throw new Error('useCarContext debe usarse dentro de CarProvider');
    }
    return context;
};

interface CarProviderProps {
    children: ReactNode;
}

export const CarProvider: React.FC<CarProviderProps> = ({ children }) => {
    const [cars, setCars] = useState<Car[]>([
    ]);

    const addCar = (carData: Omit<Car, 'id'>) => {
        const newCar: Car = {
            id: Date.now(),
            marca: carData.marca,
            modelo: carData.modelo,
            placa: carData.placa,
            kilometraje: carData.kilometraje,
            ultimoAceite: carData.ultimoAceite,
            ultimaBateria: carData.ultimaBateria,
            limiteAceite: carData.limiteAceite,
            limiteBateria: carData.limiteBateria
        };

        setCars(prevCars => {
            const newCars = [];
            for (let i = 0; i < prevCars.length; i++) {
                newCars.push(prevCars[i]);
            }
            newCars.push(newCar);
            return newCars;
        });
    };

    const updateCarKm = (carId: number, km: number) => {
        setCars(prevCars => {
            const newCars = [];
            for (let i = 0; i < prevCars.length; i++) {
                const car = prevCars[i];
                if (car.id === carId) {
                    const updatedCar = {
                        id: car.id,
                        marca: car.marca,
                        modelo: car.modelo,
                        placa: car.placa,
                        kilometraje: car.kilometraje + km,
                        ultimoAceite: car.ultimoAceite,
                        ultimaBateria: car.ultimaBateria,
                        limiteAceite: car.limiteAceite,
                        limiteBateria: car.limiteBateria
                    };
                    newCars.push(updatedCar);
                } else {
                    newCars.push(car);
                }
            }
            return newCars;
        });
    };

    const changeOil = (carId: number) => {
        setCars(prevCars => {
            const newCars = [];
            for (let i = 0; i < prevCars.length; i++) {
                const car = prevCars[i];
                if (car.id === carId) {
                    const updatedCar = {
                        id: car.id,
                        marca: car.marca,
                        modelo: car.modelo,
                        placa: car.placa,
                        kilometraje: car.kilometraje,
                        ultimoAceite: car.kilometraje,
                        ultimaBateria: car.ultimaBateria,
                        limiteAceite: car.limiteAceite,
                        limiteBateria: car.limiteBateria
                    };
                    newCars.push(updatedCar);
                } else {
                    newCars.push(car);
                }
            }
            return newCars;
        });
    };

    const changeBattery = (carId: number) => {
        setCars(prevCars => {
            const newCars = [];
            for (let i = 0; i < prevCars.length; i++) {
                const car = prevCars[i];
                if (car.id === carId) {
                    const updatedCar = {
                        id: car.id,
                        marca: car.marca,
                        modelo: car.modelo,
                        placa: car.placa,
                        kilometraje: car.kilometraje,
                        ultimoAceite: car.ultimoAceite,
                        ultimaBateria: car.kilometraje,
                        limiteAceite: car.limiteAceite,
                        limiteBateria: car.limiteBateria
                    };
                    newCars.push(updatedCar);
                } else {
                    newCars.push(car);
                }
            }
            return newCars;
        });
    };

    const deleteCar = (carId: number) => {
        setCars(prevCars => {
            const newCars = [];
            for (let i = 0; i < prevCars.length; i++) {
                const car = prevCars[i];
                if (car.id !== carId) {
                    newCars.push(car);
                }
            }
            return newCars;
        });
    };

    return (
        <CarContext.Provider value={{
            cars,
            addCar,
            updateCarKm,
            changeOil,
            changeBattery,
            deleteCar
        }}>
            {children}
        </CarContext.Provider>
    );
};