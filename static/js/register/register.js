function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const wholeForm = document.querySelector(".form-whole")
const formPages = [...wholeForm.querySelectorAll(".form-page")]
let pageInfo = {
    currentPage: 0,
    pageValidationStatus: true,
    individualValidation: new Map([
        [0, true],
        [1, true],
        [2, true],
        [3, true]
    ]),
    errors: new Map([
        [0, ""],
        [1, ""],
        [2, ""],
        [3, ""]
    ])
};
pageInfo.currentPage = formPages.findIndex(page =>{
    return !page.classList.contains("d-none")
}) 

if(pageInfo.currentPage < 0){
    pageInfo.currentPage = 0
    showCurrentPage()
}

wholeForm.addEventListener("click", event =>{
    let increment
    pageInfo.pageValidationStatus = true
    if(event.target.matches("[data-next-button]")){
        increment = 1
        const inputFeilds = [...formPages[pageInfo.currentPage].querySelectorAll("input")]
        pageInfo.pageValidationStatus = inputFeilds.every(input => input.reportValidity())
        
    }else if (event.target.matches("[data-previous-button]")){
        increment = -1
    } if (increment == null) return

    if(pageInfo.pageValidationStatus){
        pageInfo.currentPage += increment
        showCurrentPage()
    }
})


function showCurrentPage(){
    formPages.forEach((page, index) => {
        page.classList.toggle("d-none", index != pageInfo.currentPage)
    })
}    

function youngDate(){
    const birthDate = new Date(document.getElementById("id_date_of_birth").value)
    const today = new Date('4/9/2022')

    var age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    const day = today.getDate() - birthDate.getDate()
    if((month < 0 || (month === 0 && day < 0))){
        age--;
    }
    if(age < 18){
        dateSection = document.getElementById("date-check")
        dateSection.classList.remove("d-none")
    }else{
        dateSection = document.getElementById("date-check")
        dateSection.classList.add("d-none")
    }
    document.getElementById("id_age").value = age
}

function formSubmission(){
    const formSubmission = document.getElementById("formSubmission")
    var selects = [...formSubmission.querySelectorAll('input')]
    selects.pop()
    if(document.getElementById("date-check").classList.contains("d-none")){
        selects.pop()
    }

    let allChecked = selects.every(input => input.checked)

    const submissionButton = document.getElementById("submissionButton")
    if(allChecked){
        submissionButton.removeAttribute("disabled", "btn-")
    }else{
        submissionButton.setAttribute("disabled", "")
    }
}

async function emailValidation(){
    emailInput = document.getElementById("id_email")
    if(!emailInput.reportValidity()){
        emailInput.focus();
        return
    }

    validation = postData("/get/json/email/verification", {"email":emailInput.value})
    
    await validation.then(function(result){
        let x = result
        pageInfo.individualValidation.set(pageInfo.currentPage, x.valid)
        pageInfo.errors.set(pageInfo.currentPage,x.message)
    })
    email_error = document.getElementById("email_error_label")
    if(pageInfo.individualValidation.get(pageInfo.currentPage)){ 
        email_error.classList.add("d-none")
        return 
    }else{
        email_error.classList.remove("d-none")
        emailInput.focus();
    }
}

async function passwordValidation(){
    validation = postData("/get/json/password/verification", {"p1":"someKindaDrug", "p2":"cantExplain"})
    await validation.then(function(result){
        let x = result
        pageInfo.individualValidation.set(pageInfo.currentPage, x.valid)
    })
}



async function postData(url, data) {
    var x = await fetch(url, {
        method: "POST",
        headers: {
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
           data
        })
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        return data
    }).catch(function (err) {
        console.log(err);
    })
    return (x)
}


// function otherValidators(){
//     switch (pageInfo.currentPage) {
//         case 0:
//             break;
//         case 1:
//             break;
//         case 2:
//             break;
//         case 3:
//             break;
//         case 4:
//             break;
//         default:
//             break;
//     }
// }