# MedSupply — Medical Equipment E-commerce Site

A multi-page storefront for a B2B medical supplies business (PPE, diagnostics, hospital equipment), written in **vanilla HTML, CSS and JavaScript** with no framework or build step.

[![Live demo](https://img.shields.io/badge/Live_demo-0369A1?style=for-the-badge&logo=githubpages&logoColor=white)](https://mmn-software.github.io/medsupply/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## Features

- **8 pages:** home, product listing, product detail, cart, about, FAQ, contact
- **Catalogue** rendered from a single data module, with search, category filters and sorting
- **Persistent cart** stored in `localStorage` (quantities, subtotals, order summary)
- **Bulk-quote** call to action aimed at clinics and hospitals
- **Scroll-reveal animations** using `IntersectionObserver`
- Responsive layout, semantic markup and SEO meta tags

## Structure

```
├── index.html  products.html  product.html  cart.html
├── about.html  faq.html  contact.html
├── css/style.css
└── js/
    ├── data.js       # product catalogue
    ├── products.js   # listing, search, filters, sorting
    ├── product.js    # product detail page
    ├── cart.js       # cart state + localStorage
    └── main.js       # navigation, animations, shared UI
```

## Run locally

No build step. Open `index.html`, or serve the folder:

```bash
npx serve .
```

## Related

The same business case rebuilt with Next.js, TypeScript and a 3D hero: **[aia-health](https://github.com/MMN-software/aia-health)**.

---

Built by **[Mohammad Mehdi Nemati](https://github.com/MMN-software)** · Available for freelance work — [get in touch](mailto:mohammadmehdi.neemati@gmail.com)
