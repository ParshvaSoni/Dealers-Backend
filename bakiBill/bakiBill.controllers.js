import BakiBillSchema from "./bakiBill.db.js";

export const createBakiBill = async (req, res) => {
    try {
        console.log(req.decode.id);
        req.body.accountId = req.decode.id;
        let newBill = new BakiBillSchema(req.body);
        newBill = await newBill.save();
        res.status(200).json({ success: 1, message: "Baki bill created successfully", data: newBill })
    }
    catch (err) {
        return res.status(500).json({ success: 0, message: err.message, data: null });
    }
}

export const deleteBakiBill = async (req, res) => {
    try {
        let accountId = req.decode.id;
        let billId = req.params.id;
        let deletedBill = await BakiBillSchema.findOneAndDelete({ accountId: accountId, _id: billId });
        console.log(deletedBill);
        return res.status(200).json({ success: 1, message: "Baki Bill Deleted Successfully", data: null });
    }
    catch (err) {
        return res.status(500).json({ success: 0, message: err.message, data: null });
    }
}

export const getBakiBill = async (req, res) => {
    try {
        let accountId = req.decode.id;
        let qobj = { accountId: accountId };
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        const startIndex = (page - 1) * limit;

        // check if customer name is valid
        if (req.query.customername) {
            if (req.query.customername.match(/^[A-Za-z]{5,30}$/)) {
                qobj.$text = { $search: req.query.customername.toLowerCase() }
            }
            else {
                return res.status(400).json({ success: 0, message: "Customer name: 5 to 30 characters, letters only.", data: null })
            }
        }

        // check if customer mobile is valid
        if (req.query.customermobile) {
            if (req.query.customermobile.match(/^\d{10}$/)) {
                qobj.customermobile = req.query.customermobile;
            }
            else {
                return res.status(400).json({ success: 0, message: "Customemr Mobile : 10 digits only.", data: null })
            }
        }

        // check if huid is valid
        if (req.query.huid) {
            if (req.query.huid.match(/^[A-Za-z0-9]{6}$/)) {
                qobj.huid = req.query.huid;
            }
            else {
                return res.status(400).json({ success: 0, message: "Huid : string of 6, character or digit", data: null })
            }
        }

        // check if metaltype is valid
        if (req.query.metaltype) {
            if (["gold", "silver", "platinum", "immitation"].includes(req.query.metaltype.toLowerCase())) {
                qobj.metaltype = req.query.metaltype;
            }
            else {
                return res.status(400).json({ success: 0, message: "Metal Type : one of 'gold', 'silver', 'platinum' or 'immitation'.", data: null })
            }
        }
        const accountBakiBills = await BakiBillSchema.find(qobj).limit(limit).skip(startIndex);
        return res.status(200).json({ success: 1, message: "Baki bills retrieved successfully", data: accountBakiBills })
    }
    catch (err) {
        return res.status(500).json({ success: 0, message: err.message, data: null });
    }
}