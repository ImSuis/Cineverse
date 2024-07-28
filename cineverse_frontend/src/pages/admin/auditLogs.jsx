// src/components/AuditLogs.js

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Sidebar from '../admin/sidebar';
import axios from 'axios';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchAuditLogs();
    }, []);

    const fetchAuditLogs = async () => {
        try {
            const response = await axios.get('https://localhost:5001/api/audit-logs/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token here
                }
            });
            setLogs(response.data); // Assuming response.data is an array of audit logs
        } catch (error) {
            console.error('Error fetching audit logs:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content" style={{ marginLeft: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ margin: '0' }}>Audit Logs</h1>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Action</th>
                            <th>Details</th>
                            <th>Timestamp</th>
                            <th>User ID</th>
                            <th>IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{log.action}</td>
                                <td>{log.details}</td>
                                <td>{new Date(log.createdAt).toLocaleString()}</td>
                                <td>{log.userId}</td>
                                <td>{log.ipAddress}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AuditLogs;
