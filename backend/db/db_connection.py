import mysql.connector  # Ensure this is imported
from db.db_config import DB_CONFIG  # Import database config

def get_db_connection():
    """Establish and return a MySQL database connection."""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None