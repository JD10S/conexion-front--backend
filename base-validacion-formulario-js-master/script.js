
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
        apiKey: "AIzaSyBS-qyn2Ep5SVYV_tiBOikz30zm4zKXTsw",
        authDomain: "datos-formulario-51f8d.firebaseapp.com",
        projectId: "datos-formulario-51f8d",
        storageBucket: "datos-formulario-51f8d.appspot.com",
        messagingSenderId: "263368371588",
        appId: "1:263368371588:web:981227226ab6e8106e01d1",
 
        }


// Initialize Firebase
firebase.initializeApp (firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    // Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() ===''){
        errorNombre.textContent = 'Por favor, introduci tu nombre';
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }


    // Validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introduci un mail valido'
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }
        // Validar Contraseña

    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }    


        // si todos los campos son validos en el formulario 
        if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){

            // backend recibe informacion

            db.collection("users").add({
                nombre: entradaNombre.value,
                email: emailEntrada.value,
                password: contrasenaEntrada.value
            })
            .then((docRef) => {
                alert('El formulario se ha enviado correctamente',docRef.id)
                document.getElementById('formulario').reset();
            })
            .catch((error) => {
                alert(error)
            });



        }
    })