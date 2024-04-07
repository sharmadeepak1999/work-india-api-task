const mysql = require('mysql2/promise');
const tables = [
    {
        name: 'players',
        columns: [
            'id INT AUTO_INCREMENT PRIMARY KEY',
            'name VARCHAR(255) NOT NULL',
            'matches_played INT NOT NULL',
            'runs INT NOT NULL',
            'average DECIMAL(5, 2) NOT NULL',
            'strike_rate DECIMAL(5, 2) NOT NULL'
        ]
    },
    {
        name: 'teams',
        columns: [
            'id INT AUTO_INCREMENT PRIMARY KEY',
            'team_name VARCHAR(255) NOT NULL'
        ]
    },
    {
        name: 'squads',
        columns: [
            'id INT AUTO_INCREMENT PRIMARY KEY',
            'team_id INT NOT NULL',
            'player_id INT NOT NULL',
            'role VARCHAR(255) NOT NULL',
            'FOREIGN KEY (team_id) REFERENCES teams(id)',
            'FOREIGN KEY (player_id) REFERENCES players(id)'
        ]
    },
    {
        name: 'matches',
        columns: [
            'id INT AUTO_INCREMENT PRIMARY KEY',
            'team_1 INT NOT NULL',
            'team_2 INT NOT NULL',
            'date DATE NOT NULL',
            'venue VARCHAR(255) NOT NULL',
            'FOREIGN KEY (team_1) REFERENCES teams(id)',
            'FOREIGN KEY (team_2) REFERENCES teams(id)'
        ]
    },
    {
        name: 'admins',
        columns: [
            'admin_id INT AUTO_INCREMENT PRIMARY KEY',
            'username VARCHAR(255) NOT NULL',
            'email VARCHAR(255) NOT NULL',
            'password VARCHAR(255) NOT NULL'
        ]
    }
];

async function createDatabaseAndTables() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          })

        for (const table of tables) {
            const columns = table.columns.join(',\n    ');
            await connection.query(`CREATE TABLE IF NOT EXISTS ${table.name} (\n    ${columns}\n);`);
            console.log(`Table '${table.name}' created successfully.`);
        }

        console.log('Database initialization complete.');

        await connection.end();
    } catch (error) {
        console.log(error)
        console.error('Error:', error.message);
    }
}

module.exports = {
    createDatabaseAndTables
}