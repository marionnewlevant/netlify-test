## Overview

This is a gulp file, which will be deployed to Netlify. The Craft site will poke netlify whenever content is updated in Craft. Netlify will run the `gulp build` process, which will scrape the html from the Craft version of the site, and build a static site in `_site`, which netlify will then deploy.