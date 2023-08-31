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
          <a class="tab tab-active">${category.category} </a>
          `;
    tabContainer.appendChild(div);
    console.log(category);
  });
};
loadCategory();
