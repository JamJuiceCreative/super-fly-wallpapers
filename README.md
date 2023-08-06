## Super Fly WallPapers

An e-commerce platform to sell wall papers & wide format graphics targeted at streamers/ gamers as opposed to your standard baby nursery/ interior decor demographic.

### Deployed Site:
[Link to Deployed Site](https://superfly-wallpapers-e6d83528d884.herokuapp.com/)
<br>

#### Login Details:

admin: <br>
email: admin@email.com 
password: 123456
<br>
<br>user1:<br>
email: user1@email.com
password: 123456

#### paypal sandbox:
email: sb-s43jlj26734149@personal.example.com
password: AE2=+CVr

### Purpose:

To offer wide format printing services to a more specific target demographic and in doing so, scaling back my business to a point where I can ship graphics instead of having to perform site measures and installs. The quoting calculator will allow the customer to perform their own measurements and the fact that I'll be shipping only means graphics will be rolled up for customer to DIY or sub-contract an external installer.

To create and deploy a full stack application/ e-commerce website using the MERN stack. Fully functioning backend API that will allow customers to register as users, browse, rate & favourite wall-paper designs. Ultimately affording them the opportunity to order, pay for and have shipped wide format graphics and wall papers. Quoting calculator highly desirable as well as ai image generation would be nice to have.

### Functionality/ Features.

Overall function of website is to operate as an online store and gallery for specialised, themed wall paper graphics.

Features now include;

- User Auth/ Register and Login
- Site Navigation
- Gallery/ Featured Designs
- Search functionality
- Rating and Commenting component
- Quoting Calculator
- Shopping Cart Checkout and Billing services
- Favouriting ability in the UI
- Admin dashboard - data aggregation utilising google charts
- CRUD operations in user, design, orders & quotes lists.

Nice to Haves (to be integrated going forward);

- Image carousel on home page
- AI Image generation tool through mid-journey or similar.
  Contact & Email Form

### Target Audience

- Gamer/streamer demographic as opposed to your traditional baby nursery/ interior decor.
- Men who want to create a personal space/ man cave
- Families with young kids who want to customise bedroom wall graphics.

### Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js

Server-side programming: React/ react-bootstrap<br>
Back-end framework: Express, NodeJS, MongoDB<br>
Database Cloud Deployment: Mongo Atlas & Cloudinary<br>
Client application: Insomnia<br>
Development IDE: Visual Studio Code<br>
Deployment Platform: Heroku<br>

### 3rd Party Libraries

#### Front End

- react-hot-toast
- react-helmet-async
- react-paypal-js
- react-bootstrap
- react-google-charts

#### Back End

- bcryptjs
- jsonwebtoken
- cloudinary
- cors
- multer
- streamifier

### Application Architecture Diagrams.

#### Simple architecture diagram (development framework)

![Application Architecture Diagram](./docs/simple%20architecture%20diagram2.png)

#### High level architecture diagram.

![High Level Architecture Diagram](./docs/More%20detailed%20architecture%20diagram.png)

### Dataflow Diagram.

- User Browse Wallpapers/ Favourite / Quoting Calculator & CheckOut.
  ![Data Flow Diagram](./docs/superfly-dataflow.drawio.png)

### User Stories

![User Story 1](./docs/userstory1.png)
![User Story 2](./docs/userstory2.png)
![User Story 3](./docs/userstory3.png)
![User Story 4](./docs/userstory4.png)

### Wire Framing.

[Link to FIGMA Wireframes](https://www.figma.com/file/tZyl4fFYDeD18c5S83xF4D/Superfly-Wallpapers?type=design&node-id=0%3A1&mode=design&t=Af6bWIVOgTxsJLr2-1)

### _Mobile:_

#### UI/UX componenets:

- Emphasis on iconography.
- Shopping Cart icon accessable from almost every page.
- No more than 2 column layout in small screen view.
- Use of hamburger menu for mobile view.

![mobile wire frame](./docs/wireframe-mobile.png)

### _Tablet:_

#### UI/UX componenets:

- Responsive Design for small, medium large screens and everything in-between.
- Navigation no longer requires hamburger menu and can be displayed in full.
- As the components are displayed in sections multiple components can now be displayed on the various pages where applicable.

![tablet wire frame](./docs/wireframe-tablet.png)

### _Desktop:_

#### UI/UX componenets:

- View can extend to utilise a 12 column layout (bootstrap).
- More thumbnails can be displayed per page.
- Continue strong emphasis on iconography and high contrast in elements such as buttons to match branding style.

![desktop wire frame](./docs/wireframe-desktop2.png)

[Link to Trello Board](https://trello.com/b/tOPvO0T0/super-fly-wallpapers)

### Design Stage of project management.

![trello screen grab1](./docs/trello-1.png)
Wireframes Completed! 6-7-23
![trello screen grab2](./docs/trello-6-7-23.png)
Dataflow & Architecture Diagrams, user personas & stories completed. 8-7-23
![trello screen grab3](./docs/trello-8-7-23.png)

### Development Stage of project management.

Initially set configured jest and designed some tests for a TDD approach. 17-7-23
![trello screen grab4](./docs/trello-17-7-23-designing-tests.png)
Early deployment to heroku to adhere to agile methodology, continuous deployment throughout development. 17-7-23
![trello screen grab5](./docs/trello-26-7-23-store-deployed-to-heroku-and-mongo-atlas.png)
Completed store component including additional elements that crept into the scope. 29-7-23
![trello screen grab6](./docs/trello-29-7-23-completed-store.png)
Project complete including date sensitive tasks that I otherwise would have shifted to the "nice to haves" going forward.
![trello screen grab6](./docs/trello-5-08-23-project-complete-with-due-dates-met2.png)

### Version Control

[Link to Github repository](https://github.com/JamJuiceCreative/super-fly-wallpapers)

#### Branches

- testing (MERGED)
- favorited-alternative (MERGED)
- favourited-designs (ABANDONED)
- quote-calculator (MERGED)
- css-styling (MERGED)
- mail-gun (ABANDONED)
- reset-main (MERGED)
- online-store (MERGED)
- vite (MERGED)

### Testing

#### Testing backend with Insomnia;

ADMIN AUTH - Testing Endpoint POST /api/users/signin
![Insomnia Screen Grab1](./docs/insomnia-post-admin-auth.png)

USER SIGN-UP- Testing Endpoint POST /api/users/signup
![Insomnia Screen Grab1](./docs/insomnia-post-user-auth.png)

DESIGNS - Testing Endpoint GET /api/designs
![Insomnia Screen Grab1](./docs/insomnia-get-all-designs.png)

ORDERS SUMMARY - Testing Endpoint GET /api/orders/summary
![Insomnia Screen Grab1](./docs/insomnia-get-all-orders.png)

USERS - Testing Endpoint GET /api/users/
![Insomnia Screen Grab1](./docs/insomnia-get-all-users.png)

EDIT PROFILE - Testing Endpoint PUT /api/users/profile **BROKEN!!**
![Insomnia Screen Grab1](./docs/insomnia-put-edit-profile.png)

EDIT PROFILE - Testing Endpoint PUT /api/users/profile **FIXED!!!**
![Insomnia Screen Grab1](./docs/insomnia-put-edit-profile-fixed.png)

#### User Testing/ Production Testing;

Login/ sign-up:
![Insomnia Screen Grab1](./docs/user-testing-login-signup.png)
Quoting Calculator:
![Insomnia Screen Grab1](./docs/user-testing-quote-calculator.png)
User Profile:
![Insomnia Screen Grab1](./docs/user-testing-user-profile.png)
Designs List:
![Insomnia Screen Grab1](./docs/user-testing-edit-design.png)
Users List:
![Insomnia Screen Grab1](./docs/user-testing-edit-userslist.png)

[Watch the Presentation for part A](https://youtu.be/5tVrtYYZCO4)

[Watch the Presentation for part B](https://youtu.be/VKPhgqq0EHk)
