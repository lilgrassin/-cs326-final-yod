# Team Yod
## Pantry Raider
#### Spring 2020
### Team Yod
- Paulaine Goldsmith ([pkg250](http://github.com/pkg250))
    - Wireframes (public and private pages)
    - Public pages front-End implementation
    - Public pages back-end implementation
    - Server setup
    - Database implementation
    - Project proposal
    - Milestone 2, 3, and final reports
    - Informational Video
- Lillian Grassin-Drake ([lilgrassin](http://github.com/lilgrassin))
    - Wireframes (private pages)
    - Private pages front-end implementation
    - Private Pages back-end implementation
    - Server setup
    - Database setup
    - Database implementation
    - Project proposal
    - Milestone 1 and final reports
    - Informaional video

## Overview
PantryRaider is a comprehensive tool designed for the UMass Student Food Pantry in Amherst, MA. Prior to this project, the pantry was struggling to effectively communicate and manage daily operations efficiently. The project provides the pantry with a much needed way to manage communications internally and externally, and improve the pantry's daily functioning. Though some aspects of the project have an existing solution, there is no platform that offers all of the feautures needed by the Umass Student Food Pantry in one system. This project offers a simple  and easy to use platform tailored specifically for the UMass Student Food Pantry's goals and needs that was not available beforehand.


The application provides the public with crucial information about the food pantry, and gives admins and volunteers a way to manage pantry operations.  Visitors to the site will be able to view and search through the pantry inventory, find information about how they can help, and register to become a volunteer. Once registered, volunteers will have access to updating the pantry inventory, shift scheduling, tracking various statistics, and internal messages. Pantry admins will also be able to manage registered volunteers and modifying schedules.


## User Interface

| Page |  View | Description |
| ------------- | -------------------- | ------------- |
| Home | ![](final/home.png) | The landing page of the site that provides information about the pantry and how to donate or volunteer. |
| Inventory  | ![](final/inventory.png)  | Allows site visitrs to view the current pantry inventory and serach for a specific item or category of item. |
| Contact  | ![](final/contact.png)  | Allows site visitors to contact the pantry staff with a question, feedback, or item request. |
| Register  | ![](final/registration.png)  | Allows a site visitor to register as a new volunteer. |
| Training  | ![](final/training.png)  | Provides information about volunteering during the registration process. |
| Training Quiz  | ![](final/training.png)  | A quiz on pantry training information for new volunteers during the registration process. |
| Log In  | ![](final/login.png)  | Allows registered users to log in to the volunteer system. |
| Dashboard  | ![](final/dashboard.png)  | Displays a volunteer's upcoming shifts and recent messages. |
| Scheduling  | ![](final/schedule.png)  | Allow volunteers to view the weekly schedule, sign up for shifts, or edit existing shifts. |
| Inbox  | ![](final/inbox.png)  | Displays a volunteer's recent messages and alllows them to compose a new message or delete an old message. |
| Inventory Management  | ![](final/manage-inventory.png)  | Allows volunteers to log incoming or outgoing food by searching for items or creating a new item if no match is found. |
| Statistics  | ![](final/statistics.png)  | Display tracked statistics about pantry stock and traffic to volunteers. |
| Profile Settings  | ![](final/settings.png)  | Allows a volunteer to update their profile information. |
| Administration  | ![](final/admin.png)  | Admins can view a list of registered volunteers, updates user permissions, and delete inactive volunteers. |

## APIs

### Users

**Overview:** The Users API allows for the creation of users, updating a user's profile, and displaying a list of users.

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| firstName     | User's first name |`{"firstName":"John"}` |
| lastName     | User's last name |`{"lastName":"Smith"}` |
| email     | User's e-mail |`{"email":"jsmith@umass.edu"}` |
| phone     | User's phone number |`{"phone":1234567890}` |
| graduation    | User's graduation semester |`{"graduation":"Spring 2020"}` |
| password    | User's password |`{"password":"************"}` |

### Messages

**Overview:** The Messages API allows for the creation of new mail, editing of drafted mail, deleting mail from a user's inbox, and displaying a list of a user's mail.

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| sender_id     | Sender's user ID (can be `null` for anonymous community feedback) |`{"sender_id": 8238}` |
| recipient_ids    | Array of recipient IDs |`{"recipient_ids": [3782, 7389]}` |
| subject    | Message type or subject |`{"subject": "Question"}` |
| content    | Message content |`{"content": "Message content goes here."}` |
| draft    | Indicates whether the message is a draft  |`{"draft": true}` |

### Inventory

**Overview:** The Inventory API allows for displaying a list of items in the inventory.

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| name     | Pantry inventory item |`{"item":"Spaghetti"}` |
| stock    | Number of item in inventory |`{"stock":30}` |
| category    | Item type |`{"category":"Pasta & Grains"}` |

### Transactions

**Overview:** The Transactions API allows for the creation of new items and updating the stock of items.

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| created    | Date and time of transaction |`{"created":"YYYY-MM-DDTHH:mm:ss:sssZ"}` |
| user_id   | E-Mail of user that performed transaction |`{"user_id":4732}` |
| checkin    | Whether the transaction is checking in (vs out) items |`{"checkin":true}` |
| items    | List of items included in transaction (see Item type) |`{"items":"[{item1}, {item2}]"}` |
| weight    | Total weight of transaction (pounds) |`{"weight":7.6}` |


### Shifts

**Overview:** The Shifts API allows for the creation of new volunteer shifts, updating existing shifts, deleting existing shifts, and displaying a list of a user's shifts.

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| shift    | Date and time that the shift begins at |`{"shift":"YYYY-MM-DDTHH:mm:ss:sssZ"}` |
| user1_id  | The user ID of the first shift volunteer (can be `null`) |`{"user1_id":8942}` |
| user2_id  | The user ID of the second shift volunteer (can be `null`) |`{"user1_id":7833}` |

## Database

![](final/database_diagram.png)

## URL Routes & Mapping

| **Endpoint** | **Description** |
|----------|-------------|
| `/register/user/create`      | Creates a new user profile |
| `/inbox/:id/user/read`      | (Accesible to users only) Allows users to access user profiles for messaging |
| `/admin/:id/user/read`      | (Accesible to administrators only) Allows admins to access user profiles |
| `/admin/:id/user/update`      | (Accesible to administrators only) Allows admins to update a user profile |
| `/admin/:id/user/delete`      | (Accesible to administrators only) Allows admins to delete a user profile|
| `/user/:id/user/read`      | (Accesible to users only) Allows a user to view their profile |
| `/user/:id/user/update`      | (Accesible to users only) Allows a user to update their profile |
| `/user/:id/user/delete`      | (Accesible to users only) Allows a user to delete their profile|
| `/contact/mail/create`      | Creates a message from public user |
| `/inbox/:id/mail/create`      | (Accesible to users only) Creates a message from a user |
| `/inbox/:id/mail/read`      | (Accesible to users only) Allows users to access messages |
| `/inbox/:id/mail/update`      | (Accesible to users only) Allows users to edit an existing message draft |
| `/inbox/:id/mail/delete`      | (Accesible to users only) Allows users to delete a message from their inbox |
| `/transaction/:id/item/create`      | (Accesible to users only) Create a new item from transaction |
| `/inventory/item/read`      | Access item information for inventory display |
| `/transaction/:id/item/read`      | (Accesible to users only) Access item information for transaction |
| `/transaction/:id/item/update`     | (Accesible to users only) Update an item from transaction |
| `/transaction/:id/create` | (Accesible to users only) Create a new transaction |
| `/statistics/:id/transaction/read` | (Accesible to users only) Allows a user to access transaction statistics |
| `/admin/:id/create`      | (Accesible to administrators only) Creates a new week schedule |
| `/admin/:id/schedule`      | (Accesible to administrators only) Allows admins to access a schedule |
| `/admin/:id/schedule/delete`      | (Accesible to administrators only) Allows admins to delete a schedule|
| `/admin/:id/schedule/update`      | (Accesible to administrators only) Allows admins to update a schedule |
| `/schedule/:id/schedule/read`      | (Accesible to users only) Allows a user to access the schedule |
| `/schedule/:id/shift/create`      | (Accesible to users only) Creates a shift for a user |
| `/schedule/:id/shift/read`      | (Accesible to users only) Allows a user to access their shifts |
| `/schedule/:id/shift/update`      | (Accesible to users only) Allows a user to update their shifts |

## Conclusion

Our team learned a lot from implementing Pantry Raider over the past few weeks. One of the biggest takeaways we got from this project was learning to develop without the aid of frameworks and tools. Having to write these aspects ourselves was very interesting to do (though a bit frustrating as well).

We ran into a few difficulties when working on this project that ultimately led to not completing the full implementation. Coming into the project, we were very ambitious in our vision for what we hoped to accomplish. There were many complex features that we wanted to implement, and several different types of data we would need to handle to do so. However, we found it difficult to implement all these complexities without the tools that would have normally been available to us. We struggled to handle the many pages, functions, and data types within the restrictions and time constraints of the assignment.

The other major difficulty we encountered with this project was being a group of two instead of three. It was difficult to meet all the deadlines with only two-thirds of a full team. This combined with the requirement to implement many things by hand instead of using available tools lead to a huge amount of work placed on us to get the site functioning. Because of these factors, we were not able to fully complete all of the functionality of our site.

Before starting this project, it would have been helpful to know what limitations were going to be placed on us so that we could properly scope the workload of the project. It was difficult to meet the requirements of the project while also adhering to the limitations. Knowing these limitations, we could have set more resalistic goals for the implementation of feautures for the site.