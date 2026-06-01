const express = require("express");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views/pages/");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index",{
    name:"mentorshelp",
    website:"https//:mentorshelp.com",
    user:{name:"abhishek",roll:"1"},
    title: "Home",
    page:"home"
  });
});

app.get("/about", (req,res)=>{
  // console.log("cards =", cards);
    res.render("about",{
        title: "About Page",
    company: "MentorsHelp",
    founder: "Krishna Patel",
    page:"about"
    });
})



app.get("/services", (req,res)=>{
    res.render("services",{
        title: "Services Page",
    page:"services"
    });
})


app.get('/contact', (req, res) => {
  const cards = [
  {
    title: 'Digital Transformation',
    description: 'Accelerate business growth with modern digital strategies, cloud adoption, and customer-centric solutions.'
  },
  {
    title: 'Talent Solutions',
    description: 'Connect with highly skilled technology professionals to strengthen your teams and deliver projects faster.'
  },
  {
    title: 'Cloud Services',
    description: 'Design, migrate, and optimize cloud infrastructure for improved scalability, security, and performance.'
  },
  {
    title: 'Data & Analytics',
    description: 'Transform raw data into actionable insights through advanced analytics, reporting, and business intelligence.'
  },
  {
    title: 'AI & Automation',
    description: 'Leverage artificial intelligence and automation to streamline operations and enhance customer experiences.'
  },
  {
    title: 'Product Engineering',
    description: 'Build innovative digital products with agile development, modern architectures, and user-focused design.'
  }
];


  res.render('contact', {
      title: "Contact Page",
    page:"contact",
    cards
  });
});






app.listen(3000, () => {
  console.log("Server running");
});


