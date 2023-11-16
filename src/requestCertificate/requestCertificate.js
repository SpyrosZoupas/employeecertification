import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './requestCertificate.css';

export function RequestCertificateForm() {
    const [addressTo, setAddressTo] = useState('');
    const [purpose, setPurpose] = useState('');
    const [issuedOn, setIsssuedOn] = useState('');
    const [employeeID, setEmployeeId] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({mode: 'all'})

    const [isPending, setIsPending] = useState(false);

    const[message, setMessage] = useState(null);

    const submit = (e) => {
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
        .then(setIsPending(false))
    }
    
    return (
        <div>
        {message && <p class="successMessage">{message}</p>}
        <form onSubmit={handleSubmit(submit)}>
            <label htmlFor="addressTo">Address To:</label>
            <textarea id="addressTo" name="addressTo" {...register("addressTo", {required: true , pattern: {value: /^[A-Za-z0-9]+$/}})} placeholder="Address"></textarea>
            {errors.addressTo && <p>Address can only be Alphanumeric</p>}

            <label htmlFor="purpose">Purpose</label>
            <textarea id="purpose" name="purpose" {...register("purpose", {required: true, minLength: 50})} placeholder="Purpose"></textarea>
            {errors.purpose && <p>Purpose must be a minimum of 50 characters</p>}

            <label htmlFor="issuedOn">Issued On:</label>
            <input type="date" id="issuedOn" name="issuedOn" {...register("issuedOn", {required: true})}></input>

            <label htmlFor="employeeID">Employee ID:</label>
            <input type="number" id="employeeeID" name="employeeID" {...register("employeeID", {required: true, valueAsNumber: true})} placeholder="Employee ID" pattern="\d+" required></input>
            {errors.employeeID && <p>Employee ID must be a number</p>}

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