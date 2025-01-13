// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


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

// Fetch Destinations from Firestore
async function fetchDestinations() {
    const destinationsCol = collection(db, 'destinations'); // Reference to the collection
    const destinationSnapshot = await getDocs(destinationsCol); // Fetch all documents
    const destinationList = destinationSnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }; // Combine the document ID with its data
    });

    // Render destinations on the page
    const grid = document.getElementById('destinations-grid'); // Get the grid container
    destinationList.forEach(destination => {
        const card = document.createElement('div'); // Create a new card
        card.className = 'destination-card'; // Add a CSS class for styling
        card.innerHTML = `
            <img src="${destination.Image_url}" alt="${destination.Name}">
            <h3>${destination.Name}</h3>
            <p>${destination.Description}</p>
            <a href="destination.html?id=${destination.id}">Read More</a> <!-- Use the document ID -->
        `;
        grid.appendChild(card); // Add the card to the grid
    });
}

// Load destinations on page load
fetchDestinations();