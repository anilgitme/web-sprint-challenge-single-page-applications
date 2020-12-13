import React from "react";

export default function Form(props) {
 
    return (
        <div className='formContainer'>
            <form onSubmit={props.submit}>
            <h1>Order Your Pizza</h1>
            <section>
                <div className='formName'>
                    <h3>Enter Your Name</h3>
                </div>
                <label htmlFor='name'>Name</label>
                <input value={props.order.name} onChange={props.inputChange} name='name' id='name' type="text"/>
            </section>
            <section className='sizeSelect'>
                <h3>Pizza Size?</h3>
                <label htmlFor='size'>Size of Pizza</label>
                <select onChange={props.inputChange} name='size' id='size'>
                    <option defaultValue='small'>Small</option>
                    <option value="medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
            </section>
            <section className='pizzaToppings'>
                <h3>Toppings?</h3>
                <label htmlFor='jalapenos'>
                Jalapenos? <input checked={props.order.jalapenos} onChange={props.inputChange} name='jalapenos' type='checkbox' id='jalapenos' />
                </label>
                <label htmlFor='pepperoni'>
                Pepperoni? <input checked={props.order.pepperoni} onChange={props.inputChange} name='pepperoni' type='checkbox' id='pepperoni' />
                </label>
                <label htmlFor='mushroom'>
                Mushroom? <input checked={props.order.mushroom} onChange={props.inputChange} name='mushroom' type='checkbox' id='mushroom' />
                </label>
                <label htmlFor='ham'>
                Ham? <input checked={props.order.ham} onChange={props.inputChange} name='ham' type='checkbox' id='ham' />
                </label>
            </section>
            <section className='instructions'>
                <textarea htmlFor='speciality' name='instructioms' value={props.speciality}
                type='text' placeholder='Anything special?'>
                </textarea>
                {/* <input value={props.order.speciality} onChange={props.inputChange} name='speciality' type='text' id='speciality' /> */}
            </section>
            <button onChange={props.subBtnEnabled}>Place Order</button>
            </form>
        </div>
    )
}