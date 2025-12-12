document.addEventListener('DOMContentLoaded', () => {
    // 1. Image Gallery Functionality (Thumbnail Switching)
    const mainProductImage = document.querySelector('.main-product-image img');
    const thumbnails = document.querySelectorAll('.thumb');

    // Placeholder image map (replace these with your actual image paths)
    const imageSources = [
        'path/to/product-image-purple.png',
        'path/to/product-image-blue.png',
        'path/to/product-image-orange.png',
        'path/to/product-image-red.png',
        'path/to/product-image-pink.png',
        'path/to/product-image-gold.png',
        'path/to/product-image-dark.png',
        'path/to/product-image-mixed.png'
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
            
            // In a real application, you would show/hide a filter submenu here:
            // const submenu = item.nextElementSibling;
            // if (submenu && submenu.classList.contains('submenu')) {
            //     submenu.style.display = item.classList.contains('open') ? 'block' : 'none';
            // }

            // Simple console log for demonstration
            console.log(`Filter "${item.textContent.trim().slice(0, -1)}" clicked.`);
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