// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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

// Handle Form Submission
const form = document.getElementById('destination-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get form data
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('image-url').value;
    const visitingHours = document.getElementById('visiting-hours').value;
    const youtubeVideo = document.getElementById('youtube-video').value;
    const mapLocationLat = parseFloat(document.getElementById('map-location-lat').value);
    const mapLocationLng = parseFloat(document.getElementById('map-location-lng').value);
    const galleryImages = document.getElementById('gallery-images').value.split(',').map(url => url.trim());
    const amenities = document.getElementById('amenities').value.split(',').map(amenity => amenity.trim());

    try {
        // Add destination to Firestore
        const docRef = await addDoc(collection(db, 'destinations'), {
            Name: name,
            Description: description,
            Image_url: imageUrl,
            Visiting_hours: visitingHours,
            YouTube_video: youtubeVideo,
            Map_location: { latitude: mapLocationLat, longitude: mapLocationLng },
            Gallery_images: galleryImages,
            Amenities: amenities
        });
        alert(`Destination added successfully! Document ID: ${docRef.id}`);
        form.reset(); // Clear the form
    } catch (error) {
        console.error("Error adding destination: ", error);
        alert("Error adding destination. Check the console for details.");
    }
});