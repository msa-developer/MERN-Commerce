import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({ creatorId: req.user._id });
    res.status(200).json(product);
    console.log(`products are : ${product}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in Product function" });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error In getById function" });
  }
};

export const Update = async (req, res) => {
  const { img, price, name } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        creatorId: req.user._id,
        img,
        price,
        name,
      },
      { new: true },
    );

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error In Update function" });
  }
};

export const Create = async (req, res) => {
  const { img, name, price } = req.body;
  try {
    if (!img || !price || !name)
      return res.status(400).json({ msg: "Please fill all the details" });

    const product = new Product({
      creatorId: req.user._id,
      img,
      price,
      name,
    });
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error In Create function" });
  }
};

export const Del = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error In Delete function" });
  }
};
