## 1. Product Overview

Development of a native e-commerce application for the Sertton brand, focused on high performance, smooth navigation, and robust integration with the Yampi platform. The goal is to provide a complete shopping experience, from product discovery to order tracking, using a modern and scalable architecture.

---

## 2. Navigation and UX Structure

The app adopts a hybrid navigation model to maximize usability:

* **Side Menu (Drawer):** Global access to institutional content (About, Policies), settings, and secondary categories.
* **Bottom Bar (Tabbar):** Persistent primary navigation (Home, Products, Cart, Orders).
* **Stack Navigation:** Linear flow for deeper journeys (Product Details, Checkout) with back-navigation history.

### Main Screens

1. **Home:** Storefront with banners, featured collections, and lead capture.
2. **Catalog:** Listing with infinite scroll, filters, and sorting.
3. **Product Details:** Image zoom, variation (SKU) selection, and shipping simulator.
4. **Cart:** Item management, local persistence, and financial summary.
5. **My Orders:** Purchase history and access to duplicate payment documents (Pix/Boleto).

---

## 3. Functional Specifications (By Module)

### Catalog Module

*Responsible for managing Products, SKUs, Categories, Brands, and Variations.*

* **Stock Listing:** Display only products with positive stock (`> 0`).
* **Global and Local Search:** Search by name accessible from multiple screens.
* **Advanced Filters:** Combined filtering by Name, Category (single selection), and Brand (multiple selection).
* **Sorting:** Alphabetical (A-Z, Z-A).
* **Product Details:** Rich display with zoom, description, and technical specifications.
* **Variation Selection:** Mandatory selection of attributes (Material, Size) to define the SKU before purchase.

**Implementation references:**
* `lib/core/catalog/`
* `lib/rest/yampi/services/yampi_catalog_service.dart`
* `lib/ui/catalog/`

### Checkout Module

*Responsible for managing the Cart, Orders, Customers, and Payments.*

* **Cart Management:**
* Add/remove items and adjust quantities (Min: 1).
* Real-time stock validation.
* Prevent duplicate SKUs (increase quantity instead of creating a new line).
* **Persistence:** Restore cart state after restarting the app.
* Automatic cleanup when starting external checkout.
* **Order History:** Listing linked to CPF/CNPJ with statuses (Paid, Pending, Canceled).
* **Payments:** PDF viewing for Boleto and copy/paste or QR Code for Pix.

**Implementation references:**
* `lib/core/checkout/`
* `lib/rest/yampi/services/yampi_checkout_service.dart`
* `lib/ui/checkout/`

### Marketing Module

*Responsible for engagement and visual communication.*

* **Banners:** Management of highlighted areas on Home.
* **Leads:** Email capture form on Home with duplicate validation.
* **Support:** Deep links to WhatsApp and email client.

**Implementation references:**
* `lib/core/marketing/`
* `lib/rest/yampi/services/yampi_marketing_service.dart`
* `lib/ui/global/widgets/screens/home/marketing-section/`
* `lib/ui/global/widgets/screens/home/leads-capturer-section/`

### Reviewing Module

*Responsible for social proof.*

* **Comments:** Display and manage reviews linked to products (according to Yampi API support).

**Implementation references:**
* `lib/core/reviewing/`

### Shipping Module

*Responsible for delivery logistics and shipping simulation.*

* **Shipping calculation:** Simulation by ZIP code.
* **Option comparison:** Display carriers by price and delivery time.
* **Checkout integration:** Apply shipping selection to the purchase flow.

### Global Module

*Responsible for main navigation, global layout, and app state.*

* **Global layout:** Drawer + Tabbar + navigation shell.
* **Base screens:** Splash, Offline, Home, and shared components.

**Implementation references:**
* `lib/ui/global/`
* `lib/router.dart`
* `lib/constants/routes.dart`

### Institutional Module

*Responsible for the app’s institutional and legal content.*

* **Institutional screens:** About, Privacy, Exchanges/Returns, and Terms.
* **Global access:** Navigation through the Drawer and dedicated routes.

**Implementation references:**
* `lib/ui/institutional/`
* `documentation/features/legal/institutional-screens/`
* `lib/constants/routes.dart`

---

## 4. Non-Functional Requirements (NFRs)

| Category | Requirement |
| --- | --- |
| **Performance** | Use of **Pagination (Infinite Scroll)** in the catalog to optimize data and memory usage. |
| **Interface** | **Responsive** layout adaptable to different screen densities and orientations. Use of the **Flutter Animate** package for micro-interactions. |
| **Stability** | Use of **Riverpod** and **Signals** to ensure safe and reactive state management. |
| **Reliability** | Network error handling (Dio) and robust form validation (**LucidValidation**). |
| **Legal** | Clear display of Terms of Use and Privacy Policies. |

---

## 5. Module Structure (Domain)

Business rules are segregated into the following domains, each containing its DTOs and Service Interfaces:

* **Catalog:** `Product`, `SKU`, `Category`, `Variation`, `Brand`, `Collection`.
* **Checkout:** `CartItem`, `Customer`, `Discount`, `Installment`, `Order`, `OrderItem`, `Payment`, `Address`.
* **Marketing:** `Lead`, `Contact`, `Banner`.
* **Reviewing:** `Comment`, `Author` (currently without a service interface implementation).
* **Shipping:** `ShippingOption`, `FreightQuote`, `DeliveryAddress` (planned).
* **Institutional:** Static institutional/legal content (UI layer).
