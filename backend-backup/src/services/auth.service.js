export const login = async (username, password) => {
  /*
       Ateityje:

       1. Ieškosime vartotojo:

       SELECT *
       FROM users
       WHERE email = ?

       2. Tikrinsime slaptažodį:

       bcrypt.compare()

       3. Generuosime:

       JWT token

       4. Tikrinsime:

       ar reikalingas 2FA
   */

  /*
        Kol kas testinis vartotojas.
    */
  if (username !== 'admin@test.lt' || password !== 12345678) {
    throw new Error('Neteisingi prisijungimo duomenys');
  }

  return { id: 1, username, role: 'OWNER', twoFactorRequired: true };
};
