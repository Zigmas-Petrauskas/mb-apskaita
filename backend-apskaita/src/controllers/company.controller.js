import { createCompany } from "../services/company.service.js";

export const registerCompany = async (req, res) => {
    try {
        const companyData = req.body;
        const company = await createCompany(companyData);

        res.status(201).json({ message: "Įmonė užregistruota", company });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

