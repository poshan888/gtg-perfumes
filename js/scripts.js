// Search Overlay Toggle
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchCloseBtn = document.getElementById('search-close');
const searchInput = document.getElementById('search-input');
// Open search overlay
if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchOverlay.classList.add('active');
// Focus on input after animation starts        
setTimeout(() => {
    searchInput?.focus();
}, 100);
});
}
// Close search overlay
if (searchCloseBtn && searchOverlay) {
    searchCloseBtn.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput?.blur();
    });
}
// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay?.classList.contains('active')){
        searchOverlay.classList.remove('active');
        searchInput?.blur();
    }});
// Close on overlay background click
if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            searchInput?.blur();
        }
    });
}

// Make header fixed and change bg-color
const navbar = document.getElementById('navbar');

// Listen for the scroll event on the window
window.onscroll = function () {
    // Check if the user has scrolled down a certain amount (e.g., 100px)
    if (document.body.scrollTop >= 100 || document.documentElement.scrollTop >= 100) {
        navbar.classList.add('scrolled'); // Add the 'scrolled' class
    } else {
        navbar.classList.remove('scrolled'); // Remove the 'scrolled' class
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Image Gallery Functionality (Thumbnail Switching)
    const mainProductImage = document.querySelector('.main-product-image img');
    const thumbnails = document.querySelectorAll('.thumb');

    // Placeholder image map (replace these with your actual image paths)
    const imageSources = [
        './assets/images/grid-small-1.jpg',
        './assets/images/grid-small-2.jpg',
        './assets/images/grid-small-3.jpg',
        './assets/images/grid-small-4.jpg',
        './assets/images/grid-small-1.jpg',
        './assets/images/grid-small-2.jpg',
        './assets/images/grid-small-3.jpg',
        './assets/images/grid-small-4.jpg'
    ];

    // Set the initial main image
    if (mainProductImage && imageSources.length > 0) {
        // Use a generic placeholder if the initial image source is needed
        // mainProductImage.src = imageSources[0]; // If the main image is not already set in HTML

        thumbnails.forEach((thumb, index) => {
            // For a complete implementation, you would load the small thumbnail image here:
            // thumb.style.backgroundImage = `url('${imageSources[index]}')`; 

            thumb.addEventListener('click', () => {
                // Update the main image source
                mainProductImage.src = imageSources[index];

                // Update the active state of the thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }

    // 2. Filter Dropdown Interaction (Our Collection Section)
    const filterItems = document.querySelectorAll('.filter-item');

    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            const isCurrentlyOpen = item.classList.contains('open');

            // Close all filter items first
            filterItems.forEach(otherItem => {
                otherItem.classList.remove('open');
                const otherToggleSpan = otherItem.querySelector('.filter-item-header span');
                if (otherToggleSpan) {
                    otherToggleSpan.textContent = '+';
                }
            });

            // If the clicked item wasn't open, open it now
            if (!isCurrentlyOpen) {
                item.classList.add('open');
                const toggleSpan = item.querySelector('.filter-item-header span');
                if (toggleSpan) {
                    toggleSpan.textContent = '−';
                }
            }
        });
    });

    // 3. Simple Button Feedback (Placeholder for e-commerce logic)
    const ctaButtons = document.querySelectorAll('.add-to-bag-btn, .subscription-btn, .cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent form submission if applicable (though these are simple buttons)
            event.preventDefault();

            const buttonText = button.textContent;
        });
    });

    // 4. Newsletter Form Submission (Prevent Default)
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop the page from reloading
            const emailInput = newsletterForm.querySelector('input[type="email"]').value;
            console.log(`Newsletter subscription attempt with email: ${emailInput}`);

            // In a real application, send this data to your server
            alert(`Thank you for subscribing, ${emailInput}!`);
            newsletterForm.reset();
        });
    }
});

let count = document.querySelectorAll(".percentage")
let arr = Array.from(count)



arr.map(function (item) {
    let startnumber = 0

    function counterup() {
        startnumber++
        item.innerHTML = startnumber + "%"

        if (startnumber == item.dataset.number) {
            clearInterval(stop)
        }
    }

    let stop = setInterval(function () {
        counterup()
    }, 50)

})

// Responsive header
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('nav-menu');

    if (toggleButton && mainNav) {
        toggleButton.addEventListener('click', () => {
            // Toggle the 'is-open' class on the navigation menu
            mainNav.classList.toggle('is-open');

            // --- Accessibility (ARIA) Update ---
            // Toggle the aria-expanded state for screen readers
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
            toggleButton.setAttribute('aria-expanded', !isExpanded);
        });
    }
});

// Select Product
document.addEventListener('DOMContentLoaded', () => {
    const configBoxes = document.querySelectorAll('.config-box');
    const radioButtons = document.querySelectorAll('.btn-radio-subsc');
    const headers = document.querySelectorAll('.config-header');

    function toggleSubscriptionBox(activeRadio) {
        // 1. Deselect all boxes
        configBoxes.forEach(box => {
            box.classList.remove('active');
        });

        // 2. Find the parent .config-box of the active radio button
        // and add the 'active' class
        let currentBox = activeRadio.closest('.config-box');
        if (currentBox) {
            currentBox.classList.add('active');
        }

        // 3. Ensure the radio button is marked as checked (important if triggered by header click)
        activeRadio.checked = true;
    }

    // --- A. Handle Radio Button Change Event (Primary Logic) ---
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            toggleSubscriptionBox(event.target);
        });
    });

    // --- B. Handle Header Click Event (User Convenience) ---
    headers.forEach(header => {
        header.addEventListener('click', (event) => {
            // Find the radio button inside the clicked header
            const radio = header.querySelector('.btn-radio-subsc');

            if (radio) {
                // Manually check the radio button and trigger the toggle function
                if (!radio.checked) {
                    toggleSubscriptionBox(radio);
                }
            }
        });
    });

    // --- C. Initial Setup: Activate the default selection ---
    // Check if any radio button is initially marked as checked in the HTML
    const defaultCheckedRadio = document.querySelector('.btn-radio-subsc:checked');
    if (defaultCheckedRadio) {
        toggleSubscriptionBox(defaultCheckedRadio);
    } else {
        // If none is checked, default to the first one and activate it
        if (radioButtons.length > 0) {
            radioButtons[0].checked = true;
            toggleSubscriptionBox(radioButtons[0]);
        }
    }
});


// For horizontal scroll gallery
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('thumbnail-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Determine how much to scroll on each click. 
    // Using the width of a single thumb + gap is a good default.
    const scrollAmount = 90; // (80px thumb width + 10px gap)

    // --- Function to handle scrolling ---
    function scrollGallery(direction) {
        if (direction === 'next') {
            // Scroll the grid container to the right
            grid.scrollLeft += scrollAmount;
        } else if (direction === 'prev') {
            // Scroll the grid container to the left
            grid.scrollLeft -= scrollAmount;
        }
    }

    // --- Attach event listeners to buttons ---
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollGallery('prev');
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollGallery('next');
        });
    }

    // --- Optional: Handle thumbnail selection (if needed) ---
    const thumbs = document.querySelectorAll('.thumb');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function () {
            // Remove 'active' class from all thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            // Add 'active' class to the clicked thumb
            this.classList.add('active');

            // NOTE: If this gallery controls a main, larger image, 
            // you would add the logic here to update the main image source.
        });
    });
});