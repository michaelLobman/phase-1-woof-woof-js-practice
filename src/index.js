document.addEventListener('DOMContentLoaded', pupFunctions);

function pupFunctions(){
    renderPups();
    filterPups();
}

function renderPups(){
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(pups => {
        const dogBar = document.getElementById('dog-bar')
        const dogContainer = document.getElementById('dog-info');
        for(const pup of pups) {
            const pupName = document.createElement('span');
            pupName.textContent = pup["name"];
            dogBar.append(pupName);
            pupName.addEventListener('click', function(){
                const pupInfo = document.createElement('div');
                const pupHeader = document.createElement('h2');
                const pupImg = document.createElement('img');
                const pupButton = document.createElement('button');
                pupInfo.className = "pup"
                pupButton.className = 'good-or-bad'
                if(pup["isGoodDog"] === true) {
                    pupButton.textContent = "Good Dog!";
                } else {
                    pupButton.textContent = "Bad Dog!";
                }
                pupHeader.textContent = pup["name"];
                pupImg.src = pup["image"];
                dogContainer.append(pupInfo);
                pupInfo.append(pupImg);
                pupInfo.append(pupHeader);
                pupInfo.append(pupButton);
                pupButton.addEventListener('click', function(e){
                    if (e.target.textContent === "Good Dog!") {
                        e.target.textContent = "Bad Dog!";
                        fetch(`http://localhost:3000/pups/${pup["id"]}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            "isGoodDog": false,
                        })
                    })
                    } else {
                        e.target.textContent = "Good Dog!";
                        fetch(`http://localhost:3000/pups/${pup["id"]}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            "isGoodDog": true,
                        })
                    })
                    };
                })
            });
        }
    })
}

function filterPups(){
    const dogFilter = document.getElementById('good-dog-filter');
    dogFilter.addEventListener('click', function(e) {
        const pups = document.getElementsByClassName('pup');
        if (e.target.textContent === "Filter good dogs: OFF") {
            e.target.textContent = "Filter good dogs: ON";
            for(const pup of pups) {
                if(pup.children[2].textContent === "Bad Dog!"){
                    pup.remove();
                }
            }
        } else {
            e.target.textContent = "Filter good dogs: OFF";
        } 
    }) 
}