const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });
    var attempt = 3;

    function startTimer() {

        const startMinutes = 5
        let time = startMinutes * 60    
        const myInterval = setInterval(() => {
            const minutes = Math.floor(time / 60)
            const seconds = time % 60
            const result = `${parseInt(minutes)}:${parseInt(seconds)}`
            document.getElementById('test').innerHTML = result
            time--
            document.querySelector('#button').disabled = true;
            if (minutes === 0 && seconds === 0) {
                document.getElementById('test').innerHTML = "";
                document.querySelector('#button').disabled = false;
                clearInterval(myInterval)
                
            }
        }, 1000)
        myInterval()
    }
    function checklogin(){
        if(document.forms['mysignin']["pname"].value == localStorage.getItem('name') && document.forms['mysignin']["ppass"].value == localStorage.getItem('password'))
        alert("Login success");
        else{
            
            attempt--;
            
            alert("You have left " + attempt + " attempt;");

            if (attempt == 0) {
                attempt=3;
                startTimer();
                alert("wait for 5 minutes");
                return false;
            }
        }
        
    }
    function clearErrors(){

        errors = document.getElementsByClassName('formerror');
        for(let item of errors)
        {
            item.innerHTML = "";
        }
    
    
    }
    function seterror(id, error){
        //sets error inside tag of id 
        element = document.getElementById(id);
        element.getElementsByClassName('formerror')[0].innerHTML = error;
    
    }

    function validateForm(){
        var returnval = true;
        clearErrors();
    
        //perform validation and if validation fails, set the value of returnval to false
        var name = document.forms['myForm']["fname"].value;
        // id = name ; 
        if (name.length<5){
            seterror("name", "*Length of id is too short");
            returnval = false;
        }
        if (name.length>20){
            seterror("name", "*Length of id must be less than 20 characters");
            returnval = false;
        }
        if (name.length == 0){
            seterror("name", "*Length of id cannot be zero!");
            returnval = false;
        }
    
        
        var password = document.forms['myForm']["fpass"].value;
        var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

        // pass = password;
        if (password.length < 8){
    
            // Quiz: create a logic to allow only those passwords which contain atleast one letter, one number and one special character and one uppercase letter
            seterror("pass", "*Password should be atleast 8 characters long!");
            returnval = false;
        }
        // comment this out if not working properly
        if(!password.match(decimal)) {
            seterror("pass", "*Password should have one control character");
            returnval = false;
        }
        
        if(returnval){
            console.log(name,password);
            
            localStorage.setItem('name',name);
            localStorage.setItem('password',password);
        }
        
        return returnval;
    }


    function validateLogin(){
        var returnval = true;
        clearErrors();
        
        //perform validation and if validation fails, set the value of returnval to false
        var pname = document.forms['mysignin']["pname"].value;
        var ppass  = document.forms['mysignin']["ppass"].value;
        if (pname!= localStorage.getItem("name") || ppass != localStorage.getItem("password")){
            console.log(localStorage.getItem("name"));
            console.log(localStorage.getItem("password"));
            seterror("name2", "*login password do not match");
            returnval = false;
        }
        else {
            seterror("name2", "*Succesfully Logged in ");
            returnval = false;
        }
        
    
        return returnval;
    }
