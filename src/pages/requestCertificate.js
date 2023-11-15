import { useEffect, useState } from "react";

export function RequestCertificateForm() {
    const [addressTo, setAddressTo] = useState('');
    const [purpose, setPurpose] = useState('');
    const [issuedOn, setIsssuedOn] = useState('');
    const [employeeID, setEmployeeId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(addressTo, purpose, issuedOn, employeeID);
        /*setAddressTo('');
        setPurpose('');
        setIsssuedOn('');
        setEmployeeId('');*/
    };

    useEffect(() => {
        setMinimumDate();
    });

    /*passasobject*/
    const addPost = (addressTo, purpose, issuedOn, employeeID) => {
        fetch(': https://zalexinc.azure-api.net/request-certificate?subscription-key=0e9cb8c5b1e945e99922d8e1a3454f99',  {
            method: 'POST',
            body: JSON.stringify({
                addressTo: addressTo,
                purpose: purpose,
                issuedOn: issuedOn,
                employeeID: employeeID
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
    }

    return (
        <form onSubmit={handleSubmit}>
            <label for="addressTo">Address To:</label>
            <textarea id="addressTo" name="addressTo" pattern="/^[0-9a-za-z(\-)]+$/" value={addressTo} onChange={(e) => setAddressTo(e.target.value)} required></textarea>

            <label for="purpose">Purpose</label>
            <textarea id="purpose" name="purpose" minLength={50} value={purpose} onChange={(e) => setPurpose(e.target.value)} required></textarea>

            <label for="issuedOn">Issued On:</label>
            <input type="date" id="issuedOn" name="issuedOn" value={issuedOn} onChange={(e) => setIsssuedOn(e.target.value)} required></input>

            <label for="employeeID">Employee ID:</label>
            <input type="text" id="employeeeID" name="employeeID" value={employeeID} onChange={(e) => setEmployeeId(e.target.value)} pattern="\d+" required></input>

            <button type="submit">Submit certificate request</button>
        </form>
    );
}

function setMinimumDate() {
    var now = new Date(),
    minDate = now.toISOString().substring(0,10);

    document.getElementById('issuedOn').min = minDate;
}