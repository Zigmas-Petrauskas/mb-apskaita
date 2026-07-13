/*
  Sistemos būsenos tikrinimas.

  Ateityje čia bus MariaDB:

  SELECT COUNT(*) FROM companies

*/
export const checkSystemStatus = async () => {
  /*
      Kol kas testavimui.

      false reiškia:

      Sistema jau turi sukurtą MB.

      true reikštų:

      leidžiama pirmoji registracija.

    */
  const companyExists = true;

  return { registrationAllowed: !companyExists };
};
