import 'regenerator-runtime'; /* for async await transpile */
import '@styles/app.scss';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import loadNav from '@scripts/components/nav';
import loadExplore from '@scripts/components/explore';

document.addEventListener('DOMContentLoaded', function() {    
    // load fontawesome
    library.add(fas, far, fab)
    dom.i2svg();

    // load components
    loadNav();
    loadExplore();
});