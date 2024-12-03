import { useState } from 'react';
import axios from 'axios';

export const AdminDateReport = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState([]);
    const [error, setError] = useState('');

    const handleFetchReport = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/game/date-report', {
                params: { startDate, endDate },
            });
            console.log('API Response:', response.data); // Log the response
            setReportData(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch the report. Please check the date range.');
            setReportData([]);
        }
    };

    return (
        <div>
            <h1>Date Report</h1>
            <div>
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button onClick={handleFetchReport}>Fetch Report</button>
            </div>

            {error && <p>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Total Games Bought</th>
                        <th>Total Amount Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((row) => (
                        <tr key={row.userId}>
                            <td>{row.userId}</td>
                            <td>{row.userName}</td>
                            <td>{row.totalGamesBought}</td>
                            <td>${row.totalAmountSpent.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
