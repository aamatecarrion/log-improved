// LocalStorageContext.js
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
const LocalStorageContext = createContext();

const LocalStorageProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        try {
            // Recuperar datos del localStorage al iniciar
            const savedData = localStorage.getItem('appData');
            return savedData ? JSON.parse(savedData) : {};
        } catch (error) {
            // Si hay un error al parsear los datos, devuelve un objeto vacío
            console.error('Error al parsear los datos del localStorage:', error);
            return {};
        }
    });
    
    useEffect(() => {
        try {
            // Guardar datos en el localStorage cuando cambien
            localStorage.setItem('appData', JSON.stringify(data));
        } catch (error) {
            // Si hay un error al guardar los datos, muestra un mensaje de error
            console.error('Error al guardar los datos en el localStorage:', error);
        }
    }, [data]);

    return (
        <LocalStorageContext.Provider value={{ data, setData }}>
            {children}
        </LocalStorageContext.Provider>
    );
};


export { LocalStorageContext, LocalStorageProvider };