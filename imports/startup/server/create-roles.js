import { COMPANY, SUPER_ADMIN, CLIENT } from "../../api/roles";

/// everytime the server started he will create this roles
/// if the roles exists or not it doesn't matter he will handle that

Object.values({ CLIENT, SUPER_ADMIN, COMPANY }).forEach((e) => {
  Roles.createRole(e, { unlessExists: true });
});
