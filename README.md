# Project's name: Katalog
​
​
## Description
​
Katalog is for the everyday artist that wants to organize their inspirations, whether this is a photo, a quote, or a link to another website. Each inspiration will be a post and the user can create, update, or delete a post. In a sense, the application is a content management system for the everyday kind of artist.
​
## USER STORIES (MVP)
​
**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault. The user is offered a link to return to the main page. 
​
**500** - As a user I want to see a nice error message when our development messes up so that I know that is not my fault. A redirection link is offered to return to the main page. 
​
**Landing page** - As a user, without session, I would like to see a public landing page with a carousel of generic "posts" created by other users to encourage them to sign up. The sign up and login will be available on this page as well. 
​
**Sign up** - As a user I can create an account with authentication included to help me create a strong password. 
​
**Login** - As a user I can log in from any landing page. 
​
**Logout** - As a user that is logged in, I can log out from any page I am on. 
​

## CRUD OF 3 Models (MVP)
**User-Create** - Sign Up  
​
**User-Update** - As a user I can see my profile settings and edit my name. 
​
**User-Delete** - As a user I can delete my account. 
​
**Post - Create** - As a user I can create a post with the following attributes: Name, theme, photo,  date of creation, date of artwork
​
**Post-Update** - As a user I can update a post. The following can be updated: name, theme.
​
**Post-Delete** - As a user I want to be able to see my profile and edit my name. 
​
**Note - Create** - As a user I can create a note and relate multiple posts to it. 
​
**Note-Update** - As a user I can update a note and remove or add new posts associated to it.  
​
**Note-Delete** - As a user I want to be able to see my profile and edit my name. 
​
## BACKLOG
**404** - To personalize the 404 page, the user is offered similar posts as recommended
pages rather than a general redirection to home page. The posts will be a GET request for posts of the same theme. 
​
**Log Out** If the page is a configurations page, I will be prompted to save changes before logging out. 
​
**Geo Location** User can insert location of the post 
​
**Geo Location Route** User can see all existing posts in a map 
​
**Light Mode / Dark Mode** User can switch between light mode and dark mode
​
**See the profile of another user** User can search for other users and see their public profile
​
**Make profile private or public** User can make their profile private or public 
​
**Bulk delete** User can bulk delete posts
​
**Notes View / Posts View** User can toggle between notes view or posts view
## ROUTES
​
| Name            | Method | Endpoint                      | Description                                      | Body                                  |        |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home    (no session)       | GET    | /home           | See login                               |                                       |                 |
| Home           | GET    | /home                            | See all posts                              |  { posts }                                     |                 |
| Sign up    | POST   | /signup                        | User creates an account and is redirected to their homepage                         | { email, name, password }                                   |              |
| Log in          | POST   | /login                        | User can log in                                | { email, password }                      |            |
| Logout   | GET    | /logout                            | Logout a user                       |                                       |  |
| **User CRUD** 
| Update Profile           | POST    | /edit                            | See name and edit                               | { name }                   |                 |
| Delete Profile   | POST   | /edit                        | See name and delete account button                          | { name }                                   |              |            |                                       |  |
|**Post CRUD**           |    |                            |                                |                                       |                 |
| Create Post    | GET   | /create_post                        | User creates a post and is redirected to homepage                          | { name, theme, photo, date }                                   |              |
| Update Post         | POST   | /[PostId]/edit                       | User can edit the name and theme of a post                                  | { name, theme, photo, date }                      |            |
| Delete Post   | POST    | /[PostId]/edit                           | User can delete a post                       |                                       |  |
|**Note CRUD**           |     |                            | |                                       |                 |
| Create Note    | GET   | /create_note                        | User creates a post and is redirected to homepage                          | { content,articles, date }                                   |              |
| Update Note         | POST   |/[NoteId]/edit                       | User can edit the content of a note and its related posts                    |    { content, articles, date }        |
| Delete Note   | POST    | /[NoteId]/edit                             | User can delete a note                      |                               { content, articles, date }        |  |
​
​
​
## MODELS
​
Post model
​
```js
{
    Name: String,
    Theme: String,
    Photo: JPEG, PNG, 
    Date: Date
}
```
​
User model
​
```js
{
    name: String,
    email: String,
    Password: String,
    Posts: [ type: Schema.Types.ObjectId ]
}
​
Note model
​
```js
{
    date: date,
   contet: string,
   posts: [type: Schema.Types.ObjectId]
}
```
​
## LINKS
​
### Github project
​
- [Frontend project]()
- [Backend project]()
​
### Deploy links
​
- [Frontend deploy]()
​
### Project kanban
- [Github projects]()
​
### Wireframes 
​

​
### Slides
​
- [Slides]()
