import { Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
import {EmployeeContext} from '../contexts/EmployeeContext';
import {useContext, useState} from 'react';



const AddForm = () =>{

    const {addEmployee} = useContext(EmployeeContext);

    const [newEmployee, setNewEmployee] = useState({
        name:"", email:"", phone:"", address:""
    });

    const {
        register,
        formState: { errors },
        trigger,
      } = useForm();

    const onInputChange = (e) => {
        setNewEmployee({...newEmployee,[e.target.name]: e.target.value})
    }

    const {name, email, phone, address} = newEmployee;


    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(name, email, phone, address);
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    className={`form-control ${errors.name && "invalid"}`}
                    {...register("name", { required: "Name is Required" })}
                    onKeyUp={() => {
                      trigger("name");
                    }}
                      value={name}
                    onChange = { (e) => onInputChange(e)}
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    className={`form-control ${errors.email && "invalid"}`}
                    {...register("email", { required: "Email is Required" ,
                    pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                    }})}
                    onKeyUp={() => {
                    trigger("email");
                    }}
                    value={email}
                    onChange = { (e) => onInputChange(e)}
                    required
                    />
                    {errors.email && (
                    <small className="text-danger">{errors.email.message}</small>
                    )}
            </Form.Group>
            <Form.Group>
                <Form.Control
                    as="textarea"
                    placeholder="Address"
                    rows={3}
                    name="address"
                    className={`form-control ${errors.address && "invalid"}`}
                    {...register("address", { required: "Address is Required",
                    minLength: {
                    value: 2,
                    message: "Minimum Required length is 2",
                    },
                    maxLength: {
                    value: 50,
                    message: "Maximum allowed length is 50 ",
                    }
                    })}
                    onKeyUp={() => {
                    trigger("address");
                    }}
                    value={address}
                    onChange = { (e) => onInputChange(e)}
                    />
                    {errors.message && (
                    <small className="text-danger">{errors.address.message}</small>
                    )}
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    className={`form-control ${errors.phone && "invalid"}`}
                    {...register("phone", { required: "Phone is Required",
                    pattern: {
                    value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Invalid phone no",
                    },
                    })}
                    onKeyUp={() => {
                        trigger("phone");
                    }}
                    value={phone}
                    onChange = { (e) => onInputChange(e)}
                    />
                    {errors.phone && (
                    <small className="text-danger">{errors.phone.message}</small>
                    )}
                    
            </Form.Group>
            <Button variant="success" type="submit" block>
                Add New Employee
            </Button>
        </Form>

     )
}

export default AddForm;