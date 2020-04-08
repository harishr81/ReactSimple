import React , { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import SearchTable from '../dist/reactable-search.js';
import axios from 'axios';
import _ from 'lodash';


export const ContactTableWithHooks = () => {
  const [input, setInput] =  React.useState("");
  const [name, setName] =  React.useState("");
  const [email, setEmail] =  React.useState("");
  const [phone, setPhone] =  React.useState("");

React.useEffect(() => {
    console.log(input); 
	const responselist = [];
	axios.get('http://localhost:8085/api/contactSearch?contactName=' +input)
            .then(function (response ) {
			// handle success
			responselist.push(response.data[0]);
			 //this.setState({list: response.data[0] });
			console.log(responselist);
			})
		  .catch(function (error) {
    // handle error
    console.log(error);
  })
    }, [input]
	
	
	);

const handleSubmit = e => {
    e.preventDefault();
	console.log('Post');	
	axios.post('http://localhost:8085/api/addContacts', {
    Name:name, Phone: phone , Email: email
  })
  .then(function (response) {
    console.log(response);
	
  })
  .catch(function (error) {
    console.log(error);
  });
	
    }


   
function onContactNameChange(e) {
	
	 console.log(e.target.value);
	 setName(e.target.value);
      
  };
  
  function onEmailChange(e) {
	 
	 console.log(e.target.value);
	 setEmail(e.target.value);
     
   
  };

  function onPhoneChange(e) {
	 
	console.log(e.target.value);
	 setPhone(e.target.value);
     
   
  };
  return (
    <form onSubmit = {handleSubmit}>
	 <table margin = "10px">
		 <tr width="100%">
            <td>
			<input style={{ marginLeft: "10px", width:"100px" }} 
        type='text' PlaceHolder='Search Contacts'
        onChange={e => setInput(e.target.value)}/></td>
        </tr>  

		<br/>
         <tr>
            <th>contact Name</th>
            <th>contact Email</th>
			<th>contact Phone</th>
         </tr>
		 <tr><td></td></tr>
         <tr width="100%">
            <td>
			<input style={{ marginLeft: "15px", width:"100px" }} 
        type='text' PlaceHolder='Enter Contactname' onChange={onContactNameChange} /></td>
           <td>
			<input style={{ marginLeft: "20px", width:"100px" }} 
        type='text' PlaceHolder='Enter ContactEmail' onChange={onEmailChange} /></td>
       
            <td><input style={{ marginLeft: "30px", width:"100px" }} 
        type='text' PlaceHolder='Enter ContactPhone' onChange={onPhoneChange} /></td>
       <td> 
      <input style={{ marginLeft: "40px" }}  type='submit'/></td>
      </tr>
	</table>
	
    </form>
  )
}

ReactDOM.render(<ContactTableWithHooks/>, document.getElementById('root'))
