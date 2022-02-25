const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(user) {
    const response = await fetch(APIURL + user);
    const data = await response.json();
    console.log(data);
    createUserCard(data);

    getRepos(user);
}

async function getRepos(user) {
    const response = await fetch(APIURL + user + "/repos?sort=updated");
    const data = await response.json();

    addReposToCard(data);
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos.
        slice(0, 9).
        forEach(repo => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

function createUserCard(data) {
    console.log(data);

    const cardHTML = `
    <div class="card"> 
        <div class = "img-container">
            <img class = "avatar" src='${data.avatar_url}' alt="${data.name}" />
        </div>
        <div class="user-info">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            

            <ul class="info">
                <li>${data.followers}<strong>Followers</strong></li>
                <li>${data.following}<strong>Following</strong></li>
                <li>${data.public_repos}<strong>Repos</strong></li>
            </ul>

            <div id="repos">  </div>
        </div>
    </div>
    `;
    main.innerHTML = cardHTML;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);
        search.value = "";
    }
})

getUser('ilikedietpepsi');

