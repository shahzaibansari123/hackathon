let userSignUp = () => {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let address = document.getElementById("Address");
    let contact = document.getElementById("Contact");
    let country = document.getElementById("Country");
    let city = document.getElementById("City");
    let message = document.getElementById("message");

    if (password.value.length < 6) {
        message.innerHTML = " password must be atleast 6 characters"
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);
    }

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            let user = {
                // username: username.value,
                name: name.value,
                email: email.value,
                password: password.value,
                address: address.value,
                contact: contact.value,
                country: country.value,
                city: city.value,


            }

            firebase.database().ref(`users/${res.user.uid}`).set(user)
                .then(() => {
                    message.innerHTML = "Signup successful"
                    setTimeout(() => {
                        message.innerHTML = "";
                    }, 5000);
                    location.href = "userLogin.html"
                })

        })
        .catch((err) => {
            message.innerHTML = "email already exist"
            setTimeout(() => {
                message.innerHTML = "";
            }, 5000);
            console.log("err=>", err)
        })
}


let userLogIn = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            firebase.database().ref(`users/${res.user.uid}`).once('value', (data) => {
                message.innerHTML = "Login successful"
                setTimeout(() => {
                    message.innerHTML = "";
                }, 5000);
                location.href = "userhomepage.html"
                console.log(data.val())
            })
        })
        .catch((err) => {
            console.log('err=>', err)
            message.innerHTML = "Invalid Credential"
            setTimeout(() => {
                message.innerHTML = "";
            }, 2000);
        })

}

// --------------------------------------------------------------------------


let restSignUp = () => {
    let restaurantName = document.getElementById("restaurantName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let address = document.getElementById("Address");
    let contact = document.getElementById("Contact");
    let country = document.getElementById("Country");
    let city = document.getElementById("City");
    let message = document.getElementById("message");

    if (password.value.length < 6) {
        message.innerHTML = " password must be atleast 6 characters"
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);
    }

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            let restaurant = {
                restaurantName: restaurantName.value,
                email: email.value,
                password: password.value,
                address: address.value,
                contact: contact.value,
                country: country.value,
                city: city.value,


            }

            firebase.database().ref(`restaurants/${res.user.uid}`).set(restaurant)
                .then(() => {
                    message.innerHTML = "Signup successful"
                    setTimeout(() => {
                        message.innerHTML = "";
                    }, 5000);
                    location.href = "restLogin.html"
                })

        })
        .catch((err) => {
            message.innerHTML = "email already exist"
            setTimeout(() => {
                message.innerHTML = "";
            }, 5000);
            console.log("err=>", err)
        })
}


let restLogIn = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            firebase.database().ref(`restaurants/${res.user.uid}`).once('value', (data) => {
                message.innerHTML = "Login successful"
                setTimeout(() => {
                    message.innerHTML = "";
                }, 5000);
                location.href = "restdashboard.html"
                console.log(data.val())
            })
        })
        .catch((err) => {
            console.log('err=>', err)
            message.innerHTML = "Invalid Credential"
            setTimeout(() => {
                message.innerHTML = "";
            }, 2000);
        })

}

var database = firebase.database().ref('restaurants/meals/')
var key = database.push().key;

let additems = () => {
    let price = document.getElementById("price");
    let itemName = document.getElementById("itemName");
    let category = document.getElementById("category");
    // let delivery=document.getElementById("delivery");

    let meal = {
        price: price.value,
        itemName: itemName.value,
        category: category.value,
        delivery: delivery.value

    }
    localStorage.setItem('meals', JSON.stringify(meal))
    database.child(key).set(meal)

}

const postitems = () => {
    // let { price,itemName,category,delivery} = JSON.parse(localStorage.getItem('meals'));
    firebase.database().ref('restaurants/meals/').on("value", function (data) {
        let datas = data.val();
        console.log(datas)
        // var li= document.createElement('li')
        // var liText= document.createTextNode(data.val().value)
        // li.appendChild(liText)
    })
}


//     let li = document.createElement('li');
//     li.innerHTML = `
//     <div class="card"  style="width: 18rem;">
//     <input type="image" src="de.png" width="35" height="35" onclick="deleteLi(this)" style="margin:-28px 50px 0px 270px;">
//     <img src="card.jpg" height="200px"  class="card-img-top" alt="...">
//     <div class="card-body">
//     <h3 class="card-title">${itemName}</h3>
//     <h4 class="card-text">${price}</h4>
//     <h4 class="card-text">${category}</h4>
//     <h4 class="card-text">${delivery}</h4>

//     </div>
//     </div>
// `;
//     list.appendChild(li);
// }

const logout = () => {
    location.href = "index.html";
}

