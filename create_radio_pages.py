import json
import os

def create_radio_pages():
    json_file_path = 'data/exported_radios.json'

    with open(json_file_path, 'r') as f:
        radios = json.load(f)

    for radio in radios:
        if not radio.get('enabled'):
            continue

        slug = radio.get('slug', f"radio-{radio['id']}")

        # English page
        en_path = f"content/en/catalog/{slug}.md"
        os.makedirs(os.path.dirname(en_path), exist_ok=True)
        country = radio.get("country", {})
        country_code = country.get("iso2", None).lower()
        with open(en_path, 'w') as f:
            f.write('---\n')
            title = radio.get("name", "").replace("\"", "'")
            f.write(f'title: "{title}"\n')
            f.write(f'type: "catalog_item"\n')
            if country_code:
                f.write(f'country_code: "{country_code}"\n')
            f.write(f'logo: "{radio.get("logo", "")}"\n')
            f.write(f'website_url: "{radio.get("website_url", "")}"\n')
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
            if country_code:
                f.write(f'country_code: "{country_code}"\n')

            f.write(f'logo: "{radio.get("logo", "")}"\n')
            f.write(f'website_url: "{radio.get("website_url", "")}"\n')
            description = radio.get("description", "").replace("\"", "'")
            f.write('description: "' + description + '"\n')
            f.write('---\n')

if __name__ == '__main__':
    create_radio_pages()
