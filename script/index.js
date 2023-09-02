// show category using API
const loadCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();

    // all tab show category wise
    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((category) => {
      const div = document.createElement("div");
      div.innerHTML = `
            <a onclick="fetchCategoryList('${category.category_id}')" class="tab tab-active">${category.category} </a>
            `;
      tabContainer.appendChild(div);
    });
  } catch (error) {
    console.error("An error occurred while loading the data", error);
  }
};

// declared the global variable for passing the Id
let selectedCategoryId;

// show the data of category wise
const fetchCategoryList = async (id = 1000) => {
  try {
    selectedCategoryId = id;

    // card data fetch
    const res = await fetch(
      ` https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await res.json();

    // if on data are available then show the empty message section clear
    const emptyCard = document.getElementById("empty-card");
    emptyCard.textContent = "";

    // here check the category value are empty or not
    if (!data.status) {
      const div = document.createElement("div");
      div.innerHTML = `
    <img class='ml-24 md:ml-32' src="./image/Icon.png" alt="" />
    <p class="text-title-color font-bold text-2xl ml-3 md:text-4xl mt-4">
     Oops!! Sorry, There is no <br>
     content here
    </p>
    
      `;
      emptyCard.appendChild(div);
    }
    displayCategoryData(data);
  } catch (error) {
    console.error("An error occurred while loading the data", error);
  }
};

const displayCategoryData = (data) => {
  // selected the card container by id
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  data.data.forEach((showCategory) => {
    // convert posted date to hour and min
    const postedDate = showCategory.others.posted_date;
    const hour = Math.floor(postedDate / 3600);
    const min = Math.floor((postedDate % 3600) / 60);

    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card mb-5">
              <figure class="relative">
                <img class= "w-[300px] h-[300px]" src=${
                  showCategory.thumbnail
                } alt=${showCategory.title} />
                <p
                  class="absolute py-1 px-2 ${
                    hour ? "bg-title-color text-white opacity-80" : ""
                  }  text-[10px] lg:text-xs right-16 md:right-12 bottom-3 rounded"
                >
                ${hour ? hour + "hrs" : ""} ${min ? min + "min ago" : ""}
                </p>
              </figure>
              <div class="flex w-[312px] mx-auto mt-4">
                <div>
                  <img class = "w-[50px] h-[50px] rounded-full" src=${
                    showCategory.authors[0].profile_picture
                  } alt=${showCategory.authors[0].profile_name} />
                </div>
                <div class="ml-3 space-y-2 flex-1 text-title-color">
                  <h2 class="font-bold">
                    ${showCategory.title}
                  </h2>
    
                  <div class="flex items-center gap-3">
                    <h3 class="text-sm lg:text-base opacity-70">${
                      showCategory.authors[0].profile_name
                    }</h3>
                    ${
                      showCategory.authors[0].verified === true
                        ? '<img src="./image/fi_10629607.png" alt="" />'
                        : ""
                    }
                    
                  </div>
    
                  <p class="text-sm lg:text-base opacity-70"><span>${
                    showCategory.others.views
                  }</span> views</p>
                </div>
              </div>
            </div>
            `;
    cardContainer.appendChild(div);
  });
};

// sorting the card depend on total view
const sortViewBnt = async () => {
  try {
    if (selectedCategoryId === "1005") {
      alert("No content are available for Sorting");
    } else {
      // fetch data category_Id based
      const res = await fetch(
        ` https://openapi.programming-hero.com/api/videos/category/${selectedCategoryId}`
      );
      const data = await res.json();

      // extract view counts and parse them as numeric values
      const getSortedCard = data.data.map((unsortedCard) => {
        const view = unsortedCard.others.views;
        const numericView = parseFloat(view.replace("K", "")) * 1000;

        return {
          totalView: numericView,
          card: unsortedCard,
        };
      });

      // sorting the card based on totalView Property
      getSortedCard.sort((a, b) => b.totalView - a.totalView);

      // call displayCategoryData function
      displayCategoryData({
        data: getSortedCard.map((sortedCard) => sortedCard.card),
      });
    }
  } catch (error) {
    console.error("An error occurred while loading the data", error);
  }
};

// calling loadCategory function for show the all category
loadCategory();

// by default show all data
fetchCategoryList();
