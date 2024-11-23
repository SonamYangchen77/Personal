document.addEventListener('DOMContentLoaded', function () {
    const dramas = [
        {
            title: "Love Nextdoor",
            image: "love next.jpeg",
            episodes: [
                { episode: "1", url: "LND1.mp4" },
                { episode: "2", url: "Ep 2.mp4" },
                { episode: "3", url: "Ep 3.mp4" }
            ]
        },
        {
            title: "Lovely runner",
            image: "lovely ru.jpg",
            episodes: [
                { episode: "1", url: "lovely1.mkv" },
                { episode: "2", url: "lovely2.mkv" },
                { episode: "3", url: "lovely3.mkv" }
            ]
        },
        {
            title: "Queen of tears",
            image: "queen of tear.jpeg",
            episodes: [
                { episode: "1", url: "Queen1.mp4" },
                { episode: "2", url: "Queen2.mp4" },
                { episode: "3", url: "Queen3.mkv" }
            ]
        },
        {
            title: "Doctor slump",
            image: "doctor.jpeg",
            episodes: [
                { episode: "1", url: "doctor1.mp4" },
                { episode: "2 ", url: "doctor2.mp4" },
                { episode: "3 ", url: "doctor3.mp4" }
            ]
        },
        {
            title: "Mr. Plankton",
            image: "mr.jpeg",
            episodes: [
                { episode: "1", url: "https://example.com/ep1" },
                { episode: "2 ", url: "https://example.com/ep2" },
                { episode: "3", url: "https://example.com/ep3" }
            ]
        },
        {
            title: "Judge from the hell",
            image: "judge.jpeg",
            episodes: [
                { episode: "1", url: "https://example.com/ep1" },
                { episode: "2 ", url: "https://example.com/ep2" },
                { episode: "3", url: "https://example.com/ep3" }
            ]
        }
    ];
    const dramaListContainer = document.getElementById('drama-list');
    const videoPlayer = document.getElementById('video-player');
    const videoElement = document.getElementById('video-element');
    const videoSource = document.getElementById('video-source');
    const closeVideoBtn = document.getElementById('close-video-btn');
    const dramaForm = document.getElementById('drama-form');
    const modal = document.getElementById('modal');
    const openFormBtn = document.getElementById('open-form-btn');
    const closeFormBtn = document.getElementById('close-form-btn');

    // Function to render the drama list
    function renderDramas() {
        dramaListContainer.innerHTML = ''; // Clear existing list
        dramas.forEach(drama => {
            const dramaCard = document.createElement('div');
            dramaCard.classList.add('drama-card');

            const dramaImage = document.createElement('img');
            dramaImage.src = drama.image;
            dramaCard.appendChild(dramaImage);

            const dramaTitle = document.createElement('h3');
            dramaTitle.textContent = drama.title;
            dramaCard.appendChild(dramaTitle);

            const dropdown = document.createElement('div');
            dropdown.classList.add('dropdown');
            const dropdownButton = document.createElement('button');
            dropdownButton.textContent = "Show Episodes";
            dropdown.appendChild(dropdownButton);

            const episodeList = document.createElement('ul');
            episodeList.classList.add('episode-list');
            drama.episodes.forEach(ep => {
                const episodeItem = document.createElement('li');
                episodeItem.textContent = ep.episode;
                episodeItem.onclick = function() {
                    videoSource.src = ep.url;
                    videoElement.load();
                    videoPlayer.style.display = 'block';
                };
                episodeList.appendChild(episodeItem);
            });

            dropdown.appendChild(episodeList);
            dramaCard.appendChild(dropdown);

            dropdownButton.onclick = function() {
                episodeList.style.display = episodeList.style.display === 'block' ? 'none' : 'block';
            };

            dramaListContainer.appendChild(dramaCard);
        });
    }

    // Add new drama from the form
    dramaForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('drama-title').value;
        const image = document.getElementById('drama-image').value;
        const episode1 = document.getElementById('episode1').value;
        const episode2 = document.getElementById('episode2').value;
        const episode3 = document.getElementById('episode3').value;

        const newDrama = {
            title,
            image,
            episodes: [
                { episode: "1 - " + title + " Part 1", url: episode1 },
                { episode: "2 - " + title + " Part 2", url: episode2 },
                { episode: "3 - " + title + " Part 3", url: episode3 }
            ]
        };

        dramas.push(newDrama); // Add new drama to the array
        renderDramas(); // Re-render the list of dramas

        modal.style.display = 'none'; // Close the modal
        dramaForm.reset(); // Clear the form
    });

    // Show the modal when the "Add New Drama" button is clicked
    openFormBtn.onclick = function() {
        modal.style.display = 'block';
    };

    // Close the modal when the "X" button is clicked
    closeFormBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Close the video player
    closeVideoBtn.onclick = function() {
        videoElement.pause();
        videoPlayer.style.display = 'none';
    };

    // Initial render of dramas
    renderDramas();
});