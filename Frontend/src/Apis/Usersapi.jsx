import URL from "../Json/Url.json";

export default class loginApi {
    url = `${URL.APIURL}/user`;

    ReadData = async ({email,password}) => {
        // console.log(this.url);
        try{
        const data = {
            email,
            password
        };
        const response = await fetch(`${this.url}/readData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) return null;
        const responseData = await response.json();
        // console.log(JSON.stringify(responseData));
        return responseData;
      }
      catch(err){
        console.log(err.message);
      }
    };

    InsertData = async ({name,email,visitorType, password, confirmPassword}) => {
      try{
        const data = {
          name,
          email,
          visitorType,
          password,
          confirmPassword
        };
        const response = await fetch(`${this.url}/addData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(data)
        });
        if(!response.ok) return null;
        const responseData = await response.json();
        return responseData;
      }
      catch(err){
        console.log(err.message);
      }
      };
    }
   

    
    
