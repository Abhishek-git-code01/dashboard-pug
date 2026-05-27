const express = require("express");

const app = express();



app.set("view engine", "pug");
app.set("views", "./views");


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
    res.render("about",{
        title: "About Page",
    company: "MentorsHelp",
    founder: "Krishna Patel",
    // title: "About",
    page:"about"
    });
})




app.listen(3000, () => {
  console.log("Server running");
});


