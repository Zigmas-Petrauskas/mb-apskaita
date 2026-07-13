import { createCompany } from "../services/company.service.js";

export const registerCompany = async (req, res) => {
    try {


        /*
            Čia gauname duomenis iš frontend.

            Turėtų būti:

            {
                company: {},
                owner: {}
            }

        */

        console.log("Gauti duomenys:");
        console.log(req.body);

        const { company, owner } = req.body;
        const result = await createCompany(company, owner);

        res.status(201).json({ message: "Įmonė užregistruota", data: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

