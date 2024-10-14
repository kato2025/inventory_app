Inventory Management Ap

This is a simple Inventory Management application built using Express.js and PostgreSQL. The app allows users to manage categories and items, including CRUD operations for both categories and items. It also includes features like admin password protection for destructive actions and proper user prompts before deleting entities.

Features

- CRUD Operations: Create, read, update, and delete categories and items.
- Relational Database: PostgreSQL is used to store categories and items, ensuring data is persistent.
- Responsive UI: A user-friendly interface built with EJS templates and CSS for easy navigation and interaction.
- Admin Protection: Admin password protection for critical actions like deleting or editing categories and items.
- Confirmation Prompts: Displays confirmation dialogs before deleting any category or item.
- Category-Item Relationship: Categories can be associated with items, and categories cannot be deleted if items are associated with them.
- Error Handling: Proper error handling, including user-friendly error messages and server-side logging.

Technologies Used

- Node.js: JavaScript runtime for building the backend of the application.
- Express.js: Web framework for Node.js, used to create APIs and handle routing.
- PostgreSQL: SQL-based relational database for managing categories and items.
- pg: PostgreSQL client for Node.js used to connect to the database and execute queries.
- EJS (Embedded JavaScript): Templating engine for generating HTML dynamically.
- CSS: For styling the front-end, ensuring a visually appealing interface.
- Method-Override: Middleware for simulating PUT and DELETE HTTP methods in forms.
- dotenv: For managing environment variables securely.
- Git: Version control for tracking changes and collaborating on the project.

Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js.
- You have installed PostgreSQL.
- You have a basic understanding of Node.js, Express, and PostgreSQL.

Getting Started

1. Clone the repository
   git clone https://github.com/yourusername/inventory-management-app.git
   cd inventory-management-app

2. Install dependencies
   npm install

3. Set up the database

   - Create a PostgreSQL database:
     createdb inventorydb
   - Set up the database schema:
     CREATE TABLE categories (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT
     );

     CREATE TABLE items (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     quantity INTEGER NOT NULL,
     price DECIMAL(10, 2) NOT NULL,
     description TEXT,
     category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
     );

Insert sample data for testing (optional):

INSERT INTO categories (name, description)
VALUES
('Groceries', 'Daily essentials and groceries.'),
('Electronics', 'Electronic gadgets and devices.'),
('Clothing', 'Apparel and fashion items.'),
('Furniture', 'Chairs, tables, and other furniture items'),
('Toys', 'Toys for kids of all ages.');

INSERT INTO items (name, quantity, price, description, categoryId)
VALUES
('Apple', 100, 0.50, 'Fresh red apples.', 1),
('Laptop', 10, 999.99, 'A powerful laptop for work.', 2),
('T-shirt', 50, 15.99, 'Cotton t-shirts in various sizes.', 3),
('Toy Car', 200, 5.99, 'A toy car for kids.', 5),
('Orange Juice', 75, 2.99, 'Freshly squeezed orange juice.', 1),
('Smartphone', 15, 699.99, 'Latest model smartphone.', 2),
('Jeans', 30, 49.99, 'Denim jeans.', 3),
('Action Figure', 100, 19.99, 'Action figure from a popular movie.', 5),
('Chair', 20, 49.99, 'Comfortable office chair.', 4),
('Rice', 100, 0.99, '1 kg of rice.', 1),
('Table', 30, 49.99, 'Comfortable office table.', 4);

4. Create an .env file

In the root of the project, create a .env file with the following content:

DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventorydb
ADMIN_PASSWORD=your_admin_password

5. Run the application

   npm start
   The app should now be running on http://localhost:3000.

Routes

/ - Home page displaying categories and items.
/categories - View all categories.
/categories/new - Create a new category.
/categories/:id/edit - Edit a category.
/categories/:id/delete - Delete a category (with confirmation if items are associated).
/items - View all items.
/items/new - Create a new item.
/items/:id/edit - Edit an item.
/items/:id/delete - Delete an item (with confirmation).

Deployment

You can deploy this application to platforms like Render or Heroku for hosting.

Example for deploying to Render:
Push your code to GitHub.
Go to Render, select "New Web Service," and connect your GitHub repository.
Set up environment variables in Render based on your .env file.
Deploy your app.
