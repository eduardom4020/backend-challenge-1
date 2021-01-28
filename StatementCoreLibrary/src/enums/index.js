import { enums } from "../../dist";

export const find = (enumerator, id) => Object.values(enumerator).find(e => e.id === id);