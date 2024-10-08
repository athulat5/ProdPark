import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClientApprove() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get('/register');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients', error);
        }
    };

    const approveClient = async (clientId) => {
        try {
            await axios.put(`/register/approve/${clientId}`);
            fetchClients();
        } catch (error) {
            console.error('Error approving client', error);
        }
    };

    const rejectClient = async (clientId) => {
        try {
            await axios.put(`/register/reject/${clientId}`);
            fetchClients();
        } catch (error) {
            console.error('Error rejecting client', error);
        }
    };

    return (
        <div>
            <h2>Client Approval</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client._id}>
                            <td>{client.username}</td>
                            <td>{client.address}</td>
                            <td>{client.status}</td>
                            <td>
                                <button onClick={() => approveClient(client._id)}>Approve</button>
                                <button onClick={() => rejectClient(client._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientApprove;
