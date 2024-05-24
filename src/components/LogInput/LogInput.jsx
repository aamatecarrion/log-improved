import React from 'react'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import './LogInput.css'

const LogInput = () => {

    const { data, setData } = useContext(LocalStorageContext)

    console.log(data)
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.input;
                const newReg = { text: input.value, id: crypto.randomUUID(), date: new Date() };
                setData({ ...data, regs: [...data.regs || [], newReg] })
                input.value = '';
            }}>
                <input type="text" name="input" placeholder="Añade un log" />
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}

export default LogInput
