import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Home() {
    const [users, setUsers] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

		const deleteUser = async (Id) => {
			try {
				if (!Id) {
					alert("Error: Id is undefined or null");
					return;
				}
				await axios.delete(`http://localhost:5000/api/delete/${Id}`);
				fetchUsers();
			} catch (error) {
				console.error("Error deleting user:", error);
			}
		};

    return (
        <div style={{ margin:"5rem", textAlign: "center" }}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item) => (
                        <tr key={item.Id}>
                            <td>{item.Name}</td>
                            <td>{item.Age}</td>
                            <td>
                            <Link className="d-grId gap-2" to={`/Edit/${item.Id}`}>
                                <Button  variant="info" className="me-4" >Update</Button>
                            </Link>
                                <Button
                                    onClick={() => deleteUser(item.Id)}
                                    variant="danger"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Link className="d-grId gap-2" to="/create">
                <Button variant="warning" size="lg">Create</Button>
            </Link>
        </div>
    );
}

export default Home;
