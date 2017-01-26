import json
import yaml

path_in = "./products.yaml"
path_out = "../data/products.json"

with open(path_in, 'r') as myfile:
    data = myfile.read()
data = yaml.load(data)

# Replace the tags for a list with tags
for element in data:
    tags_list = []
    for tag in element['tags'].split(','):
        tag = tag.lower()
        if tag.startswith(" "):
            tag = tag[1:]

        tags_list.append(tag)

    element['tags'] = tags_list

# Save the output file
with open(path_out, 'w') as out_file:
    json.dump(data, out_file, indent=4)
