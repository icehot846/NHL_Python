from backend.db.db_config import create_connection

def execute_query(query, values=None):
    """
    Executes INSERT, UPDATE, DELETE queries.
    :param query: SQL query to execute
    :param values: Optional tuple of values for placeholders (%s)
    :return: Number of affected rows
    """
    connection = create_connection()
    if not connection:
        return None

    try:
        cursor = connection.cursor()
        cursor.execute(query, values)
        connection.commit()
        affected_rows = cursor.rowcount
        return affected_rows
    except Exception as e:
        print(f"❌ Error executing query: {e}")
        return None
    finally:
        cursor.close()
        connection.close()


def fetch_query(query, values=None):
    """
    Executes SELECT queries and returns results.
    :param query: SQL query to execute
    :param values: Optional tuple of values for placeholders (%s)
    :return: List of dictionaries containing query results
    """
    connection = create_connection()
    if not connection:
        return None

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query, values)
        results = cursor.fetchall()
        return results
    except Exception as e:
        print(f"❌ Error fetching query: {e}")
        return None
    finally:
        cursor.close()
        connection.close()