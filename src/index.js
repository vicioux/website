import background from './background';
import sections from './sections';
import website from './website';

// TODO: Add preloader to the page... it will be cool, right?

// create the website module with its dependencies
const web = website(background(), sections());

// and finally, run it.
web.init()
