// Model
const Item = require("../models/Item");
const firebase = require("firebase/auth");
const auth = firebase.getAuth();

// HTTP index get items
exports.item_index_get = (req, res) => {
    Item.find()
        .then(items => {
            res.render('item/index', {items, auth: auth.currentUser})
        })
        .catch(err => {
            console.log(err)
        })
}

// HTTP create Items get
exports.item_create_get = (req, res) => {
  Item.find().then((items) => {
    res.render("item/add", { items, auth: auth.currentUser });
  });
};

// HTTP Post Items Post
exports.item_create_post = (req, res) => {
  let item = new Item(req.body);
  item
    .save()
    .then(() => {
      res.redirect("/item/index");
    })
    .catch((err) => {
        console.log(err);
        res.send('Error please try again later')
    })
}

// HTTP Get item details by ID
exports.item_show_get = (req, res) => {
    Item.findById(req.body.id)
    .then(item => {
        res.render('/item/show', {item, auth: auth.currentUser}) 
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP Delete item

