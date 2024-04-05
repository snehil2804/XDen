//navbar.js
// Array of words to replace "XDen" with

const replacements = [
    'TechDen', 'FoodDen', 'HealthDen', 'CodeDen', 'DevDen', 'DecorDen',
    'ArtDen', 'MusicDen', 'TravelDen', 'FashionDen', 'GamingDen', 'NatureDen',
    'FitnessDen', 'FinanceDen', 'BusinessDen', 'CraftDen', 'BookDen', 'MovieDen',
    'ScienceDen', 'SpaceDen', 'EducationDen', 'PetDen', 'HomeDen', 'GardenDen',
    'AdventureDen', 'SpiritDen', 'MindDen', 'FamilyDen', 'FriendDen', 'CommunityDen'
];

// Function to randomly select a replacement word
function getRandomReplacement() {
    const randomIndex = Math.floor(Math.random() * replacements.length);
    return replacements[randomIndex];
}

// Function to handle logo click event
function handleLogoClick() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.textContent = getRandomReplacement();
    }
}

// Event listener for logo click
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', handleLogoClick);
    }
});

