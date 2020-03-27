import React from 'react';
import ReactDOM from 'react-dom';
import SearchTable from '../dist/reactable-search.js';
import axios from 'axios';
import _ from 'lodash';

	
class ContactTable extends React.Component {
  constructor(props) {
    super(props);
	 this.mySubmitHandler = this.mySubmitHandler.bind(this);
	 this.onSearchChange = this.onSearchChange.bind(this);
	 this.state = { contactName: '' , contactEmail: '', contactPhone: '' , query: '', list : []};
	 
    
	
  }
  
  componentDidMount() {
   //     this.searchContact(this.state.query);
    }
	
	onSearchChange(e) {
		 const responselist = [];
		 this.setState({ query: e.target.value }, () => {
            if (this.state.query && this.state.query.length > 1) {
                console.log(this.state.query );
				axios.get('http://localhost:8082/api/contactSearch?contactName=' +this.state.query)
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
            }
        })
  this.setState({ list: responselist }, () => {
	   console.log(this.state.list);
  })
   
	};
	
 onChange(e) {
     this.setState({ contactName: e.target.value }, () => {
            if (this.state.contactName && this.state.contactName.length > 1) {
                console.log(this.state.contactName );
            }
        })
   
  };


onPhoneChange(e) {
     this.setState({ contactPhone: e.target.value }, () => {
            if (this.state.contactPhone && this.state.contactPhone.length > 1) {
                console.log(this.state.contactPhone );
            }
        })
   
  };
  
  onEmailChange(e) {
     this.setState({ contactEmail: e.target.value }, () => {
            if (this.state.contactEmail && this.state.contactEmail.length > 1) {
                console.log(this.state.contactEmail );
            }
        })
   
  };

 mySubmitHandler(event){
    event.preventDefault();
    //alert("You are submitting " + this.state.contactName +  this.state.contactPhone + this.state.contactEmail );
	const contactInformation = {Name:this.state.contactName, Phone: this.state.contactPhone , Email: this.state.contactEmail};
	console.log(contactInformation);
	axios.post('http://localhost:8082/api/addContacts', {
    Name:this.state.contactName , Phone: this.state.contactPhone , Email: this.state.contactEmail
  })
  .then(function (response) {
    console.log(response);
	
  })
  .catch(function (error) {
    console.log(error);
  });
  }
 
      render() {
        return (
			<div>
			
		{this.state.list.map(item => (
				 item.name
        ))}
    

             <form onSubmit={this.mySubmitHandler} >
	  	
	  <br/>
         <table margin = "10px">
		 <tr width="100%">
            <td>
			<input style={{ marginLeft: "10px", width:"100px" }} 
        type='text' PlaceHolder='Search Contacts'
        onChange={this.onSearchChange.bind(this)}/></td>
          
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
        type='text' PlaceHolder='Enter Contactname'
        onChange={this.onChange.bind(this)}/></td>
           <td>
			<input style={{ marginLeft: "20px", width:"100px" }} 
        type='text' PlaceHolder='Enter ContactEmail'
        onChange={this.onEmailChange.bind(this)}/></td>
       
            <td><input style={{ marginLeft: "30px", width:"100px" }} 
        type='text' PlaceHolder='Enter ContactPhone'
        onChange={this.onPhoneChange.bind(this)}/></td>
       <td> 
      <input style={{ marginLeft: "40px" }}  type='submit'/></td>
      
         </tr>
      </table>
            </form>
	</div>	
			//{this.state.results}.map(element=> <ul><li>{element. name} </li></ul>))
			
    );
  }
};

ReactDOM.render(<ContactTable/>, document.getElementById('root'))
