import os
import json


target_dir = "./public/items"
output_file = "src/data/items.json"

try:
    all_entries = os.listdir(target_dir)

    # Filter out directories
    files = [f for f in all_entries if os.path.isfile(os.path.join(target_dir, f))]

    with open(output_file, "w") as json_file:
        json.dump(files, json_file)

    print("Done, items count:", len(files))

except FileNotFoundError:
    print(f"Error: The directory '{target_dir}' was not found.")
except Exception as e:
    print(f"An error occurred: {e}")
