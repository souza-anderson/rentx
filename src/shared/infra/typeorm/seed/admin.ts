import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  connection.query(`
    INSERT INTO USERS(id, name, password, email, driver_license, "isAdmin", created_at)
    values ('${id}', 'admin', '${password}', 'admin@rentx.com.br', 'XXX-XXXX', true, 'now()')
  `);

  await connection.close();
}

create().then(() => console.log("User admin created"));
