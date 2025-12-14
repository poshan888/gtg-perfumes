// Make header fixed and change bg-color
const navbar = document.getElementById('navbar');

// Listen for the scroll event on the window
window.onscroll = function() {
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
            // Toggle an 'open' class for visual changes (e.g., rotating the '+' icon)
            item.classList.toggle('open');
            
            // show/hide a filter submenu here:
            const submenu = item.nextElementSibling;
            if (submenu && submenu.classList.contains('filter-item-body')) {
                submenu.style.display = item.classList.contains('open') ? 'block' : 'none';
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
            console.log(`${buttonText} clicked! Starting purchase/subscription flow...`);

            // You could add simple visual feedback here, like changing the button text temporarily:
            // const originalText = button.textContent;
            // button.textContent = 'Processing...';
            // setTimeout(() => {
            //     button.textContent = originalText;
            // }, 1500);
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



arr.map(function(item){
  let startnumber = 0

  function counterup(){
  startnumber++
  item.innerHTML= startnumber + "%"
   
  if(startnumber == item.dataset.number){
      clearInterval(stop)
  }
}

let stop =setInterval(function(){
  counterup()
},50)

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

    /**
     * Toggles the 'active' class based on the checked radio button.
     * @param {HTMLElement} activeRadio - The radio button that was checked.
     */
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