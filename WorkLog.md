# Work log

## Notes

-   S1: Task suggests creating a webhook-like endpoint (e.g. POST "/items/:id/markDone"). After searching through json-server's documentation, this doesn't seem to be possible with json-server (at least not in a clean way). Server being Express, creating an endpoint is easy, but there is no official way to access the underlying lowdb and to create a custom update query. I chose to adhere to json-server's REST API and implemented the functionality with a middleware (same way as `createdAt` in the original code).
-   B1: Task would need clarification. There doesn't seem to be an issue with List's content alignment. Task skipped.

## Beyond scope of demo app

-   missing gaps, paddings
-   improve Button's css to support text variant (now icon only)
-   Container should have min-height, not height (causes visual bug when overflowing viewport)
-   Container use svh instead of vh
-   add loading indicator and potentially disable input/button while fetching
-   fetch error handling/displaying
-   Separation of interfaces - Todo vs TodoDto. E.g. API uses createdAt as number (timestamp) which should be then converted to an inner interface where createdAt is a Date.
-   convert BE to TypeScript and add common types to statically ensure FE<->BE interfaces compatibility
-   BE hardcoded only for items => generalize
-   missing validations, authz/authn
-   design system
-   handle long texts (e.g. Checkbox gets malformed when Todo has a long label)
-   endedAt lingers even after Todo set to isDone:false => up for a debate if wanted or if a sign of data integrity violation
-   fix broken stories in Storybook

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
-   5m - refactor label edit to use PATCH instead of PUT
-   5m - try running Prettier and Eslint (nothing updated)
-   20m - write notes to WorkLog.md
-   1h - approximate cummulative overhead
