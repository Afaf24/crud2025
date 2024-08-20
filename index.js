let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let updateIndex = -1;
// Function to calculate total
function gettotal() {
    if (price.value != "") { 
        let result = (+price.value + +taxes.value + +ads.value - +discount.value);
        total.innerHTML = result; 
        total.style.backgroundColor = '#040'; 
    } else {
        total.value = '';
        total.style.backgroundColor = 'red'; 
    }
}

// Initialize new data array
let newdata;
if (localStorage.pro != null) {
    newdata = JSON.parse(localStorage.pro);
} else {
    newdata = [];
}

// Submit button click event
submit.onclick = function() {
    let newelment = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML, 
        count: count.value,
        category: category.value
    };
    if (updateIndex === -1) {
        // If updateIndex is -1, it means we're creating a new entry
        if (newelment.count > 1) {
            for (let i = 0; i < newelment.count; i++) {
                newdata.push({ ...newelment });
            }
        } else {
            newdata.push(newelment);
        }
    } else {
        // If updateIndex is not -1, we're updating an existing entry
        newdata[updateIndex] = newelment;
        updateIndex = -1; // Reset updateIndex after update
        submit.innerHTML = "Create"; // Change the button text back to "Create"
    }

   
    localStorage.setItem("pro", JSON.stringify(newdata));



    // Clear the form fields after submission
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.value = "";
    count.value = "";
    category.value = "";
    readelment()
};


let searchmood ='title';

function btnsearch(id){

    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchmood= 'title';
        search.placeholder='search by title';

    }else {
        searchmood= 'category' ;
        search.placeholder='search by category';
    }
    search.focus();
}




function searchdata(value) {
    let table = ''; // Initialize table as an empty string

    if (searchmood === 'title') {
        for (let i = 0; i < newdata.length; i++) {
            // Ensure that title exists and matches the search criteria
            if (newdata[i].title && newdata[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${newdata[i].title}</td>
                    <td>${newdata[i].price}</td>
                    <td>${newdata[i].taxes}</td>
                    <td>${newdata[i].ads}</td>
                    <td>${newdata[i].discount}</td>
                    <td>${newdata[i].total}</td>
                    <td>${newdata[i].category}</td>
                    <td><button onclick="update(${i})" id="update">Update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        }
    } else {
        for (let i = 0; i < newdata.length; i++) {
            // Ensure that title exists and matches the search criteria
            if (newdata[i].title && newdata[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${newdata[i].title}</td>
                    <td>${newdata[i].price}</td>
                    <td>${newdata[i].taxes}</td>
                    <td>${newdata[i].ads}</td>
                    <td>${newdata[i].discount}</td>
                    <td>${newdata[i].total}</td>
                    <td>${newdata[i].category}</td>
                    <td><button onclick="update(${i})" id="update">Update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        }
    }

    // Set the generated table rows to the table body in the HTML
    document.getElementById('table').innerHTML = table;
}





function readelment() {
    let table = '';
    
    for (let i = 0; i < newdata.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td> <!-- Incremented by 1 to start from 1 -->
            <td>${newdata[i].title}</td>
            <td>${newdata[i].price}</td>
            <td>${newdata[i].taxes}</td>
            <td>${newdata[i].ads}</td>
            <td>${newdata[i].discount}</td>
            <td>${newdata[i].total}</td>
            <td>${newdata[i].category}</td>
            <td><button onclick="update(${i})" id="update">Update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
        </tr>`;
    }
    document.getElementById('table').innerHTML=table
    let delet = document.getElementById('deleteall')
    if(newdata.length>0){

        delet.innerHTML= `
<button id="deletall" onclick="deletall()">Delete all</button>

        `
    }else{
        delet.innerHTML=''
    }
}

readelment();


function update(i){
    title.value = newdata[i].title;
    price.value = newdata[i].price;
    taxes.value = newdata[i].taxes;
    ads.value = newdata[i].ads;
    discount.value = newdata[i].discount;
    total.value = newdata[i].total;
    count.value = newdata[i].count;
    category.value = newdata[i].category;

    // Store the index of the item to be updated
    updateIndex = i;
count.style.display ="none"
gettotal()
    // Change the "Submit" button text to "Update"
    submit.innerHTML = "Update";
}







function deletedata(i){

    newdata.splice(i,1);
    localStorage.pro=JSON.stringify( newdata)
    readelment()
}
function deletall(){

    newdata = [];
    localStorage.pro=JSON.stringify( newdata)
    readelment()
}
