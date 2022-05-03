""" Make i18n jsons

    About: Translates a dict of english phrases
           into the following languages:
           - de: german
           - es: spanish
           - fr: french
           - he: hebrew
           - pt: portuguese
           - sk: slovak
           - zh-CN: chinese simplified
    Usage: Simply run this script in the i18n directory
"""
from threading import Thread
from json import load, dumps
from deepl import Translator
from typing import Final


# Setup constants
AUTH_KEY: Final = ""
SOURCE_LANG: Final = "en"
TARGET_LANG: Final = ["de", "es", "fr", "pt-br", "sk", "zh"]
TRANSLATOR: Final = Translator(auth_key=AUTH_KEY)


def do_request(keys, vals, lang):
    print(f"tranlating {lang}...")

    translated_text = [v.text for v in TRANSLATOR.translate_text(
        text=vals,
        source_lang=SOURCE_LANG,
        target_lang=lang
    )]

    with open(lang + ".json", 'w') as f:
        f.write(dumps(dict(zip(keys, translated_text)), indent=4))

    print(f"{lang} translation complete...")


def main():
    with open("en.json") as f:
        en = load(f)

    keys = list(en.keys())
    vals = list(en.values())

    threads = []
    for lang in TARGET_LANG:
        threads.append(Thread(target=do_request(keys, vals, lang)))

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()


if __name__ == "__main__":
    main()
