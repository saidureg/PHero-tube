// show category using API
const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <a onclick="displayCategoryData('${category.category_id}')" class="tab tab-active">${category.category} </a>
          `;
    tabContainer.appendChild(div);
    // console.log(category);
  });
};
// show the category wise data
const displayCategoryData = async (id) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  data.data.forEach((showCategory) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card mb-5">
          <figure class="relative">
            <img class= "w-[300px] h-[300px]" src=${
              showCategory.thumbnail
            } alt=${showCategory.title} />
            <p
              class="absolute py-1 px-2 bg-title-color text-white text-[10px] lg:text-xs right-16 md:right-12 bottom-3 rounded"
            >
              3hrs 56 min ago
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
    console.log(showCategory);
  });
  //   console.log(data.data);
};
loadCategory();
