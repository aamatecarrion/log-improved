import React from 'react'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import './LogInput.css'

const LogInput = () => {

    const { data, setData } = useContext(LocalStorageContext)

    console.log(data)
    return (
        <div className='logInputWrapper'>
            <form onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.input;
                const value = input.value.trim();
                if (value) {
                    const newReg = { text: value, id: value+"_"+Date.now(), date: Date.now() };
                    setData({ ...data, regs: [...data.regs || [], newReg] })
                    input.value = '';
                }
            }}>
                <input type="text" name="input" placeholder="Add a new log" />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default LogInput
