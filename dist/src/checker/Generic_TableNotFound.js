"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../lexer/lexer");
const checkerResult_1 = require("./checkerResult");
const tokens_1 = require("../lexer/tokens");
class TableNotFound {
    constructor(tables) {
        this.tables = this.cleanTables(tables);
    }
    check(query) {
        for (const line of query.lines) {
            for (const token of line.tokens) {
                if (token[0] === tokens_1.Types.TableReference) {
                    const reference = lexer_1.extractTableReference(token[1]);
                    if (!this.tables.includes(reference.table) &&
                        reference.table !== "*") {
                        return new checkerResult_1.CheckerResult(line.num, `Table '${reference.table}' does not exist in database '${reference.database}'.`);
                    }
                }
            }
        }
        return new checkerResult_1.CheckerResult(0, "");
    }
    cleanTables(tables) {
        const cleanTables = [];
        for (const obj of tables) {
            const cleanTable = Object.values(obj)[0];
            if (cleanTable.length > 0) {
                cleanTables.push(cleanTable);
            }
        }
        return cleanTables;
    }
}
exports.TableNotFound = TableNotFound;
//# sourceMappingURL=Generic_TableNotFound.js.map