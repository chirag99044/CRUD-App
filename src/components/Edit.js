import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function Edit() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const { Id } = useParams(); // Use id instead of Id
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser(); 
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${Id}`);
            const userData = response.data;
            setName(userData[0].Name);
            setAge(userData[0].Age);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/update/${Id}`, { name, age });
            const userData = response.data;
            navigate('/'); 
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user. Please try again later.");
        }
    };

    return (
        <div>
            <Form className="d-grId gap-2" style={{ margin: "5rem" }} onSubmit={handleUpdate}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Control
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" size="lg" style={{marginInlineEnd : "2rem"}}>
                    Update
                </Button>

                <Link className="d-grId gap-2" to="/">
                    <Button variant="warning" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;
