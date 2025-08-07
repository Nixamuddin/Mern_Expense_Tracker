import Category from "../Model/Categories.js";
export const Categories = {
    getAll: async (req, res) => {
        try { 
            const category = await Category.find();
            res.status(200).send({ success: true, message: "All Categories", category });        }
        catch (error) {
            res.status(500).send({success:false, message:"Internal Server error", error})
            console.log("error in Get All categories", error)
        }
    },
    Create: async (req, res) => {
        try { 
            const {name} = req.body;
            const id = req.userId;
            const category = await Category.create({ name, userId: id });
            res.status(201).send({ success: true, message: "Create a category", category });        }
        catch (error) {
            res.status(500).send({success:false, message:"Internal Server error", error})
            console.log("error in Get All categories", error)
        }
    },
    updates: async (req, res) => {
        try { 
            const { categoryId } = req.params;
            const id = req.userId;
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).send({success:false, message:"Category Not found by Id"})
            }
            if (category.userId.toString() === id.toString()) {
                const updatedCategory = await Category.findByIdAndUpdate(categoryId,req.body, { new: true });
                res.status(200).send({success:true, message:"Category updated successfully",updatedCategory})
            }
            else {
                return res.status(401).send({success:false, message:"Not Authorized"})
            }
       }
        catch (error) {
            res.status(500).send({success:false, message:"Internal Server error", error})
            console.log("error in Get All categories", error)
        }
    },
    deletes: async (req, res) => {
        try { 
            const {categoryId} = req.params;
            const id = req.userId;
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).send({success:true, message:"Not found Category"})
            }
            if (category.userId.toString() === id.toString()) {
                const deleteCategory = await Category.findByIdAndDelete(categoryId);
                res.status(200).send({success:true, message:"Category deleted successfully"})
            }
            else {
                return res.status(200).send({success:false, message:"Not Authorized"})
            }
            res.status(200).send({ success: true, message: "Create a category", category });        }
        catch (error) {
            res.status(500).send({success:false, message:"Internal Server error", error})
            console.log("error in Get All categories", error)
        }
    },

}