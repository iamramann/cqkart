# CQkart ecommerce 🛒

My ecommerce store project using Nodejs, MongoDB, express and ejs.

check deployment 🚀 here [CQKart-ecommerce](https://cqkart-ecomm.herokuapp.com/)

# PROJECT SECTIONS

This project contains two sections one is for **`ADMIN`** and the other one is for **`USER`**.

## [ADMIN SECTION 🔗](https://cqkart-ecomm.herokuapp.com/admin)

#### FUNCTIONALITIES

- `Managing existing users` by changing their status from `ACTIVE` to `DELETED`.

- `Keep track of Products` in the inventory like by checking their availability.

- Can `update product details` like name,quantity etc.

- Can `permanently remove` products from the inventory.

- `Add a new product.`

- `Can modify its personal details` using profile section.

#### **VIEWS**

- _`Login Page`_ - can be accessed via `/admin` route displays admin login form which admin can use to [login.](https://cqkart-ecomm.herokuapp.com/admin)

- _`Dashbard`_ - if user manages to login successfully then `/dashboard` can be used to view the [admin dashboard](https://cqkart-ecomm.herokuapp.com/dashboard).

- _`Profile Page`_ - can be accessed via `/profile` contains [all the details](https://cqkart-ecomm.herokuapp.com/profile) of the admin and as we said earlier admin can update its `details` including its `avatar`.

## [USER SECTION 🔗](https://cqkart-ecomm.herokuapp.com/)

#### FUNCTIONALITIES

- user can `login` and `signup` by clikcing the given links on the sidebar.
- user section's main page contains `list of all products` where user can description of each product by clicking `view description button.`
- when user is `logged in` a session will be created and now each product has two buttons `view description` and `add to cart` buttons.
- when user is `logged in` the user can view its cart by clicking cart button.
- user can also `view and change` its profile details using profile link available on the sidebar.
- user can also `change its password` by using `Password link` present on the sidebar.
- `Adding a new address` using profile section.
- `checkout button` in the cart page user can checkout and make payment.
- `logout` button to terminate the session.

#### **VIEWS**

- _`Main Page`_ - can be accessed via `/` or `/user` route displays the main page.

- _`Description Page`_ - if user manages to login successfully then `/viewDescription` can be used to `view the description` of each product.

- _`Profile Page`_ - can be accessed via `/profile` contains of the user and user can update its `details` and `add a new address`.

- `cart` contains all the products added by the user.
