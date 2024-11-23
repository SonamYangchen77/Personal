let playlists = [
    {
        name: "BTS",
        image: "bts.jpeg",
        songs: [
            { title: "Mic drop", dateAdded: new Date('2022-12-01'), url: "mic drop bts.m4a" },
            { title: "Answer: love myself", dateAdded: new Date('2022-12-02'), url: "love muself.mp3" },
            { title: "Mikrorosmos", dateAdded: new Date('2022-12-03'), url: "mikrorosmos bts.mp3" },
            { title: "Run", dateAdded: new Date('2022-12-04'), url: "run bts.mp3" },
            { title: "I need you", dateAdded: new Date('2022-12-05'), url: "i need u bts.mp3" }
        ]
    },
    {
        name: "Enhypen",
        image: "enha.jpg",
        songs: [
            { title: "Fever", dateAdded: new Date('2023-01-01'), url: "fever enha.mp3" },
            { title: "Future perfect", dateAdded: new Date('2023-01-02'), url: "future perfect enha.mp3" },
            { title: "Paradoxx", dateAdded: new Date('2023-01-03'), url: "paradox enha.mp3" },
            { title: "Shout out", dateAdded: new Date('2023-01-04'), url: "shoutout enha.mp3" },
            { title: "TFW", dateAdded: new Date('2023-01-05'), url: "TFW-enha.mp3" }
        ]
    },
    {
        name: "TXT",
        image: "txt.jpg",
        songs: [
            { title: "Deja vu", dateAdded: new Date('2023-02-01'), url: "deja vu txt.mp3" },
            { title: "Sugar rush rude", dateAdded: new Date('2023-02-02'), url: "sugar rush txt.mp3" }
        ]
    },
    {
        name: "Seventeen",
        image: "seventeen.jpeg",
        songs: [
            { title: "Super", dateAdded: new Date('2023-03-01'), url: "super sev.mp3" },
            { title: "Maestro", dateAdded: new Date('2023-03-02'), url: "maestro sev.mp3" },
            { title: "Hot", dateAdded: new Date('2023-03-03'), url: "hot sev.mp3" },
            { title: "Darling", dateAdded: new Date('2023-03-04'), url: "darling sev.mp3" },
            { title: "Left and right", dateAdded: new Date('2023-03-05'), url: "left and right sev.mp3" }
        ]
    }
];



// Function to render all playlists
function renderPlaylists() {
    playlistContainer.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const playlistCard = document.createElement('div');
        playlistCard.classList.add('playlist-card');

        playlistCard.innerHTML = `
            <div class="playlist-image" style="background-image: url('${playlist.image}');"></div>
            <h3>${playlist.name}</h3>
            <button class="dropdown-btn" onclick="toggleSongList(${index})">Show Songs</button>
            <button class="add-song-btn" onclick="showAddSongForm(${index})">Add Song</button>
            <ul class="song-list" id="song-list-${index}">
                ${playlist.songs.map((song, songIndex) => `<li class="song-item" onclick="playSong(${index}, ${songIndex})">${song.title}</li>`).join('')}
            </ul>
        `;

        playlistContainer.appendChild(playlistCard);
    });
}

let currentPlaylistIndex = null;
let currentSongIndex = null;

const playlistContainer = document.getElementById('playlist-container');
const currentSongPlayer = document.getElementById('current-song-player');
const audioPlayer = document.getElementById('audio-player');
const currentSongTitle = document.getElementById('current-song-title');

// Render all playlists
function renderPlaylists() {
    playlistContainer.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const playlistCard = document.createElement('div');
        playlistCard.classList.add('playlist-card');

        // Dropdown for sorting
        const dropdown = `
            <select onchange="sortSongs(${index}, this.value)">
                <option value="title">Sort by Title</option>
                <option value="date">Sort by Date</option>
            </select>
        `;

        playlistCard.innerHTML = `
            <div class="playlist-image" style="background-image: url('${playlist.image}');"></div>
            <h3>${playlist.name}</h3>
            ${dropdown}
            <button class="add-song-btn" onclick="showAddSongForm(${index})">Add Song</button>
            <ul class="song-list" id="song-list-${index}">
                ${playlist.songs.map((song, songIndex) => 
                    `<li class="song-item" onclick="playSong(${index}, ${songIndex})">${song.title}</li>`
                ).join('')}
            </ul>
        `;

        playlistContainer.appendChild(playlistCard);
    });
}

// Sort songs by title or date
function sortSongs(playlistIndex, criterion) {
    if (criterion === 'title') {
        playlists[playlistIndex].songs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criterion === 'date') {
        playlists[playlistIndex].songs.sort((a, b) => a.dateAdded - b.dateAdded);
    }
    renderPlaylists();
}

// Play selected song
function playSong(playlistIndex, songIndex) {
    currentPlaylistIndex = playlistIndex;
    currentSongIndex = songIndex;
    const song = playlists[playlistIndex].songs[songIndex];

    currentSongTitle.textContent = song.title;
    audioPlayer.src = song.url;
    audioPlayer.play();
    currentSongPlayer.style.display = 'block'; // Show current song player
}

// Play next song
function playNextSong() {
    currentSongIndex++;
    if (currentSongIndex >= playlists[currentPlaylistIndex].songs.length) {
        currentSongIndex = 0; // Loop back to the first song
    }
    playSong(currentPlaylistIndex, currentSongIndex);
}

// Play previous song
function playPreviousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlists[currentPlaylistIndex].songs.length - 1; // Loop back to the last song
    }
    playSong(currentPlaylistIndex, currentSongIndex);
}

// Show form to add new song
function showAddSongForm(index) {
    currentPlaylistIndex = index;
    document.querySelector('.add-song-form').style.display = 'block';
}

// Add new song to selected playlist
function addNewSongToPlaylist() {
    const songTitle = document.getElementById('new-song-title').value;
    const songUrl = document.getElementById('new-song-url').value;
    if (songTitle && songUrl && currentPlaylistIndex !== null) {
        const newSong = {
            title: songTitle,
            dateAdded: new Date(), // Automatically set to the current date
            url: songUrl
        };
        playlists[currentPlaylistIndex].songs.push(newSong);
        renderPlaylists();

        // Clear input fields and hide the form
        document.getElementById('new-song-title').value = '';
        document.getElementById('new-song-url').value = '';
        document.querySelector('.add-song-form').style.display = 'none';
    }
}

// Add new playlist
function addNewPlaylist() {
    const newPlaylistName = document.getElementById('new-playlist-name').value;
    if (newPlaylistName) {
        const newPlaylist = {
            name: newPlaylistName,
            image: "https://via.placeholder.com/150",
            songs: []
        };
        playlists.push(newPlaylist);
        renderPlaylists();

        // Clear input field
        document.getElementById('new-playlist-name').value = '';
    }
}

document.addEventListener("DOMContentLoaded", renderPlaylists);