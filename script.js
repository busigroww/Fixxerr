// Spare Parts Price Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const brandFilter = document.getElementById('brandFilter');
    const searchResults = document.getElementById('searchResults');
    const searchBtn = document.querySelector('.search-btn');

    // Ensure the search elements exist
    if (!searchInput || !searchResults || !searchBtn || !brandFilter) {
        console.error('Search elements not found in the DOM');
        return;
    }

    // Initialize the search results container
    searchResults.innerHTML = '';

    // Function to perform search
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const selectedBrand = brandFilter.value.trim().toUpperCase();
        
        if (query.length < 2 && selectedBrand === '') {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }

        // Filter the data based on the query and selected brand
        let results = sparePartsData;
        
        // Apply text search filter if query exists
        if (query.length >= 2) {
            results = results.filter(item => 
                item["Item Name"].toLowerCase().includes(query)
            );
        }
        
        // Apply brand filter if a brand is selected
        if (selectedBrand !== '') {
            results = results.filter(item => 
                item["Item Name"].toUpperCase().includes(selectedBrand)
            );
        }

        // Display the results
        if (results.length > 0) {
            searchResults.innerHTML = '';
            
            results.slice(0, 10).forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                
                const itemName = document.createElement('div');
                itemName.className = 'item-name';
                itemName.textContent = item["Item Name"];
                
                const itemPrice = document.createElement('div');
                itemPrice.className = 'item-price';
                itemPrice.textContent = `₹${item["Selling Price (Customer)"]}`;
                
                resultItem.appendChild(itemName);
                resultItem.appendChild(itemPrice);
                searchResults.appendChild(resultItem);
            });
            
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<div class="no-results">No matching spare parts found</div>';
            searchResults.classList.add('active');
        }
    }

    // Event listeners
    searchInput.addEventListener('input', performSearch);
    brandFilter.addEventListener('change', performSearch);
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch();
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchBtn.contains(e.target) && !searchResults.contains(e.target) && !brandFilter.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Add warranty information to services section
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        if (!card.querySelector('.warranty-info')) {
            const warrantyInfo = document.createElement('div');
            warrantyInfo.className = 'warranty-info';
            warrantyInfo.innerHTML = '<i class="fas fa-shield-alt"></i> 45-Day Warranty';
            card.appendChild(warrantyInfo);
        }
        
        // Add click event to service cards to open booking modal and select appropriate appliance
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('h3').textContent.trim();
            const bookingModal = document.getElementById('bookingModal');
            const applianceTypeSelect = document.getElementById('applianceType');
            
            // Open the booking modal
            if (bookingModal) {
                bookingModal.classList.add('active');
                
                // Select the appropriate appliance type based on the service card clicked
                if (applianceTypeSelect) {
                    // Map service titles to appliance type options
                    const serviceToApplianceMap = {
                        'AC Installation': 'AC Installation (₹999)',
                        'AC Service': 'AC Service (₹499)',
                        'Refrigerator Repair': 'Double door Refrigerator (₹49)',
                        'Washing Machine Repair': 'Fully Automatic Washing Machine (₹49)',
                        'Microwave Repair': 'Microwave and more (₹49)',
                        'General Appliance Service': 'AC Repair (₹349)'
                    };
                    
                    const applianceOption = serviceToApplianceMap[serviceTitle];
                    
                    // Find and select the matching option
                    if (applianceOption) {
                        for (let i = 0; i < applianceTypeSelect.options.length; i++) {
                            if (applianceTypeSelect.options[i].text.includes(applianceOption)) {
                                applianceTypeSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                }
            }
        });
    });

    // Add warranty information to footer
    const footerServices = document.querySelector('.footer-column:nth-child(3)');
    if (footerServices) {
        const warrantyNote = document.createElement('p');
        warrantyNote.className = 'warranty-note';
        warrantyNote.innerHTML = '<strong>All services include 45-day warranty on service and spare parts</strong>';
        footerServices.appendChild(warrantyNote);
    }

    // Initialize testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length > 0 && dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                
                testimonials.forEach(testimonial => {
                    testimonial.classList.remove('active');
                });
                
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                testimonials[index].classList.add('active');
                this.classList.add('active');
            });
        });
        
        // Auto-rotate testimonials
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonials[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }, 5000);
    }

    // Initialize modal functionality
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (bookNowBtn && bookingModal && closeModal) {
        bookNowBtn.addEventListener('click', function() {
            bookingModal.classList.add('active');
        });
        
        closeModal.addEventListener('click', function() {
            bookingModal.classList.remove('active');
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
            }
        });
    }

    // Add click event to hero button for booking
    const heroBookBtn = document.querySelector('.hero-buttons .btn-primary');
    if (heroBookBtn && bookingModal) {
        heroBookBtn.addEventListener('click', function() {
            bookingModal.classList.add('active');
        });
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    const bookingSuccess = document.getElementById('bookingSuccess');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formSuccess.classList.add('active');
            contactForm.reset();
            
            setTimeout(() => {
                formSuccess.classList.remove('active');
            }, 5000);
        });
    }
    
    if (bookingForm && bookingSuccess) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            bookingSuccess.classList.add('active');
            bookingForm.reset();
            
            setTimeout(() => {
                bookingSuccess.classList.remove('active');
                bookingModal.classList.remove('active');
            }, 5000);
        });
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
        
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
            });
        });
    }
});

// Spare parts data array
const sparePartsData = [
  {
    "Item Name": "WHIRLPOOL SPIN CAP",
    "Selling Price (Customer)": 70.0
  },
  {
    "Item Name": "SAMSUNG SPIN CAP",
    "Selling Price (Customer)": 70.0
  },
  {
    "Item Name": "VIDEOCON SPIN CAP",
    "Selling Price (Customer)": 70.0
  },
  {
    "Item Name": "LG WASH PULLY",
    "Selling Price (Customer)": 120.0
  },
  {
    "Item Name": "SAMSUNG WASH PULLY",
    "Selling Price (Customer)": 120.0
  },
  {
    "Item Name": "GODREJ WASH PULLY",
    "Selling Price (Customer)": 120.0
  },
  {
    "Item Name": "WHIRLPOOL WASH PULLY",
    "Selling Price (Customer)": 120.0
  },
  {
    "Item Name": "BREAK PLATE MIX",
    "Selling Price (Customer)": 120.0
  },
  {
    "Item Name": "WHIRLPOOL KNOB",
    "Selling Price (Customer)": 40.0
  },
  {
    "Item Name": "PDS KNOB",
    "Selling Price (Customer)": 30.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY",
    "Selling Price (Customer)": 1200.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY VIDEOCON",
    "Selling Price (Customer)": 1200.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY GODREJ",
    "Selling Price (Customer)": 1200.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY SAMSUNG",
    "Selling Price (Customer)": 1200.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY WHIRLPOOL",
    "Selling Price (Customer)": 1200.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY LG",
    "Selling Price (Customer)": 1200.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY IFB",
    "Selling Price (Customer)": 1200.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY ONIDA",
    "Selling Price (Customer)": 1200.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY PANASONIC",
    "Selling Price (Customer)": 1200.0
  },
  {
    "Item Name": "GEAR BOX ASSEMBLY HAIER",
    "Selling Price (Customer)": 1200.0
  }
];
