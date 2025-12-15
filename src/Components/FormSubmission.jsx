import React,{useState} from 'react'
import axios from 'axios';
import '../assets/FormSubmission.css'
function FormSubmission(){
  const [userData, setUserDate] = useState({
    name:'',
    email:'',
    address:''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) =>{
    setUserDate({...userData,[e.target.name]:e.target.value});
  }
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!userData.name || !userData.email || !userData.address) {
    setError('All fields are required');
    return; 
  }

  setError('');
  try {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      userData
    );

    console.log('Form Submitted', response.data);
    setResponseMessage('Form submitted successfully!');
    setUserDate({ name: '', email: '', address: '' });
  } catch (error) {
    console.error('Error in Submitting form', error);
    setResponseMessage('Error occurred in form submission.');
  }
};



  return (
    <div>
      <h3>Form Submission</h3>
      <form method='POST' onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name='name' placeholder='enter full name' value={userData.name} onChange={handleChange}/><br/>
        <label>Email</label>
        <input type="email" name='email' placeholder='enter email' value={userData.email} onChange={handleChange}/><br/>
        <label>Address</label>
        <input type="text" name='address' placeholder='enter address' value={userData.address} onChange={handleChange}/><br/>
        <button>Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
         {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  )
}

export default FormSubmission
