import json
import os
from datetime import datetime

def generate_listen_links(radio):

    streams = radio.get("streams", [])
    
    for idx, stream in enumerate(streams):
        m3u_content = "#EXTM3U\n"
        pls_content = "[playlist]\nNumberOfEntries=1\n"
        
        stream_url = stream.get("stream_url", "")
        if stream_url:
            m3u_content += "#EXTINF:-1,{}\n{}\n".format(radio.get("name", "Unknown"), stream_url)
            pls_content += "File{}={}\n".format(idx + 1, stream_url)
            pls_content += "Title{}={}\n".format(idx + 1, radio.get("name", "Unknown"))
            pls_content += "Length{}=-1\n".format(idx + 1)
        pls_content += "Version=2\n"

        # Save M3U file
        m3u_dir = f"static/listen/"
        os.makedirs(m3u_dir, exist_ok=True)
        m3u_path = os.path.join(m3u_dir, f"stream_{stream['id']}.m3u")
        with open(m3u_path, 'w') as m3u_file:
            m3u_file.write(m3u_content)

        # Save PLS file
        pls_path = os.path.join(m3u_dir, f"stream_{stream['id']}.pls")
        with open(pls_path, 'w') as pls_file:
            pls_file.write(pls_content) 
            


def create_radio_pages():
    json_file_path = 'data/exported_radios.json'

    with open(json_file_path, 'r') as f:
        radios = json.load(f)
    # Clean existing radio files in content/en/catalog/ except _index.md
    catalog_dir_en = "content/en/catalog/"
    catalog_dir_ru = "content/ru/catalog/"

    m3u_dir = f"static/listen/"
    if os.path.exists(m3u_dir):
        for file in os.listdir(m3u_dir):
            if file.endswith(".m3u") or file.endswith(".pls"):
                os.remove(os.path.join(m3u_dir, file))

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
        region = radio.get("region", {})
        city = radio.get("city", {})
        
        country_code = country.get("iso2", "").lower()
        country_name = country.get("name", None)
        region_name = region.get("name", None) if region else {}
        city_name = city.get("name", None) if city else {}

        country_name_eng = country.get("name_eng", None)
        region_name_eng = region.get("name_eng", None) if region else {}
        city_name_eng = city.get("name_eng", None) if city else {}
        
        # Languages
        languages = radio.get("languages", [])
        language_names = [lang['name'] for lang in languages]
        language_names_eng = [lang['name_eng'] for lang in languages]
        
        # Genres
        genres = radio.get("genres", [])        
        genre_names = [g['name'] for g in genres]
        genre_names_eng = [g['name_eng'] for g in genres]

        default_stream = radio.get("default_stream", None)
        created_date = datetime.fromisoformat(radio["created"]).strftime('%d/%m/%Y')
        streams = radio.get("streams", [])
        
        generate_listen_links(radio)


        info = {
            "id": radio['id'],
            "title": radio.get("name", ""),
            "type": "catalog_item",
            "weight": f"{index + 1}",
            "country_code": country_code if country_code else None,
            "logo": radio["logo"],
            "rating": f'{radio.get("rating", 0.):.2f}',
            "website_url": radio["website_url"],
            "created": created_date,
            "default_stream": default_stream,
            "description": radio["description"],
            "streams": streams,
            "total_votes": radio['total_votes'],
        }
        with open(en_path, 'w') as f:
            info.update({
               "genres": [g['name_eng'] for g in genres],
               "country_name": country_name_eng,
               "region_name": region_name_eng,
               "city_name": city_name_eng,
               "languages": language_names_eng,
               "genres": genre_names_eng,
            })
            f.write(json.dumps(info, indent=4))
            
            #f.write('---\n')
            #title = radio.get("name", "").replace("\"", "'")
            #f.write(f'title: "{title}"\n')
            #f.write(f'type: "catalog_item"\n')
            #f.write(f'weight: "{index + 1}"\n')
            #if country_code:
            #    f.write(f'country_code: "{country_code}"\n')
            #f.write(f'country_name: "{country_name_eng}"\n')
            #f.write(f'logo: "{radio.get("logo", "")}"\n')
            
            #f.write(f'genres: [{", ".join(genre_names)}]\n')
            #f.write(f'rating: "{radio.get("rating", 0.):.2f}"\n')
            #f.write(f'website_url: "{radio.get("website_url", "")}"\n')
            #f.write(f'created: "{created_date}"\n')
            #if default_stream:
            #    f.write(f'default_stream: "{default_stream}"\n')
            #description = radio.get("description", "").replace("\"", "'")
            #f.write('description: "' + description + '"\n')
            #f.write('---\n')

        # Russian page
        ru_path = f"content/ru/catalog/{slug}.md"
        os.makedirs(os.path.dirname(ru_path), exist_ok=True)
        with open(ru_path, 'w') as f:
            info.update({
               "genres": [g['name'] for g in genres],
               "country_name": country_name,
               "region_name": region_name,
               "city_name": city_name,
               "languages": language_names,
               "genres": genre_names,
            })
            f.write(json.dumps(info, indent=4))
            
            # f.write('---\n')
            # title = radio.get("name", "").replace("\"", "'")
            # f.write(f'title: "{title}"\n')
            # f.write(f'type: "catalog_item"\n')
            # f.write(f'weight: "{index + 1}"\n')
            # if country_code:
            #     f.write(f'country_code: "{country_code}"\n')
            # f.write(f'country_name: "{country_name}"\n')
            # f.write(f'logo: "{radio.get("logo", "")}"\n')
            # genre_names = [f"\"{g['name']}\"" for g in genres]
            # f.write(f'genres: [{", ".join(genre_names)}]\n')
            # f.write(f'rating: "{radio.get("rating", 0):.2f}"\n')
            # f.write(f'website_url: "{radio.get("website_url", "")}"\n')
            # f.write(f'created: "{created_date}"\n')
            # if default_stream:
            #     f.write(f'default_stream: "{default_stream}"\n')
            
            # description = radio.get("description", "").replace("\"", "'")
            # f.write('description: "' + description + '"\n')
            # f.write('---\n')

if __name__ == '__main__':
    create_radio_pages()
