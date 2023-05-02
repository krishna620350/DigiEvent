import URL from "../Json/Url.json";

export default class loginApi {
    url = `${URL.APIURL}/login`;

    ReadData = async (email) => {
        // console.log(this.url);
        const data = {
            email: email
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

    InsertData = async (name,email,visitorType, password, confirmPassword) => {
        const data = {
          name: name,
          email: email,
          visitorType: visitorType,
          password: password,
          confirmPassword : confirmPassword
        };
        const response = await fetch(`${this.url}/insertData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;
      };
    }
   

    
    
