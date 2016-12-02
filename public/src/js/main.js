import background from './background';
import preLoader from './pre-loader';
import sections from './sections';
import website from './website';

website(background(), preLoader(), sections()).init();