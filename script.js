document.addEventListener("DOMContentLoaded", function() {
    // Load previously uploaded items from localStorage when the page is loaded
    loadGallery();

    // Handle form submission
    document.getElementById("upload-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const fileInput = document.getElementById("file-input");
        const descriptionInput = document.getElementById("description-input");
        const gallery = document.getElementById("gallery");

        // Get selected files and description
        const files = fileInput.files;
        const description = descriptionInput.value.trim();

        if (files.length > 0 && description !== "") {
            Array.from(files).forEach(file => {
                const fileReader = new FileReader();

                // Display image or video based on file type
                fileReader.onload = function(event) {
                    const fileURL = event.target.result;

                    // Create a new gallery item
                    const galleryItem = document.createElement("div");
                    galleryItem.classList.add("gallery-item");

                    let mediaElement;

                    if (file.type.startsWith("image")) {
                        mediaElement = document.createElement("img");
                        mediaElement.src = fileURL;
                    } else if (file.type.startsWith("video")) {
                        mediaElement = document.createElement("video");
                        mediaElement.src = fileURL;
                        mediaElement.controls = true;
                    }

                    galleryItem.appendChild(mediaElement);

                    // Add description
                    const descriptionElement = document.createElement("p");
                    descriptionElement.textContent = description;
                    galleryItem.appendChild(descriptionElement);

                    // Append to gallery
                    gallery.appendChild(galleryItem);

                    // Save the uploaded file and description to localStorage
                    saveToLocalStorage(fileURL, description);
                };

                fileReader.readAsDataURL(file); // Read the file as a data URL
            });

            // Clear input fields after upload
            fileInput.value = "";
            descriptionInput.value = "";
        } else {
            alert("Please provide a description and select files to upload.");
        }
    });
});

// Function to save the uploaded files and descriptions to localStorage
function saveToLocalStorage(fileURL, description) {
    const uploadedItems = getFromLocalStorage();
    uploadedItems.push({ fileURL, description });
    localStorage.setItem("uploadedItems", JSON.stringify(uploadedItems));
}

// Function to get the uploaded files and descriptions from localStorage
function getFromLocalStorage() {
    const uploadedItems = localStorage.getItem("uploadedItems");
    return uploadedItems ? JSON.parse(uploadedItems) : [];
}

// Function to load the gallery from localStorage
function loadGallery() {
    const uploadedItems = getFromLocalStorage();
    const gallery = document.getElementById("gallery");

    uploadedItems.forEach(item => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        let mediaElement;

        if (item.fileURL.startsWith("data:image")) {
            mediaElement = document.createElement("img");
            mediaElement.src = item.fileURL;
        } else if (item.fileURL.startsWith("data:video")) {
            mediaElement = document.createElement("video");
            mediaElement.src = item.fileURL;
            mediaElement.controls = true;
        }

        galleryItem.appendChild(mediaElement);

        // Add description
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = item.description;
        galleryItem.appendChild(descriptionElement);

        // Append to gallery
        gallery.appendChild(galleryItem);
    });
}
