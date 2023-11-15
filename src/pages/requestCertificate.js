export function form() {
    const handleSubmit = (e) => {
        
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label for="addressTo">Address To:</label>
            <textarea id="addressTo" name="addressTo" pattern="/^[0-9a-za-z(\-)]+$/" required></textarea>

            <label for="purpose">Purpose</label>
            <textarea id="purpose" name="purpose" minLength={50} required></textarea>

            /**should be future dates only */
            <label for="issuedOn">Issued On:</label>
            <input type="date" id="issuedOn" name="issuedOn" required></input>

            <label for="employeeID">Employee ID:</label>
            <input type="text" id="employeeeID" name="employeeID" pattern="\d+" required></input>

            <button type="submit">Submit certificate request</button>
        </form>
    );
}


/**
 * set current date as minimum date allowed
 */
$(function(){
    var now = new Date(),
    minDate = now.toISOString().substring(0,10);

    $('#issuedOn').prop('min', minDate);
});