let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let small = document.getElementById("small");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let count = document.getElementById("count");
let creat = document.getElementById("creat");

// console.log(title, price, taxes, ads, small, category, count, creat);

let mood = "create";
let temp;
//get total function

function getTotal() {
  if (price.value != "") {
    let result1 = Number(price.value) + Number(taxes.value) + Number(ads.value);
    let result2 = Number(descount.value);
    result = result1 - result2;

    small.innerText = result;
    small.style.background = "#0000";
  } else {
    small.innerText = "";
    small.style.background = "blue";
  }
}
// دلوقت هحفظ الداتا في اراي
// اشوف اللوكال ستوريج فاضيه ولا لا ولو مش فاضيه احط فيها الي فيها
let dataprod;
if (localStorage.product != null) {
  dataprod = JSON.parse(localStorage.product);
} else {
  let dataprod = [];
}

creat.onclick = function () {
  let newprod = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    small: small.innerHTML,
    descount: descount.value,
    category: category.value.toLowerCase(),
    count: count.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    count.value < 100 &&
    category.value != ""
  ) {
    if (mood == "create") {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          dataprod.push(newprod);
        }
      } else {
        dataprod.push(newprod);
      }
      clearData();
    } else {
      dataprod[temp] = newprod;
      mood = "create";
      creat.value = "create";
      count.style.display = "block";
    }
  } else {
  }
  localStorage.setItem("product", JSON.stringify(dataprod));
  console.log(dataprod);

  readData();
};

//clear data
function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  small.innerHTML = "";
  descount.value = "";
  count.value = "";
  category.value = "";
}

function readData() {
  let tab = "";
  for (let i = 0; i < dataprod.length; i++) {
    tab += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataprod[i].title}</td>
        <td>${dataprod[i].price}</td>
        <td>${dataprod[i].taxes}</td>
        <td>${dataprod[i].ads}</td>
        <td>${dataprod[i].descount}</td>
        <td>${dataprod[i].small}</td>
        <td>${dataprod[i].category}</td>
        <td><button onclick = "updateData(${i})" class="btn btn-outline-dark">update</button></td>
        <td><button onclick = "deletData(${i})" class="btn btn-outline-danger">delete</button></td>
      </tr>
    `;
  }
  document.querySelector("#tbody").innerHTML = tab;
  let deletbtn = document.getElementById("deletall");
  if (dataprod.length > 0) {
    deletbtn.innerHTML = `
     <input
          onclick = "deletAll()"
          class="btn btn-outline-dark"
          type="submit"
          value="Delete All (${dataprod.length})"
        />`;
  } else {
    deletbtn.innerHTML = ``;
  }
}
readData();

// delet the cul of data

function deletData(i) {
  dataprod.splice(i, 1);
  // عشان اهندل الدنيا جوه اللوكال ستوريج لازم احفظ الاراي الجديده في الللوكل بعد ما مسحت
  localStorage.product = JSON.stringify(dataprod);
  readData();
}

function deletAll() {
  dataprod.splice(0, dataprod.length);
  localStorage.product = JSON.stringify(dataprod);
  readData();
}

//update
function updateData(i) {
  title.value = dataprod[i].title;
  price.value = dataprod[i].price;
  ads.value = dataprod[i].ads;
  taxes.value = dataprod[i].taxes;
  descount.value = dataprod[i].descount;
  count.style.display = "none";
  category.value = dataprod[i].category;
  creat.value = "update";
  mood = "update";
  temp = i;

  getTotal();
  scroll({
    top: 0,
  });
}

// search function
let searchMood = "title";
function getSearchMood(id) {
  let searchfield = document.getElementById("searchfield");
  if (id == "searchtitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  searchfield.placeholder = "search by " + searchMood;
  searchfield.focus();
  searchfield.value = "";
  readData();
  // console.log(searchMood);
}

function searchData(value) {
  // console.log(value);
  let tab = "";
  for (let i = 0; i < dataprod.length; i++) {
    if (searchMood === "title") {
      if (dataprod[i].title.includes(value.toLowerCase())) {
        tab += `
      <tr>
            <td>${i + 1}</td>
            <td>${dataprod[i].title}</td>
            <td>${dataprod[i].price}</td>
            <td>${dataprod[i].taxes}</td>
            <td>${dataprod[i].ads}</td>
            <td>${dataprod[i].descount}</td>
            <td>${dataprod[i].small}</td>
            <td>${dataprod[i].category}</td>
            <td><button onclick = "updateData(${i})" class="btn btn-outline-dark">update</button></td>
            <td><button onclick = "deletData(${i})" class="btn btn-outline-danger">delete</button></td>
          </tr>
    `;
        console.log(i);
      }
    } else {
      if (dataprod[i].category.includes(value.toLowerCase())) {
        tab += `
      <tr>
            <td>${i + 1}</td>
            <td>${dataprod[i].title}</td>
            <td>${dataprod[i].price}</td>
            <td>${dataprod[i].taxes}</td>
            <td>${dataprod[i].ads}</td>
            <td>${dataprod[i].descount}</td>
            <td>${dataprod[i].small}</td>
            <td>${dataprod[i].category}</td>
            <td><button onclick = "updateData(${i})" class="btn btn-outline-dark">update</button></td>
            <td><button onclick = "deletData(${i})" class="btn btn-outline-danger">delete</button></td>
          </tr>
    `;
        console.log(i);
      }
    }
  }
  document.querySelector("#tbody").innerHTML = tab;
}
