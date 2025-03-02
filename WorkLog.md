# Work log

## Notes

-   S1: Task suggests creating a webhook-like endpoint (e.g. POST "/items/:id/markDone"). After searching through json-server's documentation, this doesn't seem to be possible with json-server (at least not in a clean way). Server being Express, creating an endpoint is easy, but there is no official way to access the underlying lowdb and to create a custom update query. I chose to adhere to json-server's REST API and implemented the functionality with a middleware (same way as `createdAt` in the original code).

## Time spent

-   3h - VM, VLAN setup to run untrusted code
-   1h - getting familiar with project and requirements
-   15m - getting familiar with json-server
-   1h 20m - prepare API/state CRUD
-   5m - F2: Load todo items
-   5m - F6: Delete a todo item
-   5m - F5: Complete a todo item
-   5m - F1: Default values in Footer
-   20m - F7: Sort the todo items
-   10m - F8: Count the todo items
-   20m - F3: Add a todo item
-   10m - F4: Edit a todo item's label
-   15m - F9: Button component
-   30m - S1 seems problematic with json-server, skipping for now
-   5m - B1 task needs clarification, skipping for now
-   5m - B2: Footer alignment
-   5m - UI1: Header "add" button alignment
-   5m - UI2: ListItem actions alignment
-   10m - UI3: ListItem actions visibility
-   10m - SB1: Add a story/stories for the Layout component
-   10m - SB2: Add stories showing available Button variants
-   5m - SB3 "actions visibility change" being part of the component is showcased by default, skipping
-   1h - S1: Implement a custom endpoint
