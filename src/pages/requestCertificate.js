import { useEffect, useState } from "react";

export function RequestCertificateForm() {
    const [addressTo, setAddressTo] = useState('');
    const [purpose, setPurpose] = useState('');
    const [issuedOn, setIsssuedOn] = useState('');
    const [employeeID, setEmployeeId] = useState('');

    const [isPending, setIsPending] = useState(false);

    const[message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        addPost(addressTo, purpose, issuedOn, employeeID);
        setAddressTo('');
        setPurpose('');
        setIsssuedOn('');
        setEmployeeId('');
    };

    useEffect(() => {
        setMinimumDate();
    });

    /*passasobject*/
    const addPost = (addressTo, purpose, issuedOn, employeeID) => {
        fetch('https://zalexinc.azure-api.net/request-certificate?subscription-key=0e9cb8c5b1e945e99922d8e1a3454f99',  {
            method: 'POST',
            body: {
                "address_to": addressTo,
                "purpose": purpose,
                "issued_on": issuedOn,
                "employee_id": employeeID
            },
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
        })
        .then(function (response) {
            if (response.ok) {
                console.log('ok');
                response.json();
                setMessage('Request submitted successfully.')
            } else {
                setMessage('API call error.');
            }
        })
        .then(() => {
            setIsPending(false);
        })
    }

    return (
        <div>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
            <label htmlFor="addressTo">Address To:</label>
            <textarea id="addressTo" name="addressTo" pattern="/^[0-9a-za-z(\-)]+$/" value={addressTo} onChange={(e) => setAddressTo(e.target.value)} placeholder="Address" required></textarea>

            <label htmlFor="purpose">Purpose</label>
            <textarea id="purpose" name="purpose" minLength={50} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" required></textarea>

            <label htmlFor="issuedOn">Issued On:</label>
            <input type="date" id="issuedOn" name="issuedOn" value={issuedOn} onChange={(e) => setIsssuedOn(e.target.value)} required></input>

            <label htmlFor="employeeID">Employee ID:</label>
            <input type="text" id="employeeeID" name="employeeID" value={employeeID} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Employee ID" pattern="\d+" required></input>

            { !isPending && <button type="submit">Submit certificate request</button>}
            { isPending && <button type="submit" disabled>Submitting certificate request...</button>}
        </form>
        </div>
    );
}

function setMinimumDate() {
    var now = new Date(),
    minDate = now.toISOString().substring(0,10);

    document.getElementById('issuedOn').min = minDate;
}