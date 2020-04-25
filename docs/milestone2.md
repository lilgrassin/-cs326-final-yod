# PantryRaider

## Division of Labour

### Team Yod
- Paulaine Goldsmith ([pkg250](http://github.com/pkg250))
    - Updates to public page HTML, server setup, API design
- Lillian Grassin-Drake ([lilgrassin](http://github.com/lilgrassin))
    - Updates to private page HTML, server setup, API design, Heroku hosting
- Joanna Tang ([bpospunny](http://github.com/bpospunny))

## Project API Planning

The Pantry Raider API provides endpoints for data on users, pantry inventory, messages, and volunteer shifts & scheduling. The API functions with the REST operation POST.

### Users

#### Parameters

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| First Name     | User's first name |{"firstName":"John"} |
| Last Name     | User's last name |{"lastName":"Smith"} |
| E-Mail     | User's e-mail |{"email":"jsmith@umass.edu"} |
| Phone Number     | User's phone number |{"phone":"123-456-7890"} |
| Graduation    | User's graduation semester |{"graduation":"Spring 2020"} |
| Password    | User's password |{"password":"************"} |

#### Endpoints

| **Endpoint** | **Description** |
|----------|-------------|
| /register/user/create      | Creates a new user profile |
| /inbox/:id/user/read      | Allows users to access user profiles for messaging |
| /admin/:id/user/read      | Allows admins to access user profiles |
| /admin/:id/user/update      | Allows admins to update a user profile |
| /admin/:id/user/delete      | Allows admins to delete a user profile|
| /user/:id/user/read      | Allows a user to view their profile |
| /user/:id/user/update      | Allows a user to update their profile |
| /user/:id/user/delete      | Allows a user to delete their profile|


### Messages

#### Parameters

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| From (Name)     | Sender's name |{"fromName":"John Smith"} |
| From (E-Mail)    | Sender's e-mail |{"toEmail":"johnsmith@umass.edu"} |
| To (Name)    | Recipient's name |{"toName":"Jane Smith"} |
| To (E-Mail)     | Recipient's e-mail |{"email":"janesmith@umass.edu"} |
| Subject    | Message type or subject |{"subject":"Question"} |
| Message    | Message content |{"message":"Message content."} |

#### Endpoints

| **Endpoint** | **Description** |
|----------|-------------|
| /contact/mail/create      | Creates a message from public user |
| /inbox/:id/mail/create      | Creates a message from a user |
| /inbox/:id/mail/read      | Allows users to access messages |
| /inbox/:id/mail/update      | Allows users to edit an existing message draft |
| /inbox/:id/mail/delete      | Allows users to delete a message from their inbox |


### Inventory

#### Parameters

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| Item     | Pantry inventory item |{"item":"Spaghetti"} |
| Stock    | Number of item in inventory |{"stock":"30"} |
| Type    | Item type |{"type":"Pasta & Grains"} |

#### Endpoints

| **Endpoint** | **Description** |
|----------|-------------|
| /transaction/:id/item/create      | Create a new item from transaction |
| /inventory/item/read      | Access item information for inventory display |
| /transaction/:id/item/read      | Access item information for transaction |
| /transaction/:id/item/read      | Access item information for transaction |
| /transaction/:id/item/update     | Update an item from transaction |


### Transactions

#### Parameters

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| Date    | Date and time of transaction |{"date":"YYYY-MM-DDTHH:mm:ss:sssZ"} |
| User E-Mail   | E-Mail of user that performed transaction |{"userEmail":"jsmith@umass.edu"} |
| Type    | Transaction type |{"type":"check-in"} |
| Items    | List of items included in transaction |{"items":"[{item1}, {item2}]"} |
| Weight    | Total weight of transaction (pounds) |{"weight":"7.6"} |

#### Endpoints

| **Endpoint** | **Description** |
|----------|-------------|
| /transaction/:id/create | Create a new transaction
| /statistics/:id/transaction/read | Allows a user to access transaction statistics


### Schedule

#### Parameters

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| Week    | Date and time of transaction |{"week":"YYYY-MM-DDTHH:mm:ss:sssZ"} |
| Shifts    | Shifts created for associated week's schedule |{"shifts":"[{shift 1}, {shift2}]"} |

#### Endpoints

| **Endpoint** | **Description** |
|----------|-------------|
| /admin/:id/create      | Creates a new week schedule |
| /admin/:id/schedule      | Allows admins to access a schedule |
| /admin/:id/schedule/delete      | Allows admins to delete a schedule|
| /admin/:id/schedule/update      | Allows admins to update a schedule |
| /schedule/:id/schedule/read      | Allows a user to access the schedule |


### Shift

#### Parameters

| **Parameter** | **Description** | **Example** |
|-----------|-----------------------------------------------|---------------------------------------|
| Date    | Date and time of transaction |{"date":"YYYY-MM-DDTHH:mm:ss:sssZ"} |
| Volunteer  | User profiles of shift volunteer(s) |{"volunteer":"[{user1}, {user2}]"} |

#### Endpoints

| **Endpoint** | **Description** |
|----------|-------------|
| /schedule/:id/shift/create      | Creates a shift for a user |
| /schedule/:id/shift/read      | Allows a user to access their shifts |
| /schedule/:id/shift/update      | Allows a user to update their shifts |



