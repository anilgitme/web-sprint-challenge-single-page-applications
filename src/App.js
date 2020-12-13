import React, { useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'
import Form from './components/Form'
import Header from './components/Header'
import Home from './components/Home'

const App = () => {
  const [order, setOrder] = useState({
    name: '',
    size: 'small',
    jalapenos: false,
    pepperoni: false,
    mushroom: false,
    ham: false,
    speciality : ''
});
// const [subBtn, setSubBtn] = useState(false)

const [errors, setErrors] =  useState({

});

const schema = yup.object().shape({
  name: yup.string().required('Name is required')
  .min(2, 'Name must be longer than 2 characters'),
  size: yup.string().required('Must select a size'),
  jalapenos: yup.bool(),
  pepperoni: yup.bool(),
  mushroom: yup.bool(),
  ham: yup.bool(),
  speciality: yup.string()
})

const inputChange = event => {
  event.persist()
  let evalue = event.target.value;
  yup.reach( schema, event.target.name)
  .validate(evalue).then( valid => {
    setErrors({
      ...errors, [event.target.name]: ""
    })
  })
  .catch(error => {
    setErrors({
      ...errors, [event.target.name]: error.errors[0]
    })
  })
  if(event.target.type === 'checkbox') evalue = event.target.checked;
  setOrder({...order, [event.target.name]: evalue});
}



const subOrder = event => {
  event.preventDefault();
  axios.post('https://reqres.in/api/pizza', order)
  .then( data => {
    console.log(data);
    setOrder({
      name: '',
      size: 'small',
      jalapenos: false,
      pepperoni: false,
      mushroom: false,
      ham: false,
      speciality : ''
    })
  })
  .catch(error => {
    console.log(error);
  })
}

// useEffect(() => {
//   schema.isValid(order).then(valid => setSubBtn(valid))
// }, [order])

  return (
    <div className='App'>
      
      <Router>
      <Header />
        <Route exact path='/' component={Home}/>
        <Route path='/pizza'>
          <Form submit={subOrder} order={order} inputChange={inputChange} />
          {/* <button id='submitBtn' onChange={inputChange} type='submit'>Place order</button> */}
        </Route>
       </Router>
      
    </div>
  );
};
export default App; 
