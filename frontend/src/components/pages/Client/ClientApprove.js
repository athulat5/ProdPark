import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from './../../images/home.jpg';

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const tableStyle = {
  width: '80%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const tableHeaderStyle = {
  backgroundColor: '#007bff',
  color: 'white',
};

const buttonStyle = {
  margin: '0 5px',
  
};

const backButtonStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  backgroundColor: '#007bff',
  border: 'none',
  color: '#fff',
  fontSize: '18px',
  cursor: 'pointer',
};

function ClientApprove() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/api/client');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients', error);
    }
  };

  const approveClient = async (clientId) => {
    try {
      await axios.put(`/api/client/approve/${clientId}`);
      fetchClients();
    } catch (error) {
      console.error('Error approving client', error);
    }
  };

  const rejectClient = async (clientId) => {
    try {
      await axios.put(`/api/client/reject/${clientId}`);
      fetchClients();
    } catch (error) {
      console.error('Error rejecting client', error);
    }
  };

  const deleteClient = async (clientId) => {
    try{
        await axios.delete(`/api/client/${clientId}`);
        fetchClients();
    } catch (error){
        console.error('Error Deleting client', error)
    }
  }

  return (
    <div style={backgroundStyle}>
      <button style={backButtonStyle} onClick={() => navigate(-1)}>
        &#8592; Back
      </button>

      <div style={tableStyle}>
        <h2 className="text-center">Client Approval</h2>
        <table className="table table-hover table-bordered">
          <thead>
            <tr style={tableHeaderStyle}>
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
                  <Button variant="success" style={buttonStyle} onClick={() => approveClient(client._id)}>
                    Approve
                  </Button>
                  <Button variant="warning" style={buttonStyle} onClick={() => rejectClient(client._id)}>
                    Reject
                  </Button>
                  <Button variant="danger" style={buttonStyle} onClick={() => deleteClient(client._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientApprove;
