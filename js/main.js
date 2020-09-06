// event listener for survey form
const surveyForm = document.querySelector("#survey-form");
surveyForm.addEventListener("submit", Validate);

// main Validation function
function Validate() {

    // value of input fields and radio buttons
    const fullname = document.querySelector("#fullname").value;
    const email = document.querySelector("#email").value;
    const age = document.querySelector("#age").value;
    const dropdown = document.querySelector("#dropdown").value;
    const system = document.getElementsByName("modern-system");
    const dropdown2 = document.querySelector("#dropdown-2").value;
    const retroSystem = document.querySelector('input[name="retro-system"]:checked');
    const errorMessages = document.querySelector("#error-messages");
    const errorContainer = document.querySelector(".error-container");
    // regex for fullname, email and age
    const letterRegExp = /^([a-z']+(-| )?)+$/i;
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const ageRegExp = /^[0-9]+$/;

    // empty array for validation error messages
    const errors = [];

    //  Error function to change the style of the elements with the corrosponding id + display errors in error window
    function errorStyle(id, text) {
        const el = document.querySelector(id);
        const labelText = document.querySelector(text);
        el.style.border = "1px solid #721c24";
        el.style.backgroundColor = "#f8d7da";
        labelText.style.color = "#721c24";
        errorMessages.style.display = "block";
        errorContainer.innerHTML = errors.join("<br><br>");
    }

    // Pass function to change the style of the element with the corrosponding id
    function passStyle(id, text) {
        const el = document.querySelector(id);
        const labelText = document.querySelector(text);
        el.style.border = "1px solid #155724";
        el.style.backgroundColor = "#d4edda";
        labelText.style.color = "#155724";
    }

    // function for name, email and age validation
    // the variable element, error message text, the document id to style the error, the document id to style the label text/tag, and variable of regex type to test
    function textInputValidation(element, errorText, error, label, regex) {
        (element == "" || element == null || !element || element === [] || !regex.test(element)) ? (errors.push(errorText), errorStyle(error, label)) : (passStyle(error, label));
    }

    // function declarations
    textInputValidation(fullname, "Please enter your name into the name field. ✍️", "#fullname", "#name-label", letterRegExp);
    textInputValidation(email, "Please enter a valid email address. ✍️", "#email", "#email-label", emailRegExp);
    textInputValidation(age, "Please enter your age. ✍️", "#age", "#age-label", ageRegExp);

    // function for the drop down menu + checkbox validation
    function dropDownCheckBoxValidation(menu, errorMsg, dropdownId, dropdownLabel) {
        // if dropdown is empty, null, false,  or deffault message, show the error message and run the error functions
        // else, if dropdown is not empty, not null, not false or not default message, return true and run the pass functions
        (menu == "" || menu == null || !menu || menu == "Please select an option") ? (errors.push(errorMsg), errorStyle(dropdownId, dropdownLabel)) : (passStyle(dropdownId, dropdownLabel));
    };

    // function declarations
    dropDownCheckBoxValidation(dropdown, "Please select an option that best describes your current role. ✍️", "#dropdown", "#drop-down-label");
    dropDownCheckBoxValidation(dropdown2, "Please select your favourite video game company. ✍️", "#dropdown-2", "#drop-down-label-2");
    dropDownCheckBoxValidation(retroSystem, "Please select the retro consoles you own. ✍️", "#checkbox-container", "#system-label-2");


    // function for radio button validation
    (function radioValidation() {
        // radio selection is 0
        // for loop goes through all the radio buttons and checks to see if any of the radio buttons are selected
        // if a radio button is selected, it is then added to the variable 'check' and then ends with a break
        let check = 0;
        for (let i = 0; i < system.length; i++) {
            if (system[i].checked) {
                check++;
                break;
            }
        }
        // if 'check' is greater then or equal to 1, run the passStyle and passLabelStyle functions
        // else, run the errorStyle and errorLabelStyle functions
        (check >= 1) ? (passStyle("#radio-container", "#system-label")) : (errors.push("Please select a current console that you play regularly. ✍️"), errorStyle("#radio-container", "#system-label"));
    })();

    // if any errors, return as false and prevent form from submitting, also scroll back to top of window
    if (errors.length) {
        event.preventDefault();
        window.scrollTo(0,0);
        return false;
    } else {
        event.preventDefault();
        window.scrollTo(0,0);
        errorMessages.style.display = "block";
        errorContainer.style.backgroundColor = "#d4edda";
        errorContainer.style.color = "#155724";
        errorContainer.style.border = "1px solid #155724";
        errorContainer.innerHTML = "Thank you for completing this form. This page will now refresh. 🙌";
        (function myFunction() {
          setTimeout(function(){ 
            surveyForm.submit();
        }, 3000);
        })();

    }

}