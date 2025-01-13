// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBS2fl36K_B3TM1fYtHO6BBZQkAs36IAPY",
    authDomain: "anecotourism.firebaseapp.com",
    projectId: "anecotourism",
    storageBucket: "anecotourism.firebasestorage.app",
    messagingSenderId: "547144125676",
    appId: "1:547144125676:web:2392969ad3bbf84d12e9c9"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get Query Parameter (Destination ID)
const params = new URLSearchParams(window.location.search);
const destinationId = params.get('id');

if (destinationId) {
    const docRef = doc(db, 'destinations', destinationId);

    // Fetch and Render Destination Details
    getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Update Basic Details
            document.getElementById('destination-name').textContent = data.Name;
            document.getElementById('destination-image').src = data.Image_url;
            document.getElementById('destination-description').textContent = data.Description;
            document.getElementById('destination-visiting-hours').textContent = data.Visiting_hours;

            // Embed YouTube Video
            if (data.YouTube_video) {
                console.log("YouTube Video URL: ", data.YouTube_video); // Debugging line
                document.getElementById('youtube-video').src = data.YouTube_video;
            } else {
                console.log("No YouTube video URL found.");
            }

            // Render Map
            if (data.Map_location) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: data.Map_location.latitude, lng: data.Map_location.longitude },
                    zoom: 14
                });
                new google.maps.Marker({
                    position: { lat: data.Map_location.latitude, lng: data.Map_location.longitude },
                    map
                });
            }

            // Render Gallery
            const gallery = document.getElementById('gallery');
            data.Gallery_images.forEach((imageUrl) => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `${data.Name} Gallery Image`;
                img.style.maxWidth = '100%';
                img.style.borderRadius = '10px';
                gallery.appendChild(img);
            });

            // Render Amenities
            const amenitiesList = document.getElementById('destination-amenities');
            data.Amenities.forEach((amenity) => {
                const li = document.createElement('li');
                li.textContent = amenity;
                amenitiesList.appendChild(li);
            });

        } else {
            document.body.innerHTML = `
                <h1>Destination Not Found</h1>
                <p>The destination you are looking for does not exist. Please check the link or go back to the <a href="index.html">home page</a>.</p>
            `;
        }
    }).catch((error) => {
        console.error("Error fetching destination details: ", error);
        document.body.innerHTML = `
            <h1>Error Loading Destination</h1>
            <p>An error occurred while fetching destination details. Please try again later.</p>
        `;
    });
} else {
    document.body.innerHTML = `
        <h1>Invalid Destination</h1>
        <p>The destination ID is missing or invalid. Please go back to the <a href="index.html">home page</a>.</p>
    `;
}