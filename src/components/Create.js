import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Create() {
    const [Name, setName] = useState("");
    const [Age, setAge] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Name || !Age) {
            alert("Please provide both Name and Age.");
            return;
        }
        
        try {
            await axios.post('http://localhost:5000/api/create', { Name, Age });
            navigate('/');
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user. Please try again later.");
        }
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Control
                        type="number"
                        placeholder="Age"
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <Link className="d-grid gap-2" to="/">
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Create;
