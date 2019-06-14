export function ApiProvider(endpoint, method, params) {
    var promise = new Promise( function ( resolve, reject) {
        if(method === "POST"){
            fetch(endpoint, {
                method: method,
                //mode: 'no-cors',
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
              }).then(response => response.json())
              .then( data => {
                    if(data.status === 200)
                        resolve(data)
                    else
                        reject(data.message)
              })
              .catch( err => reject(err))
        }
        else{
            fetch(endpoint, {
                method: method,
                //mode: 'no-cors',
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
              }).then(response => response.json())
              .then( data => {
                if(data.status === 200)
                    resolve(data)
                else
                    reject(data.message)
              })
              .catch( err => reject(err))
        }
        
    })

    return promise;
}