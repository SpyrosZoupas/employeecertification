import { useEffect, useState } from "react";

export function RequestList() {
    const [requests, setRequests] = useState([]);

    const getRequests = () => {
        fetch("https://zalexinc.azure-api.net/request-list?subscription-key=0e9cb8c5b1e945e99922d8e1a3454f99")
        .then((response) => response.json())
        .then((data) => setRequests(data))
    }

    useEffect(() => {
        getRequests()
    }, []);

    return (
        <div>
          <h2>Certificate Requests</h2>
          <table>
            <thead>
              <tr>
                <th>Reference No.</th>
                <th>Address To</th>
                <th>Purpose</th>
                <th>Issued on</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.reference_no}</td>
                  <td>{request.address_to}</td>
                  <td>{request.purpose}</td>
                  <td>{request.issued_on}</td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}