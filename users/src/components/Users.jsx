import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react'

const Users = (props) => {
    const [formInput, setFormInput] = useState({
        name: '',
        bio: ''
    })

    const changeHandler = e => {
        
        setFormInput({
            [e.target.name]: e.target.value
        })
    }

    const addUser = e => {
        e.preventDefault()
        props.addUser(formInput)
        setFormInput({
            name: '',
            bio: ''
        })
    }

    return ( 
        <div>
            <Form>
                <Form.Field width="4">
                    <input 
                        type="text"
                        placeholder="name"
                        name="name"
                        value={formInput.name}
                        onChange={changeHandler}
                    />
                    
                </Form.Field>
                <Form.Field width="6">
                    <input 
                        type="text"
                        placeholder="bio"
                        name="bio"
                        value={formInput.bio}
                        onChange={changeHandler}
                    />
                    
                </Form.Field>
                <Button onClick={addUser}>Submit</Button>
            </Form>
        </div>
     );
}
 
export default Users;