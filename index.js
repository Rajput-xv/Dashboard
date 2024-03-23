// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';

// function hiddennav(){
//     document.getElementById('mySidebar').style.display = "none";
// }

function apicall(){
    var create = document.getElementById('main-section');
    if (create.style.display === 'flex' || create.style.display === '') {
        create.style.display = 'none';
    }
    const apiUrl = 'https://picsum.photos/v2/list?page=1&limit=6';

    // Make a GET request
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // console.log(data); // Handle the API response data
        renderResponse(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function renderResponse(data) {
    const responseContainer = document.getElementById('response-container');
    const responseContainerhome = document.getElementById('response-container-home');
    const text = document.getElementById('text');
    // Clear previous content
    responseContainer.innerHTML = '';
    
    const head = document.createElement('h2');
    head.textContent="Click on Image for author name";
    text.appendChild(head);
    
    // Iterate over the data and create div elements
    for (let i = 0; i < 6; i++) {
        const item = data[i];

        // Create card container
        const card = document.createElement('div');
        card.classList.add('card');

        // Create image element
        const img = document.createElement('img');
        img.src = item.download_url; // Assuming the URL to the image is provided in the API response
        img.alt = 'Image'; // Add alt text for accessibility
        img.width=200;
        card.appendChild(img);

        // Create author element
        const author = document.createElement('h3');
        author.textContent = 'Author : ' + item.author; // Display author name
        // card.appendChild(author);
        author.style.display = 'none'; // Initially hide the author

        // Add event listener to the image
        img.addEventListener('click', function() {
            // Toggle author visibility
            author.style.display = author.style.display === 'none' ? 'block' : 'none';
        });

        card.appendChild(img);
        card.appendChild(author);
        

        // Append card to the response container
        responseContainer.appendChild(card);
        if (i < 3) {
            card.classList.add('first-row');
        } else {
            card.classList.add('second-row');
        }
    }
    const more = document.createElement('h4');
    const link = document.createElement('a');
    link.textContent='Home';
    link.href = './index.html';
    more.className="more";
    responseContainerhome.append(link);
}

function Header(){
    function toggleSidebar() {
        var sidebar = document.getElementById('mySidebar');
        var menuButton = document.getElementById('menuButton');
    
        if (sidebar.style.display === 'flex' || sidebar.style.display === '') {
            sidebar.style.display = 'none';
            menuButton.style.display = 'flex';
        } else if (sidebar.style.display === 'none' || sidebar.style.display === ''){
            sidebar.style.display = 'flex';
            menuButton.style.display = 'none';
        }
    }

    return (
        <header>
            <div id="menuButton" className="menu-button" style={{ display: 'none' }} >
                <span onClick={toggleSidebar}><img src="https://th.bing.com/th/id/OIP.lnAQma_7yLg6EYxdU5EAkAHaHa?w=512&h=512&rs=1&pid=ImgDetMain" width={50}/></span>
            </div>
            
            <nav className="nav" id="mySidebar" >
                <div className="up">
                    <h1><a href="./index.html">Necleo</a></h1>
                    <div>
                        <ul className="one">
                            <li><a href="./index.html"><img src="./my_project.png" width={40}/>My Projects</a></li>
                            <li><a><img src="./sample_project.png" width={40}/>Sample Projects</a></li>
                        </ul>
                    </div>
                    <ul className="one">
                        <li><a><img src="./apps.png" width={40}/>Apps</a></li>
                        <li><a><img src="./intro.png" width={40}/>Intro to Necleo</a></li>
                    </ul>
                </div>
                <div className="down">
                    <ul className="one">
                        <li><a><img src="./help.png" width={40}/>Help & Support</a></li>
                        <li><a><img src="./feedback.png" width={40}/>Feedback</a></li>
                        <li><a onClick={toggleSidebar}><img src="./collapse.png" width={40}/>Collapse</a></li>
                    </ul>
                </div>
                
            </nav>
        </header>
    )
}
function Profile(){
    return (
        <div className="profile-main">
            <div className="profile-text">
                <h3>Free Trail  |  <span>2days left</span></h3>
                <h4><a>Extend free trail</a></h4>
            </div>
            <div className="profile-img">
                <img src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg" width={40}></img> 
            </div>
        </div>
    )
}
function MainContent(){
    return (
        <div>
            <div className="main-section" id="main-section">
                <h1>My Projects</h1>
                <div className="content">
                    <div className="create" onClick={apicall}>
                        <img src="./create.png" width={60}/>
                    </div>
                    <h3><a onClick={apicall}>Create a new project</a></h3>
                    <h4>or try a <a>sample project</a></h4>
                </div>
            </div>
            <div id="text">

            </div>
            <div id="response-container">
                {/* Response data will be populated here */}
            </div>
            <div id="response-container-home">
                {/* Response data will be populated here */}
            </div>
        </div>
        
    )
}
function Page(){ 
    
    return (
        <div id="main">
            <div className="main1">
                <Header />
            </div>
            <div className="main2">
                <Profile/>
                <MainContent/>
            </div>
            
        </div>
    )
} 

ReactDOM.render(<Page />, document.getElementById('root'));