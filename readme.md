# NodeJS Challenge 01
The first challenge of Rocketseat's Ignite Node JS bootcamp. Develop the backend of a application to manage to-dos.


### What have I learned?
I'm creating a series of blog posts showcasing my routine and achievements on the road to become a Fullstack Developer. If you're somewhat interested in checking it out, I would love to welcome you into [my blog](https://alansiqueira.com).


# Goals

- [ ]  Should be able to create a new *todo* inside a specific user;
- [ ]  Should be able to list all the *todos* of a specific user;
- [ ]  Should be able to edit a *todo* **Title** and/or **Headline** validating username and todo ID;
- [ ]  Should be able to delete a *todo* of a specific user;

### Bonus goals (?) 😁

- [ ]  Should be able to list every user;
- [ ]  Should be able to delete a user;
 
### Testing

```bash
POST /users
```
This route should receive name and username inside the request body. It should register the new user in an array in the following format:
```json
    {
        "id": "uuid",
        "name": "Alan Siqueira",
        "username": "AlanSiq",
        "todos": []
    }
```
---

```bash
GET /todos
```
This route should receive, through the request headers, an username and return a list with this user's todo list.

---

```bash
POST /todos
```
Should receive a title, headline inside the request body and username inside the request headers. Creating a new *todo* should register it inside the user's todo array. Every *todo* should be in the following format:
```json
{
    "id": 'uuid',
    "title": 'Task name',
    "done": false,
    "deadline": "2021-02-27T00:00:00.000Z",
    "created_at": "2021-02-27T00:00:00.000Z"
}
```
---

```bash
PUT /todos/:id
```

This route should receive, through the header of the request, the username property. It should update **ONLY** the title and deadline of a specific *todo* with the same id mentioned in the query params.

---
```bash
PATCH /todos/:id/done
```
This route is responsible to update a *todo's* done state from **false** to **true**.

---

```bash
DELETE /todos/:id
```
This route should delete a todo that matches ID (matched through query params) and username (through query headers).

