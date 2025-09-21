import json
import os

def create_radio_pages():
    json_file_path = 'data/exported_radios.json'

    with open(json_file_path, 'r') as f:
        radios = json.load(f)
    # Clean existing radio files in content/en/catalog/ except _index.md
    catalog_dir_en = "content/en/catalog/"
    catalog_dir_ru = "content/ru/catalog/"

    if os.path.exists(catalog_dir_en):
        for file in os.listdir(catalog_dir_en):
            if file != "_index.md" and file.endswith(".md"):
                os.remove(os.path.join(catalog_dir_en, file))

    if os.path.exists(catalog_dir_ru):
        for file in os.listdir(catalog_dir_ru):
            if file != "_index.md" and file.endswith(".md"):
                os.remove(os.path.join(catalog_dir_ru, file))

    for index, radio in enumerate(radios):
        if not radio.get('enabled'):
            continue

        slug = radio.get('slug', f"radio-{radio['id']}")
        # English page
        en_path = f"content/en/catalog/{slug}.md"
        os.makedirs(os.path.dirname(en_path), exist_ok=True)
        country = radio.get("country", {})
        country_code = country.get("iso2", None).lower()
        country_name = country.get("name", None)
        country_name_eng = country.get("name_eng", None)
        default_stream = radio.get("default_stream", None)
        genres = radio.get("genres", [])
        with open(en_path, 'w') as f:
            f.write('---\n')
            title = radio.get("name", "").replace("\"", "'")
            f.write(f'title: "{title}"\n')
            f.write(f'type: "catalog_item"\n')
            f.write(f'weight: "{index + 1}"\n')
            if country_code:
                f.write(f'country_code: "{country_code}"\n')
            f.write(f'country_name: "{country_name_eng}"\n')
            f.write(f'logo: "{radio.get("logo", "")}"\n')
            genre_names = [f"\"{g['name_eng']}\"" for g in genres]
            f.write(f'genres: [{", ".join(genre_names)}]\n')
            f.write(f'rating: "{radio.get("rating", 0.):.2f}"\n')
            f.write(f'website_url: "{radio.get("website_url", "")}"\n')
            if default_stream:
                f.write(f'default_stream: "{default_stream}"\n')
            description = radio.get("description", "").replace("\"", "'")
            f.write('description: "' + description + '"\n')
            f.write('---\n')

        # Russian page
        ru_path = f"content/ru/catalog/{slug}.md"
        os.makedirs(os.path.dirname(ru_path), exist_ok=True)
        with open(ru_path, 'w') as f:
            f.write('---\n')
            title = radio.get("name", "").replace("\"", "'")
            f.write(f'title: "{title}"\n')
            f.write(f'type: "catalog_item"\n')
            f.write(f'weight: "{index + 1}"\n')
            if country_code:
                f.write(f'country_code: "{country_code}"\n')
            f.write(f'country_name: "{country_name}"\n')
            f.write(f'logo: "{radio.get("logo", "")}"\n')
            genre_names = [f"\"{g['name']}\"" for g in genres]
            f.write(f'genres: [{", ".join(genre_names)}]\n')
            f.write(f'rating: "{radio.get("rating", 0):.2f}"\n')
            f.write(f'website_url: "{radio.get("website_url", "")}"\n')
            if default_stream:
                f.write(f'default_stream: "{default_stream}"\n')
            
            description = radio.get("description", "").replace("\"", "'")
            f.write('description: "' + description + '"\n')
            f.write('---\n')

if __name__ == '__main__':
    create_radio_pages()
