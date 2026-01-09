import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "inventory_user",
    password: "inventory_password",
    database: "inventory",
});

async function test() {
    const [rows] = await pool.query("SELECT 1");
    console.log("DB OK:", rows);
    process.exit(0);
}

test().catch(console.error);