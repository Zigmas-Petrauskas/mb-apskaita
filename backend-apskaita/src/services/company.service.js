export const createCompany = async (company, owner) => {
  /*
        Čia ateityje bus:

        1. Sukurti company įrašą:

        INSERT INTO companies


        2. Sukurti owner vartotoją:

        INSERT INTO users


        3. Sugeneruoti password hash:

        bcrypt


        4. Sukurti 2FA nustatymus.


        Kol kas tik grąžiname
        testinius duomenis.

    */

  return {
    company: { id: 1, ...company },
    owner: {
      id: 1,
      role: 'OWNER',
      firstName: owner.firstName,
      lastName: owner.lastName,
      username: owner.username,
      email: owner.email,
      phone: owner.phone,
    },

    twoFactorRequired: true,
  };
};
