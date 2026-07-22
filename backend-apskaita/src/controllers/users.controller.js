import { getUsers, createUser } from '../services/users.service.js';

// Gauti vartotojus
export const getUsersController = async (req, res) => {
  try {
    /*
      Laikinas variantas.

      Ateityje:

      const companyId = req.user.company_id;

      iš JWT token.

    */

    const companyId = 1;

    const users = await getUsers(companyId);

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.error('Gauti vartotojus klaida:', error);

    res.status(500).json({
      message: 'Nepavyko gauti vartotojų',
    });
  }
};

// Sukurti vartotoją
export const createUserController = async (req, res) => {
  try {
    /*
      Laikinas variantas.

      Vėliau:

      const companyId = req.user.company_id;

    */

    const companyId = 1;

    const user = await createUser(req.body, companyId);

    res.status(201).json({
      data: user,
    });
  } catch (error) {
    console.error('Sukurti vartotoją klaida:', error);

    res.status(500).json({
      message: error.message || 'Nepavyko sukurti vartotojo',
    });
  }
};
