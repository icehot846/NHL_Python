import requests
from bs4 import BeautifulSoup
import pandas as pd
import logging

# Setup Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def scrape_table(url, table_id=None, output_file="scraped_data.csv"):
    """
    Scrapes table data from the given URL and saves it as a CSV file.
    
    :param url: The webpage URL to scrape.
    :param table_id: (Optional) Specific table ID to target.
    :param output_file: Name of the CSV file to save data.
    """
    headers = {"User-Agent": "Mozilla/5.0"}

    try:
        # Request webpage
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        # Find table
        table = soup.find("table", {"id": table_id}) if table_id else soup.find("table")
        if not table:
            logging.warning("No table found on the page.")
            return

        # Extract headers
        header_tags = table.find("thead").find_all("th") if table.find("thead") else []
        headers = [th.text.strip() for th in header_tags]
        headers = headers[11:]

        # Extract rows
        rows = []
        tbody = table.find("tbody")
        if tbody:
            for row in tbody.find_all("tr"):
                cols = [td.text.strip() for td in row.find_all("td")]
                if cols:
                    rows.append(cols)
        else:
            logging.warning("No table body found.")
            return

        # Adjust column alignment dynamically
        max_columns = max(len(row) for row in rows)  # Find max columns in rows
        if len(headers) < max_columns:  # If headers are fewer than data columns, adjust
            headers.extend([f"Extra_Col_{i}" for i in range(len(headers), max_columns)])
        elif len(headers) > max_columns:  # If headers are more, trim headers
            headers = headers[:max_columns]

        # Convert to DataFrame
        df = pd.DataFrame(rows, columns=headers)
        df.to_csv(output_file, index=False)
        logging.info(f"Data successfully saved to {output_file}")

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching the page: {e}")

# Example Usage
url = "https://www.hockey-reference.com/teams/DET/2025.html"
table_id = "player_stats"
scrape_table(url, table_id)