const navbar = document.querySelector('nav');
const navMenu = document.querySelector('nav ul');

/**
 * navigation menu from each screen
 * 
 * @param screen type of size screen
 *   
 */
const menuScreen = (screen) => {
    if (screen === 'medium') {
        // for medium and small devices, screen up to 768px (mobile and tablet)    
        navMenu.classList.remove('lg-screen');
        navMenu.classList.add('md-screen');
        
    } else if (screen === 'large') {
        // for large devices, 768px screen and up (desktop)
        navMenu.classList.remove('md-screen');
        navMenu.classList.add('lg-screen');
        navbar.classList.remove('menu-md-active');
        navMenu.classList.remove('menu-list-active');
    }
}

/**
 * button menu for medium and small screen device (mobile and tablet)
 */
const menuBtn = () => {
    const button = document.querySelector('#menu-btn');

    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const listMenu = navMenu.classList.contains('menu-list-active');

        if (listMenu) {
            setTimeout(function() {
                navMenu.classList.remove('menu-list-active');
            }, 100);
        } else {
            navMenu.classList.add('menu-list-active');
        }
        
        navbar.classList.toggle('menu-md-active');
    });
}

/**
 * setting width size of browser and client screen
 */
const screenWidth = () => {
    const browserWidth = window.innerWidth;        
        
    if (browserWidth <= 768) {
        menuScreen('medium')
    } else if (browserWidth >= 769) {        
        menuScreen('large')        
    }

    window.addEventListener('resize', function() {
        const clientWidth = document.body.clientWidth;
        
        if (clientWidth <= 768) {
            menuScreen('medium');
        } else if (clientWidth >= 769) {
            menuScreen('large');
        }
    })    
}

const loadNav = () => {
    screenWidth();
    menuBtn();
}

export default loadNav();