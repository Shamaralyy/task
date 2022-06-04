let tog = document.querySelectorAll(".tog");
let item = document.querySelectorAll(".item");
let img = document.querySelectorAll("img");
let content = document.querySelector(".content");
let off_title = document.querySelectorAll(".off_title");
let tat_title = document.querySelectorAll(".tat_title");
let str_title = document.querySelectorAll(".str_title");
let rank_img = document.querySelectorAll(".rank_img");
let rank_li = document.querySelectorAll(".rank_li");

for (let i = 0; i < 2; i++) {
    tog[i].addEventListener('touchstart', function () {
        for (let j = 0; j < 2; j++) {
            tog[j].classList.remove("active");
        }
        this.classList.add("active");
        for(let i = 0;i<item.length;i++) {
            item[i].style.display = 'none';
        }
        item[i].style.display = 'block';
    })
}

let search = document.querySelector(".search");
let searching = document.querySelector(".searching");
let recommand = document.querySelector(".recommand");
let ranking = document.querySelector(".ranking");

search.onclick = () => {
    for(let i = 0;i<item.length;i++) {
        item[i].style.display = 'none';
    }
    searching.style.display = 'block';
}


let column_ul = document.querySelector(".column_ul");

fetch('http://124.221.249.219:8000/api/recommendations')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        for (let i = 1; i < data.offical.length + 1; i++) {
            img[i].src = data.offical[i - 1].cover;
            off_title[i - 1].innerHTML = data.offical[i - 1].title;
        }

        for (let i = 7; i < data.tatsujin.length + 7; i++) {
            img[i].src = data.tatsujin[i - 7].cover;
            tat_title[i - 7].innerHTML = data.tatsujin[i - 7].title;
        }

        for (let i = 0; i < data.column.length; i++) {
            let column_li = document.createElement('li');

            column_li.innerHTML = `                     <li>
            <img src="${data.column[i].background}" alt="">
            <p>${data.column[i].title}</p>
        </li>`;

            column_ul.appendChild(column_li);
        }
    });



let rank_ul = document.querySelector(".rank_ul");

fetch('http://124.221.249.219:8000/api/ranking')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let rank_li = document.createElement('li');

            rank_li.innerHTML = `                <li class="rank_li">
                <div class="left">
                    <p style="float:left;font-size:19px;color:#040404;font-weight:bold;">${data[i].title}</p>
                    <div style="clear: both;"></div>
                    <ol style="float: left;margin-left:18px">
                        <li>${data[i].top3[0].title}</li>
                        <li>${data[i].top3[1].title}</li>
                        <li>${data[i].top3[2].title}</li>
                    </ol>
                </div>
                <img src="${data[i].cover}" alt="">
            </li>`;

            rank_ul.appendChild(rank_li);
        }
    });

let search_ul = document.querySelector(".search_ul");
let input = document.querySelectorAll(".search")[1];
let list = document.querySelector(".list");
let history = document.querySelector(".history");
let list_content = document.querySelector(".list_content");


input.addEventListener('keypress', function () {
    console.log(input.value);
    let new_history = document.createElement('span');
    new_history.innerHTML += `<span class="hot" style="margin:10px">${input.value}</span>`;
    history.appendChild(new_history);

    fetch('http://124.221.249.219:8000/api/search?keyword=' + input.value)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let new_div = document.createElement('div');
                new_div.innerHTML = `            <div style="margin-top: 21px;">
                <p style="margin-left:-255px;color:#141414;font-size: 16px;font-weight:546;">${data[i].title}</p>
                <p style="margin-left:-303px;color:#c2c2c2;font-size: 12px;">${data[i].artist[0]}</p>
            </div>`;
                list_content.appendChild(new_div);
            }
        });

    for (let i = 0; i < item.length; i++) {
        item[i].style.display = 'none';
    }
    list.style.display = 'block';


})

// 热门搜索
let search_content = document.querySelector(".search_content");

fetch('http://124.221.249.219:8000/api/hot')
.then((res) => res.json())
.then((data) => {
    console.log(data);
    let hot_div = document.createElement('div');
    for(let i = 0;i<data.length;i++) {
        hot_div.innerHTML += `<div class="hot" style="margin:10px">${data[i]}</div>`;
        search_content.appendChild(hot_div);
    }
})

let cancel = document.querySelector(".cancel");

cancel.addEventListener('click',function() {
    console.log(1);
    for(let i = 0;i<item.length;i++) {
        item[i].style.display = 'none';
    }
    searching.style.display = 'block';
})
