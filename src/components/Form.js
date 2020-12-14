import React, { useState, useEffect } from "react";
import * as yup from 'yup'
import axios from 'axios'

export default function Form() {
    //all slices of states
    const [subButton, setSubButton] = useState(false)
    const [order, setOrder] = useState({
        name: '', small: false, medium: false, large: false,
        jalapenos: false, pepperoni: false, mushroom: false, ham: false,
        speciality : '' })
    
    
    const [errors, setErrors] =  useState({
        name: ''
    });
    
    const schema = yup.object().shape({
      name: yup.string().required('Name is required')
      .min(2, 'min 2 characters required'),
    })
//validating the data and setting errors with yup
    const validation = event => {
        yup.reach(schema, event.target.name).validate(event.target.value)
        .then((valid) => {
            setErrors({...errors, [event.target.name]: ''})
        })
        .catch((err) => {
            setErrors({...errors, [event.target.name]: err.errors[0]})
        })
    }
    
    const inputChange = event => {
      event.persist()
      const info = {...order, [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked
       : event.target.value
       }
       setOrder(info)
       
       if(event.target.name === 'name'){
           validation(event)
       }
    }
    
    const subOrder = event => {
      event.preventDefault();
      axios.post('https://reqres.in/api/pizza', order)
      .then( data => {
        console.log(data); //logs the response data sent to the console
        setOrder({
            name: '', small: false, medium: false, large: false,
            jalapenos: false, pepperoni: false, mushroom: false, ham: false,
            speciality : '' })
      })
      .catch(error => {
        console.log(error);
      })
      
    }

    useEffect(() => {
        schema.isValid(order).then(valid => setSubButton(!valid))
    }, [order])
    
 
    return (
        <div className='formContainer'>
            <form onSubmit={subOrder}>
            <h1>Order Your Pizza</h1>
            <section>
                <div className='formName'>
                    <h3>Enter Your Name</h3>
                </div>
                <label htmlFor='name'>Name</label>
                <input value={order.name} onChange={inputChange} name='name' id='name' type="text"/>
                {errors.name.length > 0 ? <p>{errors.name}</p> : ''}
            </section>
            <section className='sizeSelect'>
                <h3>Pizza Size?</h3>
                <label htmlFor='size'>Size of Pizza</label>
                <select onChange={inputChange} name='size' id='size'>
                    <option defaultValue='small pizza'>Small</option>
                    <option value="medium pizza">Medium</option>
                    <option value="Large pizza">Large</option>
                </select>
            </section>
            <section className='pizzaToppings'>
                <h3>Toppings?</h3>
                <label htmlFor='jalapenos'>
                Jalapenos? <input onChange={inputChange} name='jalapenos' type='checkbox' id='jalapenos' />
                </label>
                <label htmlFor='pepperoni'>
                Pepperoni? <input onChange={inputChange} name='pepperoni' type='checkbox' id='pepperoni' />
                </label>
                <label htmlFor='mushroom'>
                Mushroom? <input onChange={inputChange} name='mushroom' type='checkbox' id='mushroom' />
                </label>
                <label htmlFor='ham'>
                Ham? <input onChange={inputChange}  name='ham' type='checkbox' id='ham' />
                </label>
            </section>
            <section className='instructions'>
                <p>Special Instructions?</p>
                <textarea htmlFor='speciality' onChange={inputChange} name='speciality' id="speciality" value={order.speciality}
                type='text' placeholder='Anything special?'>
                </textarea>
                {/* <input value={props.order.speciality} onChange={props.inputChange} name='speciality' type='text' id='speciality' /> */}
            </section>
            <button id="submit" disabled={subButton}>Place Order</button>
            </form>
        </div>
    )
}