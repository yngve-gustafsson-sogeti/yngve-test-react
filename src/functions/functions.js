import 'regenerator-runtime/runtime';

export const getData = async (url = '') => {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response; //.json(); // parses JSON response into native JavaScript objects
}

export default getData;

export async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', 
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function putData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT', 
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}



export const getMonth = (startDate) => {
  let months = ["January","February", "March", "April", "Maj", "June", "July", "August", "September", "October", "November", "December"];
  let datestring = startDate+"T14:31:36.553Z";
  var d = new Date(datestring);
  var n = d.getMonth();
  return months[n];
}

export const getYear = (startDate) => {
  if(startDate === undefined || startDate === "" || startDate === null){
      return "";
  }

  let splitDate = startDate.split('-');
  return splitDate[0];
}

//For integers - Numbers separated with spaces
export const numberWithSpaces = (x) => {
  return (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
}

//For floating numbers - Numbers separated with spaces
export const floatingNumberWithSpaces = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}