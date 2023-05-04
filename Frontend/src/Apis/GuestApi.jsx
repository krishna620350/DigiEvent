import URL from "../Json/Url.json";

export default class GuestApi {
    url = `${URL.APIURL}/guest`;
    
    ReadData = async (id) => {
        // console.log(this.url);
        const data = {
            id: id
        };
        const response = await fetch(`${this.url}/readData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        // console.log(JSON.stringify(responseData));
        return responseData;
    };

    FetchData = async (id, Vid, TicketId) => {
        // console.log(this.url, id, Vid, TicketId);
        const data = {
            id: id,
            Vid: Vid,
            TicketId: TicketId
        };
        const response = await fetch(`${this.url}/fetchData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        // console.log(JSON.stringify(responseData));
        return responseData;
    };

    InsertDate = async (formValue) => {
        const response = await fetch(`${this.url}/addData/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(formValue)
        });
        const responseData = await response.json();
        return responseData;
    }
    UpdateData = async (formValue) => {
        console.log(formValue);
        const response = await fetch(`${this.url}/updateData/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(formValue)
        });
        const responseData = await response.json();
        return responseData;
    }
}