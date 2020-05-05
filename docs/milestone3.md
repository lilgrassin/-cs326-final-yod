# PantryRaider

## Division of Labour

### Team Yod
- Paulaine Goldsmith ([pkg250](http://github.com/pkg250))
    - Public Page Function, Basic HTTP Handlers for Creating Mail and Users
- Lillian Grassin-Drake ([lilgrassin](http://github.com/lilgrassin))
    - Postgres Database Setup, Private Page Function
- Joanna Tang ([bpospunny](http://github.com/bpospunny))

### Data Tables

| Users       | Data Type | Description              |
|--------------|-----------|--------------------------|
| fname  | String    | First name of user  |
| lname | String   | Last name of user |
| phone | String   | Phone number of user |
| email | String   | E-mail of user |
| password | String   | Password of user |
| grad | String   | Graduation semester of user |
| admin | boolean   | If the user is an admin |

| Items       | Data Type | Description              |
|--------------|-----------|--------------------------|
| item  | String    | Name of item  |
| category | String   | Category of item |
| stock  | number    | Current stock of item  |
| donated | number   | Donated number of item |
| distributed | number    | Distibuted number of item  |

| Transactions       | Data Type | Description              |
|--------------|-----------|--------------------------|
| created  | Date    | Date and time of transaction  |
| check_in | boolean   | If transaction is a check-in or check-out |
| weight  | number    | Weight of items in transaction  |

| Mail       | Data Type | Description              |
|--------------|-----------|--------------------------|
| created  | Date    | Date and time of message creation  |
| sent | Date   | Date and time of message being sent |
| subject  | String    | Subject of message  |
| content  | String    | Content of message  |

| Shifts       | Data Type | Description              |
|--------------|-----------|--------------------------|
| shift  | Date    | Date and time of shift  |
