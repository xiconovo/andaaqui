import csv
import sys
import sqlite3

# python3 add_places.py Places.csv ../db.sqlite

with open(sys.argv[1]) as csvfile:
    con = sqlite3.connect(sys.argv[2])
    cur = con.cursor()
    reader = csv.reader(csvfile, delimiter=",")
    next(reader, None)  # skip the header
    for row in reader:
        print(f"Adding: {row[0]}")
        cur.execute(
            f"INSERT INTO place (name, lat, long, rating) VALUES (?, ?, ?, ?)",
            (row[0], float(row[1].replace(",", ".")), float(row[2].replace(",", ".")), 0),
        )

    con.commit()
    con.close()
